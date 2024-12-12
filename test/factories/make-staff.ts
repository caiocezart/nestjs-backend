import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/src/core/entities/unique-entity-id';
import { Staff, StaffProps } from '@/src/domain/auth/enterprise/entities/staff';

export function makeStaff(
  override: Partial<StaffProps> = {},
  id?: UniqueEntityID,
) {
  const staff = Staff.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  );

  return staff;
}
