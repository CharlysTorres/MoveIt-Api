import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"

interface Payload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    //Receber o token 
    const authToken = request.headers.authorization;


    // Validar se token está preenchido
    if(!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ")

    try {
        // Validar se o token é valido
        const decode = verify(token , "28e022fe2d88dbc6c91c8542fc06e2ea") as Payload;

        // Recuperar informações do usuário
        request.user_id = decode.sub;

        return next(), decode;
    } catch(err){
        return response.status(401).end();
    }
}