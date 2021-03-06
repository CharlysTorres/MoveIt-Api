import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import User from './User';

@Entity('avatar')
export default class Avatar {

  @PrimaryColumn()
  id: string;

  @Column()
  url: string;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }

  @OneToOne(() => User, user => user.avatar)
  @JoinColumn({ name: 'user_id' })
  user: User;
}