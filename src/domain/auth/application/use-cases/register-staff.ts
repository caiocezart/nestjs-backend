import { Staff } from '@/src/domain/auth/enterprise/entities/staff';
import { StaffRepository } from '@/src/domain/auth/application/repositories/staff.repository';
import { Hasher } from '@/src/domain/auth/enterprise/cryptography/hasher';
import { StaffAlreadyExistsError } from '@/src/domain/auth/application/use-cases/errors/staff-already-exists-error';
import { Either, left, right } from '@/src/core/utils/either';
import { Injectable } from '@nestjs/common';

interface RegisterStaffUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

type RegisterStaffUseCaseResponse = Either<
  StaffAlreadyExistsError,
  {
    staff: Staff;
  }
>;

@Injectable()
export class RegisterStaffUseCase {
  constructor(
    private staffRepository: StaffRepository,
    private hasher: Hasher,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterStaffUseCaseRequest): Promise<RegisterStaffUseCaseResponse> {
    const staffWithSameEmail = await this.staffRepository.findByEmail(email);

    if (staffWithSameEmail) {
      return left(new StaffAlreadyExistsError());
    }

    const hashedPassword = await this.hasher.hash(password);

    const staff = Staff.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.staffRepository.create(staff);

    return right({
      staff,
    });
  }
}
