import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from '@/src/infra/pipes/zod-validation.pipe';
import { z } from 'zod';
import { AuthenticateStaffUseCase } from '@/src/domain/auth/application/use-cases/authenticate-staff';
import { StaffAlreadyExistsError } from '@/src/domain/auth/application/use-cases/errors/staff-already-exists-error';
import { Public } from '@/src/infra/security/public';

const authBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthBodySchema = z.infer<typeof authBodySchema>;

@Public()
@Controller('/sessions')
export class SessionsController {
  constructor(private authenticateStaff: AuthenticateStaffUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authBodySchema))
  async handle(@Body() body: AuthBodySchema) {
    const { email, password } = body;

    const result = await this.authenticateStaff.execute({
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case StaffAlreadyExistsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const { accessToken } = result.value;

    return {
      access_token: accessToken,
    };
  }
}
