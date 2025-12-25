import type { UserEntity } from "@/db/entities/user.entity";
import type { UsersRepository } from "@/repositories/users-repository";
export declare class inMemoryUsersRepository implements UsersRepository {
    items: UserEntity[];
    findByEmail(email: string): Promise<UserEntity | null>;
    create(user: UserEntity): Promise<void>;
}
