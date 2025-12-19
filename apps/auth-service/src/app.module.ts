import { Module } from '@nestjs/common';
import { EnvModule } from './env/env.module';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [EnvModule, DbModule, AuthModule, UsersModule],
})
export class AppModule {}
