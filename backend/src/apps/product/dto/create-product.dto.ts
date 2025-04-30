// src/product/dto/create-product.dto.ts
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  weight: number;

  @IsOptional()
  @IsBoolean()
  enabled: boolean;
}