import { Entity } from '@/src/core/entities/entity';
import { UniqueEntityID } from '@/src/core/entities/unique-entity-id';
import { Optional } from '@prisma/client/runtime/library';

export interface StaffProps {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Staff extends Entity<StaffProps> {
  static create(
    props: Optional<StaffProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID,
    ) {
    const staff = new Staff({
      ...props,
      createdAt: new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    }, id);

    return staff;
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get createdAt() {
    return this.props.password
  }

  get updatedAt() {
    return this.props.password
  }
}
