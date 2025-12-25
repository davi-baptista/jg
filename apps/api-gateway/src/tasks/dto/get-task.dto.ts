import { Controller, Get, Inject, Param } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import type { GetTaskPayload } from '@jg/types/http/tasks'

@Controller('tasks')
export class GetTaskController {
  constructor(
    @Inject('TASKS_CLIENT')
    private readonly client: ClientProxy,
  ) {}

  @Get(':id')
  async handle(@Param('id') taskId: string) {
    const payload: GetTaskPayload = { taskId }
    return this.client.send('tasks.get', payload)
  }
}
