import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UtilsService } from 'src/utils/utils.service';

export const GetTokenValues = createParamDecorator(
    async (data: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        let utilsService = new UtilsService
        return await utilsService.info(JSON.parse(request['user'])).then(result=>{   
            return result;      
        })
    },
);