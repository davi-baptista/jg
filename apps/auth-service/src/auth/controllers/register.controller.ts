import {
  BadRequestException,
  Body,
  Controller,
  Post,
} from '@nestjs/common'
import { Public } from '../public'
import { RegisterDto } from '../dto/register.dto'
import { RegisterUseCase } from '@/users/use-cases/register.use-case'
import { UserAlreadyExistsError } from '@/users/errors/user-already-exists-error'

@Controller('/auth')
export class RegisterController {
  constructor(private registerUseCase: RegisterUseCase) {}
    
  @Public()
  @Post('/register')
  async handle(@Body() body: RegisterDto) {
    const { username, email, password } = body

    const result = await this.registerUseCase.execute({
      username,
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      if (error instanceof UserAlreadyExistsError) {
        throw new BadRequestException(error.message)
      }
        
      throw new BadRequestException()
    }

    const { user } = result.value

    return { 
        id: user.id, 
        username: user.username, 
        email: user.email 
    }
  }
}