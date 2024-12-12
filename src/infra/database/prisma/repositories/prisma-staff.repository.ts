import { PrismaService } from '@/src/infra/database/prisma/prisma.service';
import { Staff } from '@/src/domain/auth/enterprise/entities/staff';
import { StaffRepository } from '@/src/domain/auth/application/repositories/staff.repository';
import { PrismaStaffMapper } from '@/src/infra/database/prisma/prisma-staff.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaStaffRepository implements StaffRepository {
  constructor(private prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<Staff | null> {
    const staff = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!staff) return null;

    return PrismaStaffMapper.toDomain(staff);
  }

  async create(staff: Staff): Promise<void> {
    const data = PrismaStaffMapper.toPrisma(staff);

    await this.prismaService.user.create({ data });
  }
}
