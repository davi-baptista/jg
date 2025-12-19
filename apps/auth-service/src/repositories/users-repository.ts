import type { UserEntity } from "src/db/entities/user.entity"

export interface UsersRepository {
  findByEmail(email: string): Promise<UserEntity | null>
  
  create(user: UserEntity): Promise<void>
}