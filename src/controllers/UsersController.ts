import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
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
  
    const usersRepository = getRepository(User);

    // const userLevel = {
    //   level: 1,
    //   currentExperience: 0,
    //   challengesCompleted: 0
    // }
  
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

    const requestAvatar = request.files as Express.Multer.File[];
    
    const avatar = requestAvatar.map(image => {
      return { path: image.filename }
    });

    const data = {
      name,
      email,
      password: passwordHash,
      avatar,
      //level: userLevel,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required(),
      avatar: Yup.array(Yup.object().shape({
        path: Yup.string().required()
      }))
    });

    schema.validate(data, {
      abortEarly: false,
    });

    const user = usersRepository.create(data);
  
    await usersRepository.save(user);
  
    return response.status(201).json(user);
  },
  async update() {}
}