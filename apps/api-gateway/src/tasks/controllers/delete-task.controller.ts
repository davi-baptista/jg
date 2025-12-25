import { Controller, Delete, Inject, Param } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { CurrentUser } from '@/auth/decorators/current-user.decorator'
import type { JwtPayload } from '@/auth/strategies/jwt.strategy'
import type { DeleteTaskPayload } from '@jg/types/http/tasks'

@Controller('tasks')
export class DeleteTaskController {
  constructor(
    @Inject('TASKS_CLIENT')
    private readonly client: ClientProxy,
  ) {}

  @Delete(':id')
  async handle(
    @Param('id') taskId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    const payload: DeleteTaskPayload = {
      taskId,
      deletedBy: user.sub,
    }

    return this.client.send('tasks.delete', payload)
  }
}
