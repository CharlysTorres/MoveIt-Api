import { Repository, getCustomRepository } from "typeorm";

import LevelRepository from "../repositories/LevelRepository";
import Level from "../models/Level";

interface LevelServicesProvider {
  user_id: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}


class LevelServices {
  private levelRepository: Repository<Level>

  constructor() {
    this.levelRepository = getCustomRepository(LevelRepository);
  }

  async create({
    user_id,
    level,
    currentExperience,
    challengesCompleted,
  }: LevelServicesProvider) {
    const userLevel = this.levelRepository.create({
      level,
      currentExperience,
      challengesCompleted
    })
  }
  
  async update(
    user_id: string,
    level: number,
    currentExperience: number,
    challengesCompleted: number
  ) {
    await this.levelRepository.createQueryBuilder().update(Level)
      .set({level, currentExperience, challengesCompleted})
      .where("user_id = :user_id", {
        user_id
    }).execute();
  }
}

export default { LevelServices };