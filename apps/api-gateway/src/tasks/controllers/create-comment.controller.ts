import { Body, Controller, Inject, Param, Post } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { CreateCommentDto } from '../dto/create-comment.dto'
import { CurrentUser } from '@/auth/decorators/current-user.decorator'
import type { JwtPayload } from '@/auth/strategies/jwt.strategy'
import type { CreateCommentPayload } from '@jg/types/http/tasks'

@Controller('tasks')
export class CreateCommentController {
  constructor(
    @Inject('TASKS_CLIENT')
    private readonly client: ClientProxy,
  ) {}

  @Post(':id/comments')
  async handle(
    @Param('id') taskId: string,
    @Body() body: CreateCommentDto,
    @CurrentUser() user: JwtPayload,
  ) {
    const payload: CreateCommentPayload = {
      taskId,
      content: body.content,
      authorId: user.sub,
    }

    return this.client.send('tasks.comment.create', payload)
  }
}
