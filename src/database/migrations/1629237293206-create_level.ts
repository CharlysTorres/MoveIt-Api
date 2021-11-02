import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createLevel1629237293206 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'level',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true
        },
        {
          name: 'level',
          type: 'integer',
        },
        {
          name: "experience",
          type: "integer",
        },
        {
          name: 'currentExperience',
          type: 'integer',
        },
        {
          name: 'challengesCompleted',
          type: 'integer',
        },
        {
          name: 'user_id',
          type: 'uuid',
        },
      ],
      foreignKeys: [
        {
          name: 'UserLevel',
          columnNames: ['user_id'],
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('level');
  }

}
