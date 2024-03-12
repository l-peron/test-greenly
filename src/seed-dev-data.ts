import { dataSource } from "../config/dataSource";
import { CarbonEmissionFactor } from "./carbonEmissionFactor/carbonEmissionFactor.entity";
import {CarbonEmissionProduct} from "./carbonEmissionProduct/carbonEmissionProduct.entity";
import {CarbonEmissionIngredient} from "./carbonEmissionProduct/carbonEmissionIngredient.entity";

export const TEST_CARBON_EMISSION_FACTORS = [
  {
    name: "ham",
    unit: "kg",
    emissionCO2eInKgPerUnit: 0.11,
    source: "Agrybalise",
  },
  {
    name: "cheese",
    unit: "kg",
    emissionCO2eInKgPerUnit: 0.12,
    source: "Agrybalise",
  },
  {
    name: "tomato",
    unit: "kg",
    emissionCO2eInKgPerUnit: 0.13,
    source: "Agrybalise",
  },
  {
    name: "flour",
    unit: "kg",
    emissionCO2eInKgPerUnit: 0.14,
    source: "Agrybalise",
  },
  {
    name: "blueCheese",
    unit: "kg",
    emissionCO2eInKgPerUnit: 0.34,
    source: "Agrybalise",
  },
  {
    name: "vinegar",
    unit: "kg",
    emissionCO2eInKgPerUnit: 0.14,
    source: "Agrybalise",
  },
  {
    name: "beef",
    unit: "kg",
    emissionCO2eInKgPerUnit: 14,
    source: "Agrybalise",
  },
  {
    name: "oliveOil",
    unit: "kg",
    emissionCO2eInKgPerUnit: 0.15,
    source: "Agrybalise",
  },
].map((args) => {
  return new CarbonEmissionFactor({
    name: args.name,
    unit: args.unit,
    emissionCO2eInKgPerUnit: args.emissionCO2eInKgPerUnit,
    source: args.source,
  });
});

const CARBON_EMISSION_PRODUCT_1 = new CarbonEmissionProduct({name: "Petit déjeuner", ingredients: []});
const CARBON_EMISSION_PRODUCT_2 = new CarbonEmissionProduct({name: "Breakfast", ingredients: []});

const CARBON_EMISSION_INGREDIENTS_1 = [
  {
    name: "cheese",
    unit: "kg",
    quantity: 1.4,
  },
  {
    name: "tomato",
    unit: "kg",
    quantity: 1.7,
  },
  {
    name: "ham",
    unit: "kg",
    quantity: 6.7,
  }
].map((i) => {
  return new CarbonEmissionIngredient({
    name: i.name,
    unit: i.unit,
    quantity: i.quantity,
    product: CARBON_EMISSION_PRODUCT_1
  })
});

const CARBON_EMISSION_INGREDIENTS_2 = [
  {
    name: "cheese",
    unit: "pound",
    quantity: 1.4,
  },
  {
    name: "tomato",
    unit: "pound",
    quantity: 1.7,
  },
  {
    name: "ham",
    unit: "pound",
    quantity: 6.7,
  }
].map((i) => {
  return new CarbonEmissionIngredient({
    name: i.name,
    unit: i.unit,
    quantity: i.quantity,
    product: CARBON_EMISSION_PRODUCT_2
  })
});

CARBON_EMISSION_PRODUCT_1.ingredients = CARBON_EMISSION_INGREDIENTS_1;
CARBON_EMISSION_PRODUCT_2.ingredients = CARBON_EMISSION_INGREDIENTS_2;

export const TEST_CARBON_EMISSION_PRODUCTS = [
  CARBON_EMISSION_PRODUCT_1, CARBON_EMISSION_PRODUCT_2
]

export const getTestEmissionFactor = (name: string) => {
  const emissionFactor = TEST_CARBON_EMISSION_FACTORS.find(
    (ef) => ef.name === name
  );
  if (!emissionFactor) {
    throw new Error(
      `test emission factor with name ${name} could not be found`
    );
  }
  return emissionFactor;
};

export const getTestEmissionProduct = (name: string) => {
  const emissionFactor = TEST_CARBON_EMISSION_PRODUCTS.find(
      (ef) => ef.name === name
  );
  if (!emissionFactor) {
    throw new Error(
        `test emission product with name ${name} could not be found`
    );
  }
  return emissionFactor;
};
export const seedTestCarbonEmissionFactors = async () => {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  const carbonEmissionFactorsService =
    dataSource.getRepository(CarbonEmissionFactor);

  await carbonEmissionFactorsService.save(TEST_CARBON_EMISSION_FACTORS);
};

export const seedTestCarbonEmissionProducts = async () => {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  const carbonEmissionProductsService =
      dataSource.getRepository(CarbonEmissionProduct);

  await carbonEmissionProductsService.save(TEST_CARBON_EMISSION_PRODUCTS);
};

if (require.main === module) {
  seedTestCarbonEmissionFactors().catch((e) => console.error(e));
  seedTestCarbonEmissionProducts().catch((e) => console.error(e));
}
