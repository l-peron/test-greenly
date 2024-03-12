import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import {dataSource} from "../config/dataSource";
import { AppModule } from "../src/app.module";
import {getTestEmissionFactor, getTestEmissionProduct} from "../src/seed-dev-data";
import {CarbonEmissionProduct} from "../src/carbonEmissionProduct/carbonEmissionProduct.entity";
import {CarbonEmissionFactor} from "../src/carbonEmissionFactor/carbonEmissionFactor.entity";

beforeAll(async () => {
  await dataSource.initialize();
});

afterAll(async () => {
  await dataSource.destroy();
});

describe("CarbonEmissionProductsController", () => {
  let app: INestApplication;
  let defaultCarbonEmissionProducts: CarbonEmissionProduct[];

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await dataSource
      .getRepository(CarbonEmissionProduct)
      .save([getTestEmissionProduct("Petit déjeuner"), getTestEmissionProduct("Breakfast")]);

    await dataSource
        .getRepository(CarbonEmissionFactor)
        .save([getTestEmissionFactor("ham"), getTestEmissionFactor("tomato"),getTestEmissionFactor("cheese")]);

    defaultCarbonEmissionProducts = await dataSource
      .getRepository(CarbonEmissionProduct)
      .find({ relations: {ingredients: true }});
  });

  it("GET /carbon-emission-products", async () => {
    return request(app.getHttpServer())
      .get("/carbon-emission-products")
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual(defaultCarbonEmissionProducts);
      });
  });

  it("POST /carbon-emission-products", async () => {
    const carbonEmissionProductArgs = {
      name: "Plat exemple",
      ingredients: [{
        name: "Jambon",
        unit: "kg",
        quantity: 0.4,
      }]
    };
    return request(app.getHttpServer())
      .post("/carbon-emission-products")
      .send([carbonEmissionProductArgs])
      .expect(201)
      .expect(({ body }) => {
        expect(body.length).toEqual(1);
        expect(body[0]).toMatchObject(carbonEmissionProductArgs);
      });
  });

  it("POST /carbon-emission-products/:id/calculate", async () => {
    const petitDejeuner = await dataSource.getRepository(CarbonEmissionProduct).findOne({ where: { name: "Petit déjeuner"}});
    const id = petitDejeuner ? petitDejeuner.id : 0;
    return request(app.getHttpServer())
        .post(`/carbon-emission-products/${id}/calculate`)
        .expect(201)
        .expect(({ body }) => {
          expect(body).toEqual({
            name: "Petit déjeuner",
            footprint: 1.126
          });
        });
  });

  it("POST /carbon-emission-products/:id/calculate", async () => {
    const breakfast = await dataSource.getRepository(CarbonEmissionProduct).findOne({ where: { name: "Breakfast"}});
    const id = breakfast ? breakfast.id : 0;
    return request(app.getHttpServer())
        .post(`/carbon-emission-products/${id}/calculate`)
        .expect(201)
        .expect(({ body }) => {
          expect(body).toEqual({
            name: "Breakfast",
            footprint: null
          });
        });
  });
});
