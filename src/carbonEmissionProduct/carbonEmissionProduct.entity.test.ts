import { GreenlyDataSource, dataSource } from "../../config/dataSource";
import {CarbonEmissionProduct} from "./carbonEmissionProduct.entity";

let pateCarbonaraEmissionProduct: CarbonEmissionProduct;

beforeAll(async () => {
  await dataSource.initialize();
  pateCarbonaraEmissionProduct = new CarbonEmissionProduct({ name: "Pâte à la Carbonara", ingredients: []});

});
beforeEach(async () => {
  await GreenlyDataSource.cleanDatabase();
});
describe("FoodProductEntity", () => {
  describe("constructor", () => {
    it("should create an emission product", () => {
      expect(pateCarbonaraEmissionProduct.name).toBe("Pâte à la Carbonara");
    });
    it("should throw an error if the name is empty", () => {
      expect(() => {
        const carbonEmissionProduct = new CarbonEmissionProduct({
          name: "",
          ingredients: [],
        });
      }).toThrow();
    });
  });
});

afterAll(async () => {
  await dataSource.destroy();
});

