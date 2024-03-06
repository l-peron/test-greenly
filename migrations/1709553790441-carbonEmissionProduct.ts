import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CarbonEmissionProduct1709553790441 implements MigrationInterface {
    name = 'CarbonEmissionProduct1709553790441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'carbon_emission_products',
            columns: [{
                name: 'id',
                type: 'serial',
                isPrimary: true
            }, {
                name: 'name',
                type: 'varchar'
            }, {
                name: 'footprint',
                type: 'float',
                isNullable: true
            }]
        }));
        await queryRunner.query(`CREATE TABLE "carbon_emission_ingredients" (id SERIAL, name character varying NOT NULL,  unit character varying NOT NULL, quantity FLOAT, product_id INT, FOREIGN KEY (product_id) REFERENCES carbon_emission_products(id));`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "carbon_emission_ingredients"`);
        await queryRunner.query(`DROP TABLE "carbon_emission_products"`);
    }

}
