//基于crypto的中间件加密算法的添加
import * as crypto from 'crypto'; 

export function addsalt(){
    return crypto.randomBytes(4).toString('base64')
}


export function encript(userPassword: string, salt: string): string{
    return crypto.pbkdf2Sync(userPassword, salt, 10000, 16, 'sha256').toString('base64') 
}