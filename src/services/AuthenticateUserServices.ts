import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UsersRepositories } from "../repositories/UserRepositories";

interface AuthenticateRequest {
  email: string;
  password: string;
};

class AuthenticateUserServices {

  async execute({ email, password }: AuthenticateRequest) {
    const userRepoitories = getCustomRepository(UsersRepositories);

    const user = await userRepoitories.findOne({email});

    if(!user) {
      throw new Error("email or password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new Error("email or password incorrect");
    }

    const token = sign({
      email: user.email,
    }, "28e022fe2d88dbc6c91c8542fc06e2ea", {
      subject: user.id,
      expiresIn: "30d"
    });

    return token;
  }
};

export { AuthenticateUserServices };