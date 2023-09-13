import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { JWT_CONSTANT } from "./jwt.constant";
import { Injectable } from "@nestjs/common";
import { User } from "src/entity/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_CONSTANT.secret
        });
    }

    async validate(payload: User){
        return { useId: payload.id };
    }
}