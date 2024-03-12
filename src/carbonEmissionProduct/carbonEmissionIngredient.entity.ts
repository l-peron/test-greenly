import {
  BaseEntity,
  Column,
  Entity, JoinColumn, ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { CarbonEmissionProduct } from './carbonEmissionProduct.entity'

@Entity('carbon_emission_ingredients')
export class CarbonEmissionIngredient extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: false,
  })
  unit: string;

  @Column({
    type: "float",
    nullable: false,
  })
  quantity: number;

  @ManyToOne(() => CarbonEmissionProduct, carbonEmissionProduct => carbonEmissionProduct.ingredients)
  @JoinColumn({ name: "product_id" })
  product: CarbonEmissionProduct;

  constructor (props: {
    name: string
    unit: string
    quantity: number
    product: CarbonEmissionProduct
  }) {
    super();

    // Utile si on super ?
    this.name = props?.name;
    this.unit = props?.unit;
    this.quantity = props?.quantity;
    this.product = props?.product;
  }
}
