import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CarbonEmissionProduct } from './carbonEmissionProduct.entity'
import { CarbonEmissionProductsService } from './carbonEmissionProducts.service'
import { CarbonEmissionProductsController } from './carbonEmissionProducts.controller'
import { CarbonEmissionIngredient } from './carbonEmissionIngredient.entity'
import {CarbonEmissionFactor} from "../carbonEmissionFactor/carbonEmissionFactor.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([CarbonEmissionProduct, CarbonEmissionIngredient, CarbonEmissionFactor])
  ],
  providers: [CarbonEmissionProductsService],
  controllers: [CarbonEmissionProductsController]
})
export class CarbonEmissionProductsModule {}
