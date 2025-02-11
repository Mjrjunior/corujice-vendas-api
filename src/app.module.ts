import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CompaniesModule } from './companies/companies.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [PrismaModule, CompaniesModule, AuthModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
