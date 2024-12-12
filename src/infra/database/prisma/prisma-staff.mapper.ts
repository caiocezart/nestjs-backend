import { User as PrismaUser, Prisma } from '@prisma/client';
import { UniqueEntityID } from '@/src/core/entities/unique-entity-id';
import { Staff } from '@/src/domain/auth/enterprise/entities/staff';

export class PrismaStaffMapper {
  static toDomain(raw: PrismaUser): Staff {
    return Staff.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(staff: Staff): Prisma.UserUncheckedCreateInput {
    return {
      id: staff.id.toString(),
      name: staff.name,
      email: staff.email,
      password: staff.password,
    };
  }
}
