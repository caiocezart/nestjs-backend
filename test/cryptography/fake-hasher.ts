import { Hasher } from '@/src/domain/auth/enterprise/cryptography/hasher';

export class FakeHasher implements Hasher {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed');
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash;
  }
}
