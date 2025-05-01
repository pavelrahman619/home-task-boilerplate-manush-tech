// src/promotion/dto/create-promotion-slab.dto.ts

import { IsNumber } from 'class-validator';

export class CreatePromotionSlabDto {
  @IsNumber()
  minWeight: number;

  @IsNumber()
  maxWeight: number;

  @IsNumber()
  discount: number;

  @IsNumber()
  promotionId: number;
}
