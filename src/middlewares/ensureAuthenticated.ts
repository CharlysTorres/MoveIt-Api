import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"

interface Payload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    //Receber o token 
    const authToken = request.headers.authorization


    // Validar se token está preenchido
    if(!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ")
    console.log(token);

    try {
        // Validar se o token é valido
        const { sub } = verify(token , "3544bb6f0a9f64a82c9976b22ae6cdc7") as Payload;

        // Recuperar informações do usuário
        request.user_id = sub;

        return next();
    } catch(err){
        return response.status(401).end();
    }

    // Recuperar informação do usuário
}