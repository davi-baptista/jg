import { Module } from '@nestjs/common';
import { EnvModule } from './env/env.module';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [EnvModule, DbModule, AuthModule],
})
export class AppModule {}
