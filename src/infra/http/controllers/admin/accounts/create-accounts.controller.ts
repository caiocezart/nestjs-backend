import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post, UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '@/src/infra/pipes/zod-validation.pipe';
import { RegisterStaffUseCase } from '@/src/domain/auth/application/use-cases/register-staff';
import { WrongCredentialsError } from '@/src/domain/auth/application/use-cases/errors/wrong-credentials-error';
import { Public } from '@/src/infra/security/public';

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Public()
@Controller('/accounts')
export class CreateAccountsController {
  constructor(private registerStaff: RegisterStaffUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body;

    const result = await this.registerStaff.execute({
      name,
      email,
      password,
    });

    if(result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }

}
