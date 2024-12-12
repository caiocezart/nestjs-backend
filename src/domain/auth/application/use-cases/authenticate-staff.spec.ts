import { InMemoryStaffsRepository } from '@/test/repositories/in-memory-staffs-repository';
import { RegisterStaffUseCase } from '@/src/domain/auth/application/use-cases/register-staff';
import { FakeHasher } from '@/test/cryptography/fake-hasher';
import { AuthenticateStaffUseCase } from '@/src/domain/auth/application/use-cases/authenticate-staff';
import { FakeEncrypter } from '@/test/cryptography/fake-encrypter';
import { makeStaff } from '@/test/factories/make-staff';

let inMemoryStaffsRepository: InMemoryStaffsRepository;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;
let sut: AuthenticateStaffUseCase;

describe('Authenticate Staff', () => {
  beforeEach(() => {
    inMemoryStaffsRepository = new InMemoryStaffsRepository();
    fakeHasher = new FakeHasher();
    fakeEncrypter = new FakeEncrypter();

    sut = new AuthenticateStaffUseCase(
      inMemoryStaffsRepository,
      fakeHasher,
      fakeEncrypter
    )
  });

  it('should be able to authenticate a Staff', async () => {
    const staff = makeStaff({
      email: 'caio@caio.com',
      password: await fakeHasher.hash('caiocaio'),
    })

    inMemoryStaffsRepository.items.push(staff);

    const result = await sut.execute({
      email: 'caio@caio.com',
      password: 'caiocaio',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    });
  });
});
