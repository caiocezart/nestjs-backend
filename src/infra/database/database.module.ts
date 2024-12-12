import { PrismaService } from '@/src/infra/database/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { StaffRepository } from '@/src/domain/auth/application/repositories/staff.repository';
import { PrismaStaffRepository } from '@/src/infra/database/prisma/repositories/prisma-staff.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: StaffRepository,
      useClass: PrismaStaffRepository,
    },
  ],
  exports: [PrismaService, StaffRepository],
})
export class DatabaseModule {}
