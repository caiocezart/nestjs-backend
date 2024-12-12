import { Staff } from '@/src/domain/auth/enterprise/entities/staff';

export abstract class StaffRepository {
  abstract findByEmail(email: string): Promise<Staff | null>
  abstract create(staff: Staff): Promise<void>
}
