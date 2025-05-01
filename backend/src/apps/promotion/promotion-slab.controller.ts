// src/promotion/promotion-slab.controller.ts

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PromotionSlabService } from './promotion-slab.service';
import { CreatePromotionSlabDto } from './dto/create-promotion-slab.dto';

@Controller('promotion-slab')
export class PromotionSlabController {
  constructor(private readonly promotionSlabService: PromotionSlabService) {}

  @Post()
  create(@Body() createPromotionSlabDto: CreatePromotionSlabDto) {
    return this.promotionSlabService.create(createPromotionSlabDto);
  }

  @Get(':promotionId')
  findByPromotionId(@Param('promotionId') promotionId: number) {
    return this.promotionSlabService.findByPromotionId(+promotionId);
  }
}