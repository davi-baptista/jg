import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Public } from '../public'
import { RefreshTokenDto } from '../dto/refresh-token.dto'

@Controller('auth')
export class RefreshController {
  constructor(private readonly jwtService: JwtService) {}

  @Public()
  @Post('refresh')
  async handle(@Body() body: RefreshTokenDto) {
    const { refreshToken } = body

    try {
      const payload = await this.jwtService.verifyAsync(refreshToken)

      const accessToken = await this.jwtService.signAsync({
        sub: payload.sub,
      })

      return {
        access_token: accessToken,
      }
    } catch {
      throw new UnauthorizedException()
    }
  }
}
