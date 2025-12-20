import { inMemoryUsersRepository } from '@test/repositories/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { RegisterUseCase } from './register.use-case'

let usersRepository: inMemoryUsersRepository
let sut: RegisterUseCase

describe('Create Question', () => {
  beforeEach(() => {
    usersRepository = new inMemoryUsersRepository()

    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register a user', async () => {
    const result = await sut.execute({
      username: 'John Doe',
      email: 'john_doe@gmail.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      user: usersRepository.items[0],
    })
  })

  it('should hash user password upon registration', async () => {
    const result = await sut.execute({
      username: 'Example Name',
      email: 'example@example',
      password: '123456',
    })

    const user = usersRepository.items[0]
    
    const isPasswordCorrect = await compare('123456', user.passwordHash)

    expect(result.isRight()).toBe(true)
    expect(isPasswordCorrect).toBe(true)
  })
})