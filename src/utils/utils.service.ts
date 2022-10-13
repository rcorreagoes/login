import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, scrypt } from 'crypto';
import { promisify } from 'util';

  const iv = Buffer.alloc(16, 256);
    
@Injectable()
export class UtilsService {

    async decrypt(val: any): Promise <string>{   
        const key = (await promisify(scrypt)(process.env.PASSWORD, 'salt', 32)) as Buffer;
        const decipher = createDecipheriv('aes-256-ctr', key, iv);

        const decryptedText = Buffer.concat([
            decipher.update(val),
            decipher.final(),
        ]);
        
        return decryptedText.toString();
    }
    
    async encrypt(val: string): Promise <any>{         
        const key = (await promisify(scrypt)(process.env.PASSWORD, 'salt', 32)) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, iv);

        const encryptedText = Buffer.concat([
            cipher.update(val),
            cipher.final(),
        ]);

        return encryptedText;
    }

    async info(token: any): Promise<any>{
        const JSONB = require('json-buffer') 
        return await this.decrypt(JSONB.parse(token.data)).then(async result=>{ 
            return {
                "data": JSON.parse(result),
                "iat": token.iat, 
                "exp": token.exp
            };       
        })
    }
}
