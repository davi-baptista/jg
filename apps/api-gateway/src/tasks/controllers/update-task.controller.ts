import { Body, Controller, Inject, Param, Put } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { UpdateTaskDto } from '../dto/update-task.dto'
import { CurrentUser } from '@/auth/decorators/current-user.decorator'
import type { JwtPayload } from '@/auth/strategies/jwt.strategy'
import type { UpdateTaskPayload } from '@jg/types/http/tasks'

@Controller('tasks')
export class UpdateTaskController {
  constructor(
    @Inject('TASKS_CLIENT')
    private readonly client: ClientProxy,
  ) {}

  @Put(':id')
  async handle(
    @Param('id') taskId: string,
    @Body() body: UpdateTaskDto,
    @CurrentUser() user: JwtPayload,
  ) {
    const payload: UpdateTaskPayload = {
      taskId,
      ...body,
      updatedBy: user.sub,
    }

    return this.client.send('tasks.update', payload)
  }
}
