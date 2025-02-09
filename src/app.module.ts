import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [PrismaModule, CompaniesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
