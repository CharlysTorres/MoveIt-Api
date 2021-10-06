import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createLevel1629237293206 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'level',
      columns: [
        {
          name: 'id',
          type: 'uuid',
        },
        {
          name: 'level',
          type: 'varchar',
        },
        {
          name: 'currentExperience',
          type: 'varchar',
        },
        {
          name: 'challengesCompleted',
          type: 'varchar',
        },
        {
          name: 'user_id',
          type: 'uuid',
        },
      ],
      foreignKeys: [
        {
          name: 'Level',
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
