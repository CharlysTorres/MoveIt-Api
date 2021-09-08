import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import User from './User';

@Entity('avatar')
export default class Avatar {

  @PrimaryColumn()
  id: string;

  @Column()
  path: string;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }

  @ManyToOne(() => User, user => user.avatar)
  @JoinColumn({ name: 'user_id' })
  user: User;
}