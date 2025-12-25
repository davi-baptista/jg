import { Controller, Get, Inject, Query } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { PaginationDto } from '../dto/pagination.dto'
import type { ListTasksPayload } from '@jg/types/http/tasks'

@Controller('tasks')
export class ListTasksController {
  constructor(
    @Inject('TASKS_CLIENT')
    private readonly client: ClientProxy,
  ) {}

  @Get()
  async handle(@Query() query: PaginationDto) {
    const payload: ListTasksPayload = {
      page: query.page,
      size: query.size,
    }

    return this.client.send('tasks.list', payload)
  }
}
