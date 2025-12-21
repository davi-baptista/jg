import { Injectable } from '@nestjs/common'
import { UserEntity } from 'src/db/entities/user.entity'
import { UserAlreadyExistsError } from '../../../../api-gateway/src/auth/controllers/errors/user-already-exists-error'
import { hash } from 'bcryptjs'
import { UsersRepository } from 'src/repositories/users-repository'
import { Either, left, right } from '@jg/utils'


interface RegisterUseCaseRequest {
    username: string
    email: string
    password: string
}

type RegisterUseCaseResponse = Either<
    UserAlreadyExistsError,
    {
        user: UserEntity
    }
>

@Injectable()
export class RegisterUseCase {
    constructor(
        private usersRepository: UsersRepository
    ) {}
    async execute({ username, email, password}: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
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