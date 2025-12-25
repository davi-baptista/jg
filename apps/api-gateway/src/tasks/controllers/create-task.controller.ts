import { Body, Controller, Inject, Post } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

import { CreateTaskDto } from '../dto/create-task.dto'
import { CurrentUser } from '@/auth/decorators/current-user.decorator'
import type { JwtPayload } from '@/auth/strategies/jwt.strategy'
import type { CreateTaskPayload } from '@jg/types/http/tasks'

@Controller('tasks')
export class CreateTaskController {
  constructor(
    @Inject('TASKS_CLIENT')
    private readonly client: ClientProxy,
  ) {}

  @Post()
  async handle(
    @Body() body: CreateTaskDto,
    @CurrentUser() user: JwtPayload,
  ) {
    const payload: CreateTaskPayload = {
      ...body,
      createdBy: user.sub,
    }

    return this.client.send(
      'tasks.create',
      payload,
    )
  }
}
