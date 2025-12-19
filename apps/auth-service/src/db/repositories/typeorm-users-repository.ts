import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { UsersRepository } from "src/repositories/users-repository"
import { UserEntity } from "../entities/user.entity"
import { Repository } from "typeorm"

@Injectable()
export class UserTypeOrmRepository implements UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email })
  }

  async create(user: UserEntity) {
    await this.usersRepository.save(user)
  }
}
