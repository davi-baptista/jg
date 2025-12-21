import { Injectable } from '@nestjs/common'
import { UsersRepository } from 'src/repositories/users-repository'
import { InvalidCredentialsError } from '../../../../api-gateway/src/auth/controllers/errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { Either, left, right } from '@jg/utils'


interface AuthenticateUseCaseRequest {
    email: string
    password: string
}

type AuthenticateUseCaseResponse = Either<
    InvalidCredentialsError,
    {
        accessToken: string
        refreshToken: string
    }
>   

@Injectable()
export class AuthenticateUseCase {
    constructor(
        private readonly usersRepository: UsersRepository, private jwt: JwtService
    ) {}
    async execute({ email, password}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            return left(new InvalidCredentialsError())
        }

        const isValidPassword = await compare(password, user.passwordHash)

        if (!isValidPassword) {
            return left(new InvalidCredentialsError())
        }

        const accessToken = await this.jwt.signAsync({
            sub: user.id
        })

        const refreshToken = await this.jwt.signAsync(
            { sub: user.id },
            { expiresIn: '7d' },
        )

        return right({ accessToken, refreshToken })
    }
}