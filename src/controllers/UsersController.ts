import { Request, Response } from 'express';
import { getRepository, getConnection } from 'typeorm';
import { hash } from 'bcryptjs';

import * as Yup from 'yup';

import UserView from '../views/UserView';
import User from '../models/User';

export default {

  async index(request: Request, response: Response) {
    const usersRepository = getRepository(User)

    const users = await usersRepository.find({
      relations: ['avatar', 'level']
    });

    return response.json(UserView.renderMany(users));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params

    const usersRepository = getRepository(User)

    const user = await usersRepository.findOneOrFail(id, {
      relations: ['avatar', 'level'],
    });

    return response.json(UserView.render(user));
  },

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      password,
    } = request.body;

    
    const level = {
      level: '1',
      currentExperience: '0',
      challengesCompleted: '0',
    }

    // const level = '1';
    // const currentExperience = '0';
    // const challengesCompleted = '0';
  
    const usersRepository = getRepository(User);
  
    const userAlreadyExists = await usersRepository.findOne({
      email
    });

    if(!email) {
      throw new Error('email not found or invalid');
    }

    if(userAlreadyExists) {
      throw new Error('User already exists');
    }

    const passwordHash = await hash(password, 8);

    const requestAvatar = request.file as Express.Multer.File;
    
    const avatar = {
      path: requestAvatar.path,
    }

    const data = {
      name,
      email,
      password: passwordHash,
      avatar,
      level,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required(),
      avatar: Yup.object().shape({
        path: Yup.string().required(),
      }),
      level: Yup.object().shape({
        level: Yup.string().required(),
        currentExperience: Yup.string().required(),
        challengesCompleted: Yup.string().required(),
      })
    });

    schema.validate(data, {
      abortEarly: false,
    });

    const user = usersRepository.create(data);
  
    await usersRepository.save(user);
  
    return response.status(201).json(user);
  },
  async update(request: Request, response: Response) {
    const { id } = request.params;

    const {
      name,
      avatar
    } = request.body;

    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ name })
      .where("id = :id", { id })
      .execute();

    response.status(201).json({ message: "User successfully updated" });
  }
}