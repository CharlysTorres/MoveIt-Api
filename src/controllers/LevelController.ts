import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Level from '../models/Level';
import User from '../models/User';
import LevelView from '../views/LevelView';

export default {

  async index(request: Request, response: Response) {
    const levelRepository = getRepository(Level);
    const userRepository = getRepository(User);

    const levels = await levelRepository.find();
    const users = await userRepository.find();

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

  async update(request: Request, response: Response) {},
}