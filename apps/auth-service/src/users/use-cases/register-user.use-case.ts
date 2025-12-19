import { Injectable } from '@nestjs/common'
import { Either, left, right } from '../../../../../packages/utils/either/either'
import { UserEntity } from 'src/db/entities/user.entity'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { hash } from 'bcryptjs'
import type { UsersRepository } from 'src/repositories/users-repository'


interface RegisterUserUseCaseRequest {
    username: string
    email: string
    password: string
}

type RegisterUserUseCaseResponse = Either<
    UserAlreadyExistsError,
    {
        user: UserEntity
    }
>

@Injectable()
export class RegisterUserUseCase {
    constructor(
        private readonly usersRepository: UsersRepository
    ) {}
    async execute({ username, email, password}: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            return left(new UserAlreadyExistsError())
        }

        const hashedPassword = await hash(password, 8)
        
        const user = new UserEntity()
        user.username = username
        user.email = email
        user.passwordHash = hashedPassword

        await this.usersRepository.create(user)

        return right({ user })
    }
}