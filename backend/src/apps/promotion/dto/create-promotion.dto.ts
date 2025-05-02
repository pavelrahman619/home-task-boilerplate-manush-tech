// src/promotion/dto/create-promotion.dto.ts

import { IsBoolean, IsDateString, IsEnum, IsNumber, IsString } from 'class-validator';
import { PromotionType } from '@prisma/client';

export class CreatePromotionDto {
  @IsString()
  title: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsEnum(PromotionType)
type: PromotionType;

  @IsNumber()
  discountPercentage: number;

  @IsBoolean()
  enabled: boolean;
}
