import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
} from '@nestjs/common'
import { Public } from '../decorators/public.decorator'
import { ClientProxy } from '@nestjs/microservices'
import { RegisterDto } from '../dto/register.dto'
import type { RegisterPayLoad } from '@jg/types/http/auth'
import { lastValueFrom } from 'rxjs'

@Controller('/auth')
export class RegisterController {
  constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) {}
    
  @Public()
  @Post('/register')
  async handle(@Body() body: RegisterDto) {
    const payload: RegisterPayLoad = body

    const result = await lastValueFrom(
      this.authClient.send('auth.register', payload)
    )

    const { userId } = result

    return { 
      id: userId
    }
  }
}