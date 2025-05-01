// src/promotion/promotion.module.ts

import { Module } from '@nestjs/common';
import { PromotionController } from './promotion.controller';
import { PromotionService } from './promotion.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { PromotionSlabModule } from './promotion-slab.module';

@Module({
  controllers: [PromotionController],
  providers: [PromotionService, PrismaService],
  imports: [PromotionSlabModule],
})
export class PromotionModule {}
