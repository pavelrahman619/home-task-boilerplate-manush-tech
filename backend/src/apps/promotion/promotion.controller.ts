// src/promotion/promotion.controller.ts

import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';

@Controller('promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Get()
  findAll() {
    return this.promotionService.findAll();
  }

  @Post()
  create(@Body() createPromotionDto: CreatePromotionDto) {
    return this.promotionService.create(createPromotionDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() createPromotionDto: CreatePromotionDto) {
    return this.promotionService.update(+id, createPromotionDto);
  }

  @Put('disable/:id')
  disable(@Param('id') id: string) {
    return this.promotionService.disable(+id);
  }

  @Put('enable/:id')
  enable(@Param('id') id: string) {
    return this.promotionService.enable(+id);
  }

  @Get('enabled')
  findAllEnabled() {
    return this.promotionService.findAllEnabled();
  }
}
