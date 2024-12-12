import { UseCaseError } from '@/src/core/errors/use-case-error';

export class StaffAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super('Staff already exists');
  }
}