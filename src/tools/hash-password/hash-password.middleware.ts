import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { addsalt, encript } from 'src/utils/Encription';

@Injectable()
export class HashPasswordMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let userPassword = req.body['password'];
    if(userPassword){
      const salt = addsalt()
      userPassword = encript(userPassword, salt)
      req.body['password'] = userPassword;
      req.body['salt'] = salt;
    }
    next();
  }
}
