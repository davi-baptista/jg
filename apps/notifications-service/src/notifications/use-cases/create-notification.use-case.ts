import { Injectable } from '@nestjs/common'
import { NotificationsRepository } from '@/repositories/notifications-repository'
import { NotificationEntity } from '@/db/entities/notification.entity'

@Injectable()
export class CreateNotificationUseCase {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(params: {
    userId: string
    type: string
    payload: Record<string, any>
  }) {
    const notification = new NotificationEntity()
    notification.userId = params.userId
    notification.type = params.type
    notification.payload = params.payload

    await this.notificationsRepository.add(notification)
  }
}
