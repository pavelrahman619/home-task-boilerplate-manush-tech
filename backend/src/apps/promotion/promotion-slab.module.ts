// src/promotion/promotion-slab.module.ts

import { Module } from '@nestjs/common';
import { PromotionSlabController } from './promotion-slab.controller';
import { PromotionSlabService } from './promotion-slab.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Module({
  controllers: [PromotionSlabController],
  providers: [PromotionSlabService, PrismaService],
})
export class PromotionSlabModule {}
