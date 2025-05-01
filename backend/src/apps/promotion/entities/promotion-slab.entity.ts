// src/promotion/entities/promotion-slab.entity.ts

import { PromotionSlab } from '@prisma/client';

export class PromotionSlabEntity implements PromotionSlab {
  id: number;
  promotionId: number;
  minWeight: number;
  maxWeight: number;
  discount: number;

  createdAt: Date;
  updatedAt: Date;
}
