import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetTokenValues } from 'src/decorators/token.decorator';
import { UtilsService } from 'src/utils/utils.service';
import { AuthService } from './auth.service';
import { AuthDto, TokenDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
                private readonly jwtService: JwtService,
                private utilsService: UtilsService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiOkResponse({ description: 'Endpoint para retornar dados do token do usuário'})
    async info(@GetTokenValues() token: TokenDto): Promise<any> {
        return token
    }

    @Post()
    async login(@Body() user: AuthDto): Promise<any>{
        return await this.authService.login(user).then(async result=>{     
            if(result.email){          
                return await this.utilsService.encrypt(JSON.stringify({ email: result.email, id: result.id, name: result.name }))
                .then(async (resultData)=>{               
                    var JSONB = require('json-buffer')
                    var Buffer = require('buffer').Buffer
                    const payload = {data:JSONB.stringify(Buffer.from(resultData))}             
                    return {"token": this.jwtService.sign(payload)};
                })
            } else {
                return result
            }
        })
    }  
}
