import { Module } from '@nestjs/common';
import { AuthModule } from './apps/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { SharedModule } from './modules/shared.module';
import { ProductModule } from './apps/product/product.module';
import { PromotionModule } from './apps/promotion/promotion.module';
import { OrderModule } from './apps/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    SharedModule,
    ProductModule,
    PromotionModule,
    OrderModule
  ],
  providers: [AuthModule, PrismaModule],
})
export class AppModule {}
