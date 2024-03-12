import { GreenlyDataSource, dataSource } from "../../config/dataSource";
import { getTestEmissionProduct } from "../seed-dev-data";
import { CarbonEmissionFactor } from "../carbonEmissionFactor/carbonEmissionFactor.entity";
import { CarbonEmissionFactorsService } from "../carbonEmissionFactor/carbonEmissionFactors.service";
import {CarbonEmissionProductsService} from "./carbonEmissionProducts.service";
import {CarbonEmissionProduct} from "./carbonEmissionProduct.entity";

let petitDejeunerEmissionProduct = getTestEmissionProduct("Petit déjeuner");
let breakfastEmissionProduct = getTestEmissionProduct("Breakfast");
let carbonEmissionProductService: CarbonEmissionProductsService;
let carbonEmissionFactorService: CarbonEmissionFactorsService;

beforeAll(async () => {
  await dataSource.initialize();
  carbonEmissionProductService = new CarbonEmissionProductsService(
    dataSource.getRepository(CarbonEmissionProduct), dataSource.getRepository(CarbonEmissionFactor)
  );
});

beforeEach(async () => {
  await GreenlyDataSource.cleanDatabase();
  await dataSource
    .getRepository(CarbonEmissionProduct)
    .save(petitDejeunerEmissionProduct);
});

describe("CarbonEmissionProducts.service", () => {
  it("should save new emissionFactors", async () => {
    await carbonEmissionProductService.save([
      petitDejeunerEmissionProduct,
      breakfastEmissionProduct,
    ]);
    const retrieveBreakfastEmissionProduct = await dataSource
      .getRepository(CarbonEmissionProduct)
      .findOne({ where: { name: "Petit déjeuner" } });
    expect(retrieveBreakfastEmissionProduct?.name).toBe("Petit déjeuner");
  });
  it("should retrieve emission Products", async () => {
    const carbonEmissionProducts = await carbonEmissionProductService.findAll();
    expect(carbonEmissionProducts).toHaveLength(1);
  });
});

afterAll(async () => {
  await dataSource.destroy();
});
