import { StaffRepository } from '@/src/domain/auth/application/repositories/staff.repository';
import { Hasher } from '@/src/domain/auth/enterprise/cryptography/hasher';
import { Either, left, right } from '@/src/core/utils/either';
import { Injectable } from '@nestjs/common';
import { Encrypter } from '@/src/domain/auth/enterprise/cryptography/encrypter';
import { WrongCredentialsError } from '@/src/domain/auth/application/use-cases/errors/wrong-credentials-error';

interface AuthenticateStaffUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateStaffUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string;
  }
>;

@Injectable()
export class AuthenticateStaffUseCase {
  constructor(
    private staffRepository: StaffRepository,
    private hasher: Hasher,
    private encrypter: Encrypter,
  ) {
  }

  async execute({
                  email,
                  password,
                }: AuthenticateStaffUseCaseRequest): Promise<AuthenticateStaffUseCaseResponse> {
    const staff = await this.staffRepository.findByEmail(email);

    if (!staff) {
      return left(new WrongCredentialsError());
    }

    const isPasswordValid = await this.hasher.compare(password, staff.password);

    if (!isPasswordValid) {
      return left(new WrongCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({
      sub: staff.id.toString(),
    });

    return right({
      accessToken,
    });
  }
}
