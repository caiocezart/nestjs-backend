import { DomainEvents } from '@/src/core/events/domain-events';
import { StaffRepository } from '@/src/domain/auth/application/repositories/staff.repository';
import { Staff } from '@/src/domain/auth/enterprise/entities/staff';

export class InMemoryStaffsRepository implements StaffRepository {
  public items: Staff[] = [];

  async findByEmail(email: string) {
    const staff = this.items.find((item) => item.email === email);

    if (!staff) {
      return null;
    }

    return staff;
  }

  async create(staff: Staff) {
    this.items.push(staff);

    DomainEvents.dispatchEventsForAggregate(staff.id);
  }
}
