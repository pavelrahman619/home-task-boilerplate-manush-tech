// src/promotion/entities/promotion.entity.ts

import { Promotion, PromotionType } from '@prisma/client';

export class PromotionEntity implements Promotion {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  enabled: boolean;
  type: PromotionType; // You can keep this as string, or use a more specific enum type

  createdAt: Date;
  updatedAt: Date;
}
