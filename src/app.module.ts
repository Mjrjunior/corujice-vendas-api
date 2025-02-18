import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CompaniesModule } from './companies/companies.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    PrismaModule,
    CompaniesModule,
    AuthModule,
    ProductsModule,
    OrdersModule,
    ClientsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
