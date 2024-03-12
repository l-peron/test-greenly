import { GreenlyDataSource, dataSource } from "../../config/dataSource";
import {CarbonEmissionIngredient} from "./carbonEmissionIngredient.entity";
import {CarbonEmissionProduct} from "./carbonEmissionProduct.entity";

let chickenEmissionIngredient: CarbonEmissionIngredient;
let platEmissionProduct: CarbonEmissionProduct;

beforeAll(async () => {
  await dataSource.initialize();
  platEmissionProduct = new CarbonEmissionProduct({ name: "plat exemple", ingredients: [chickenEmissionIngredient]});
  chickenEmissionIngredient = new CarbonEmissionIngredient({
    unit: "kg",
    name: "chicken",
    quantity: 0.4,
    product: platEmissionProduct
  });
});
beforeEach(async () => {
  await GreenlyDataSource.cleanDatabase();
});
describe("FoodProductEntity", () => {
  describe("constructor", () => {
    it("should create an emission ingredient", () => {
      expect(chickenEmissionIngredient.name).toBe("chicken");
    });
    it("should get the name of its associated product", () => {
      expect(chickenEmissionIngredient.product.name).toBe("plat exemple");
    });
  });
});

afterAll(async () => {
  await dataSource.destroy();
});
