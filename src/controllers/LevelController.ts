import { Request, Response } from 'express';
import { getRepository, getConnection } from 'typeorm';

import Level from '../models/Level';
import LevelView from '../views/LevelView';

export default {
  
  async index(request: Request, response: Response) {
    const levelRepository = getRepository(Level);
    
    const levels = await levelRepository.find();

    return response.json(levels)
  },

  async create(request: Request, response: Response) {
    const {
      user_id,
      level,
      currentExperience,
      challengesCompleted
    } = request.body;

    const levelRepository = getRepository(Level);

    if(!user_id) {
      throw new Error('User Not Found');
    }

    const data = {
      user_id,
      level,
      currentExperience,
      challengesCompleted
    }

    const levels = levelRepository.create(data);

    await levelRepository.save(levels);

    return response.status(201).json(levels);
  },

  async update(request: Request, response: Response) {
    const { id } = request.params;

    const {
      level,
      experience,
      currentExperience,
      challengesCompleted
    } = request.body;
    
    await getConnection().createQueryBuilder().update(Level)
      .set({ level, experience, currentExperience, challengesCompleted })
      .where("user_id = :id", { id }).execute();
    
    return response.status(201).json({ user: { id, level, experience, currentExperience, challengesCompleted} });
  },
}