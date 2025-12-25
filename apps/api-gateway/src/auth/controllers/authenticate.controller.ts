import {
  Body,
  Controller,
  Inject,
  Post,
} from '@nestjs/common'
import { AuthenticateDto } from '../dto/authenticate.dto'
import { Public } from '../decorators/public.decorator'
import { ClientProxy } from '@nestjs/microservices'
import type { AuthenticatePayload } from '@jg/types/http/auth'
import { lastValueFrom } from 'rxjs'
import { AuthService } from '../auth.service'


@Controller('/auth')
export class AuthenticateController {
  constructor(
    @Inject('AUTH_SERVICE') 
    private readonly authClient: ClientProxy, 
    private readonly authService: AuthService
  ) {}
  
  @Public()
  @Post('/login')
  async handle(@Body() body: AuthenticateDto) {
    const payload: AuthenticatePayload = body

    const result = await lastValueFrom(
      this.authClient.send('auth.authenticate', payload)
    )

    const { access_token, refresh_token } = this.authService.generateTokens(result.userId)

    return { 
      accessToken: access_token, 
      refreshToken: refresh_token 
    }
  }
}