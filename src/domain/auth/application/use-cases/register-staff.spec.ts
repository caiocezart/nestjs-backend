import { InMemoryStaffsRepository } from '@/test/repositories/in-memory-staffs-repository';
import { RegisterStaffUseCase } from '@/src/domain/auth/application/use-cases/register-staff';
import { FakeHasher } from '@/test/cryptography/fake-hasher';

let inMemoryStaffsRepository: InMemoryStaffsRepository;
let fakeHasher: FakeHasher;
let sut: RegisterStaffUseCase;

describe('Register Staff', () => {
  beforeEach(() => {
    inMemoryStaffsRepository = new InMemoryStaffsRepository();
    fakeHasher = new FakeHasher();

    sut = new RegisterStaffUseCase(inMemoryStaffsRepository, fakeHasher);
  });

  it('should be able to register a new Staff', async () => {
    const result = await sut.execute({
      name: 'Caio Trevisan',
      email: 'caio@caio.com',
      password: 'caiocaio',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      staff: inMemoryStaffsRepository.items[0],
    });
  });
});
