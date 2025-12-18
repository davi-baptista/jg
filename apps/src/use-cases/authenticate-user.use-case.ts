import { Injectable } from '@nestjs/common'
import { Either, left, right } from '../../../../packages/utils/either/either'


interface AuthenticateUserUseCaseRequest {
    email: string
    password: string
}

type AuthenticateUserUseCaseResponse = Either<
    null,
    {
        acessToken: string
        refreshToken: string
    }
>

@Injectable()
export class AuthenticateUserUseCase {
}