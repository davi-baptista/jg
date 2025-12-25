import { Module } from '@nestjs/common';
import { EnvModule } from './env/env.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [EnvModule, AuthModule, TasksModule],
})
export class AppModule {}
