import {
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator'

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE',
}


export class CreateTaskDto {
  @IsString()
  @MinLength(3)
  title: string

  @IsOptional()
  @IsString()
  description?: string

  @IsArray()
  @IsUUID('4', { each: true })
  assignees: string[]

  @IsEnum(TaskPriority)
  priority: TaskPriority

  @IsEnum(TaskStatus)
  status: TaskStatus

  @IsOptional()
  @IsDateString()
  dueDate?: string
}
