import { Entity, Column, PrimaryColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import Avatar from './Avatar';
import Level from './Level';

@Entity('users')
export default class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }

  @OneToOne(() => Level, level => level.user)
  level: Level;

  @OneToMany(() => Avatar, avatar => avatar.user, {
    cascade: ['insert', 'update']
  })
  avatar: Avatar[];
}