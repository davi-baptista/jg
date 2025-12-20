import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthenticateDto } from '../dto/authenticate.dto'
import { Public } from '../public'
import { AuthenticateUseCase } from '@/users/use-cases/authenticate.use-case'
import { InvalidCredentialsError } from '@/users/errors/invalid-credentials-error'

@Controller('/auth')
export class AuthenticateController {
  constructor(private authenticateUseCase: AuthenticateUseCase) {}
  
  @Public()
  @Post('/login')
  async handle(@Body() body: AuthenticateDto) {
    const { email, password } = body

    const result = await this.authenticateUseCase.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      if (error instanceof InvalidCredentialsError) {
        throw new UnauthorizedException(error.message)
      }
      
      throw new BadRequestException()
    }

    const { accessToken, refreshToken } = result.value

    return { access_token: accessToken, refresh_token: refreshToken }
  }
}