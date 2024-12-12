import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/src/infra/database/database.module';
import { SessionsController } from '@/src/infra/http/controllers/admin/sessions/sessions.controller';
import { RegisterStaffUseCase } from '@/src/domain/auth/application/use-cases/register-staff';
import { AuthenticateStaffUseCase } from '@/src/domain/auth/application/use-cases/authenticate-staff';
import { CreateAccountsController } from '@/src/infra/http/controllers/admin/accounts/create-accounts.controller';
import { SecurityModule } from '@/src/infra/security/security.module';

@Module({
  imports: [SecurityModule, DatabaseModule],
  controllers: [SessionsController, CreateAccountsController],
  providers: [RegisterStaffUseCase, AuthenticateStaffUseCase],
})
export class HttpModule {}
