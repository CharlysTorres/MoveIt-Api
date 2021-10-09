import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UsersRepository } from "../repositories/UserRepository";

interface AuthenticateRequest {
  email: string;
  password: string;
};

class AuthenticateUserServices {

  async execute({ email, password }: AuthenticateRequest) {
    const userRepoitory = getCustomRepository(UsersRepository);

    const secretKey = process.env.SECRET_KEY;

    const user = await userRepoitory.findOneOrFail({email}, {
      relations: ['avatar', 'level']
    });

    if(!user) {
      throw new Error("email or password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new Error("email or password incorrect");
    }

    const token = sign({
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      level: user.level,
    }, secretKey, {
      subject: user.id,
      expiresIn: "7d"
    });

    return token;
  }
};

export { AuthenticateUserServices };