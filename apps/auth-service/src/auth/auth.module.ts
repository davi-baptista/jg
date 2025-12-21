import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { RegisterUseCase } from './use-cases/register.use-case';
import { UsersRepository } from '@/repositories/users-repository';
import { TypeOrmUsersRepository } from '@/repositories/type-orm/type-orm.repository';
import { AuthenticateUseCase } from './use-cases/authenticate.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    RegisterUseCase,
    AuthenticateUseCase,
    {
      provide: UsersRepository,
      useClass: TypeOrmUsersRepository,
    },
  ],
  exports: [UsersRepository],
})
export class UsersModule {}
