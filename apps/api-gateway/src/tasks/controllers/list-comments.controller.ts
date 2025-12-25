import { Controller, Get, Inject, Param, Query } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import type { ListCommentsPayload } from '@jg/types/http/tasks'
import { PaginationDto } from '../dto/pagination.dto'

@Controller('tasks')
export class ListCommentsController {
  constructor(
    @Inject('TASKS_CLIENT')
    private readonly client: ClientProxy,
  ) {}

  @Get(':id/comments')
  async handle(
    @Param('id') taskId: string,
    @Query() query: PaginationDto,
  ) {
    const payload: ListCommentsPayload = {
      taskId,
      page: query.page,
      size: query.size,
    }

    return this.client.send('tasks.comment.list', payload)
  }
}
