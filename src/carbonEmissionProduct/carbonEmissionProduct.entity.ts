import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {CarbonEmissionIngredient} from "./carbonEmissionIngredients.entity";

@Entity('carbon_emission_products')
export class CarbonEmissionProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false
  })
  name: string;

  @Column({
    type: "float",
    nullable: true
  })
  footprint: number;

  @OneToMany(() => CarbonEmissionIngredient, carbonEmissionIngredient => carbonEmissionIngredient.product, { cascade: ['insert', 'update'] })
  ingredients: CarbonEmissionIngredient[];

  sanitize () {
    if (this.name === '') {
      throw new Error('Name cannot be empty');
    }
  }

  constructor (props: {
    name: string,
    ingredients: CarbonEmissionIngredient[]
  }) {
    super();

    this.name = props?.name;
    this.ingredients = props?.ingredients;
    this.sanitize();
  }
}
