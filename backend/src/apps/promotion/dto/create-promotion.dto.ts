// src/promotion/dto/create-promotion.dto.ts

import { IsBoolean, IsDateString, IsEnum, IsString } from 'class-validator';
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

  @IsBoolean()
  enabled: boolean;
}
