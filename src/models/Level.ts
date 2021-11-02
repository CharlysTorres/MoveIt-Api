import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import User from './User';

@Entity('level')
export default class Level {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  level: number;

  @Column()
  experience: number;

  @Column()
  currentExperience: number;

  @Column()
  challengesCompleted: number;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }

  @OneToOne(() => User, user => user.level)
  @JoinColumn({name: "user_id"})
  user: User

}