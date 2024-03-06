export class CreateCarbonEmissionProductDto {
  name: string;
  ingredients: CreateCarbonEmissionIngredientDto[];
}

export class CreateCarbonEmissionIngredientDto {
  name: string;
  unit: string;
  quantity: number;
}

export class CarbonEmissionProductFootprint {
  name: string;
  footprint: number | null;

  constructor(name: string, footprint: number | null) {
    this.name = name;
    this.footprint = footprint;
  }
}
