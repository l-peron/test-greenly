import {Injectable, Logger} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CarbonEmissionProduct } from './carbonEmissionProduct.entity'
import {
  type CreateCarbonEmissionProductDto
} from './dto/create-carbonEmissionProduct.dto'
import {CarbonEmissionFactor} from "../carbonEmissionFactor/carbonEmissionFactor.entity";
import {CarbonEmissionIngredient} from "./carbonEmissionIngredient.entity";

@Injectable()
export class CarbonEmissionProductsService {
  constructor (
    @InjectRepository(CarbonEmissionProduct)
    private readonly carbonEmissionProductRepository: Repository<CarbonEmissionProduct>,
    @InjectRepository(CarbonEmissionFactor)
    private readonly carbonEmissionFactorRepository: Repository<CarbonEmissionFactor>,
  ) {}

  async findAll (): Promise<CarbonEmissionProduct[]> {
    return await this.carbonEmissionProductRepository.find({
      relations: {
        ingredients: true,
      }});
  }

  async save (
    carbonEmissionProducts: CreateCarbonEmissionProductDto[]
  ): Promise<CarbonEmissionProduct[] | null> {
    return await this.carbonEmissionProductRepository.save(carbonEmissionProducts);
  }

  async getCarbonEmissionProductFootprint(id: CarbonEmissionProduct['id']): Promise<CarbonEmissionProduct | null> {
    return await this.carbonEmissionProductRepository.findOneBy({id});
  }

  async postCarbonEmissionProductFootprint(id: CarbonEmissionProduct['id']): Promise<CarbonEmissionProduct | null> {
    const product =  await this.carbonEmissionProductRepository.findOne({
      where: { id },
      relations: {
        ingredients: true,
      }
    });
    // In case product not found, return product and let the controller class return a 404
    if(product === null) return product;

    let totalFootprint: number | null = 0;
    for(const ingredient of product.ingredients) {
      const ingredientFootprint = await this.calculateIngredientFootprint(ingredient);
      if(ingredientFootprint === null) {
        totalFootprint = null
      } else if(totalFootprint !== null) {
        totalFootprint+=ingredientFootprint
      }
    }

    // @ts-ignore
    product.footprint = totalFootprint;
    this.carbonEmissionProductRepository.save(product);

    return product;
  }

  private async calculateIngredientFootprint(ingredient: CarbonEmissionIngredient): Promise<number | null> {
    const factor = await this.carbonEmissionFactorRepository.findOne({
      where: {
        name: ingredient.name,
        unit: ingredient.unit
      }
    });
    // In case factor not found.
    if(factor === null) return null;

    return ingredient.quantity*factor.emissionCO2eInKgPerUnit;
  }
}
