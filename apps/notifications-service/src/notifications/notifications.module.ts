import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CreateNotificationUseCase } from './use-cases/create-notification.use-case'
import { TaskCreatedConsumer } from './consumers/task-created.consumer'
import { TaskUpdatedConsumer } from './consumers/task-updated.consumer'
import { TaskDeletedConsumer } from './consumers/task-deleted.consumer'
import { TaskCommentCreatedConsumer } from './consumers/task-comment-created.consumer'
import { NotificationEntity } from '@/db/entities/notification.entity'
import { NotificationsRepository } from '@/repositories/notifications-repository'
import { TypeOrmNotificationsRepository } from './repositories/typeorm-notifications-repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationEntity]),
  ],
  providers: [
    CreateNotificationUseCase,

    {
      provide: NotificationsRepository,
      useClass: TypeOrmNotificationsRepository,
    },

    TaskCreatedConsumer,
    TaskUpdatedConsumer,
    TaskDeletedConsumer,
    TaskCommentCreatedConsumer,
  ],
})
export class NotificationsModule {}
