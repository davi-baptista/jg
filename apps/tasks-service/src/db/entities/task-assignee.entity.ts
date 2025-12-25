import {
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm'
import { TaskEntity } from './task.entity'

@Entity('task_assignees')
export class TaskAssigneeEntity {
  @PrimaryColumn('uuid', { name: 'task_id' })
  taskId: string

  @PrimaryColumn('uuid', { name: 'user_id' })
  userId: string

  @ManyToOne(() => TaskEntity, task => task.assignees, {
    onDelete: 'CASCADE',
  })
  task: TaskEntity
}
