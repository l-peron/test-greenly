import {BadRequestException, Body, Controller, Get, Logger, Param, Post} from '@nestjs/common'
import { type CarbonEmissionProduct } from './carbonEmissionProduct.entity'
import { CarbonEmissionProductsService } from './carbonEmissionProducts.service'
import {
  CarbonEmissionProductFootprint,
  type CreateCarbonEmissionProductDto
} from './dto/create-carbonEmissionProduct.dto'

@Controller('carbon-emission-products')
export class CarbonEmissionProductsController {
  constructor (
    private readonly carbonEmissionProductService: CarbonEmissionProductsService
  ) {}

  @Get()
  async getCarbonEmissionProducts (): Promise<CarbonEmissionProduct[]> {
    Logger.log(
      '[carbon-emission-products] [GET] CarbonEmissionProduct: getting all CarbonEmissionProducts'
    );
    return await this.carbonEmissionProductService.findAll();
  }

  @Post()
  async createCarbonEmissionProducts (
    @Body() carbonEmissionProducts: CreateCarbonEmissionProductDto[]
  ): Promise<CarbonEmissionProduct[] | null> {
    Logger.log(
      `[carbon-emission-products] [POST] CarbonEmissionProduct: ${carbonEmissionProducts} created`
    );
    return await this.carbonEmissionProductService.save(carbonEmissionProducts);
  }

  @Get(':id/calculate')
  async getCarbonEmissionProductFootprint(@Param('id') id: CarbonEmissionProduct['id']): Promise<CarbonEmissionProductFootprint | null> {
    Logger.log(
        `[carbon-emission-products] [GET] CarbonEmissionProduct: ${id} footprint retrieved`
    );
    const product = await this.carbonEmissionProductService.getCarbonEmissionProductFootprint(id);
    if(product !== null) return new CarbonEmissionProductFootprint(product.name, product.footprint);
    throw new BadRequestException('Invalid product');
  }

  @Post(':id/calculate')
  async postCarbonEmissionProductFootprint(@Param('id') id: CarbonEmissionProduct['id']): Promise<CarbonEmissionProductFootprint | null> {
    Logger.log(
        `[carbon-emission-products] [POST] CarbonEmissionProduct: ${id} footprint calculated`
    );
    const product = await this.carbonEmissionProductService.postCarbonEmissionProductFootprint(id);
    if(product !== null) return new CarbonEmissionProductFootprint(product.name, product.footprint);
    throw new BadRequestException('Invalid product');
  }
}
