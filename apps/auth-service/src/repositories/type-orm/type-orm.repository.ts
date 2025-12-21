// src/users/repositories/typeorm-users.repository.ts
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '@/db/entities/user.entity'
import { UsersRepository } from '../users-repository'

@Injectable()
export class TypeOrmUsersRepository implements UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly ormRepo: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string) {
    return this.ormRepo.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        passwordHash: true,
        isActive: true,
      },
    })
  }

  async create(user: UserEntity) {
    await this.ormRepo.save(user)
  }
}
