import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createAvatar1625570164189 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'avatar',
      columns: [
        {
          name: "id",
          type: "uuid",
          isPrimary: true,
        },
        {
          name: 'path',
          type: 'varchar'
        },
        {
          name: 'user_id',
          type: 'uuid'
        },
      ],
      foreignKeys: [
        {
          name: 'UserAvatar',
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
    queryRunner.dropTable('avatar');
  }

}
