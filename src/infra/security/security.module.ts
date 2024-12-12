import { Module } from '@nestjs/common';
import { Encrypter } from '@/src/domain/auth/enterprise/cryptography/encrypter';
import { JwtEncrypter } from '@/src/infra/security/jwt-encrypter';
import { BcryptHasher } from '@/src/infra/security/bcrypt-hasher';
import { Hasher } from '@/src/domain/auth/enterprise/cryptography/hasher';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Env } from '@/src/infra/env';
import { JwtStrategy } from '@/src/infra/security/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@/src/infra/security/jwt-auth.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService<Env, true>) {
        const privateKey = config.get('JWT_PRIVATE_KEY', { infer: true });
        const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true });

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        };
      },
    }),
  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
    {
      provide: Hasher,
      useClass: BcryptHasher,
    },
  ],
  exports: [Encrypter, Hasher],
})
export class SecurityModule {}
