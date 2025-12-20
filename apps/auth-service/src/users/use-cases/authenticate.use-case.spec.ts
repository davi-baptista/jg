import { inMemoryUsersRepository } from '@test/repositories/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate.use-case'
import { makeUser } from '@test/factories/make-user'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let usersRepository: inMemoryUsersRepository
let sut: AuthenticateUseCase

const jwtServiceMock = {
  signAsync: vi
    .fn()
    .mockResolvedValueOnce('access-token')
    .mockResolvedValueOnce('refresh-token'),
}

describe('Create Question', () => {
  beforeEach(() => {
    usersRepository = new inMemoryUsersRepository()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sut = new AuthenticateUseCase(usersRepository, jwtServiceMock as any)
  })

  it('should be able to authenticate a user', async () => {
    const user = await makeUser({ email: 'john_doe@gmail.com', password: '123456' })
    await usersRepository.create(user)

    const result = await sut.execute({
      email: 'john_doe@gmail.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
    })
  })

  it('should not be able to authenticate a user with wrong credentials', async () => {
    const user = await makeUser({ email: 'john_doe@gmail.com', password: '123456' })
    await usersRepository.create(user)
    
    const result = await sut.execute({
      email: 'john_doe@gmail.com',
      password: '654321',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidCredentialsError)
  })
})