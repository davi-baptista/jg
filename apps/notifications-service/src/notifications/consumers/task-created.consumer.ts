import { Controller } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import type { TaskCreatedEvent } from '@jg/types/events/tasks'
import { CreateNotificationUseCase } from '../use-cases/create-notification.use-case'

@Controller()
export class TaskCreatedConsumer {
  constructor(
    private readonly createNotification: CreateNotificationUseCase,
  ) {}

  @EventPattern('task.created')
  async handle(event: TaskCreatedEvent) {
    console.log('[notifications] task.created', event)
    for (const userId of event.assignees) {
      await this.createNotification.execute({
        userId,
        type: 'TASK_CREATED',
        payload: event,
      })
    }
  }
}
