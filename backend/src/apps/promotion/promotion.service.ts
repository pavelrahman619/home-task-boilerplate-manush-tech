// src/promotion/promotion.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';

@Injectable()
export class PromotionService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.promotion.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        promotionSlabs: true,
      },
    });
  }

  async create(createPromotionDto: CreatePromotionDto) {
    return this.prisma.promotion.create({
      data: createPromotionDto,
    });
  }

  async update(id: number, updatePromotionDto: CreatePromotionDto) {
    return this.prisma.promotion.update({
      where: { id },
      data: updatePromotionDto,
    });
  }

  async disable(id: number) {
    return this.prisma.promotion.update({
      where: { id },
      data: { enabled: false },
    });
  }

  async enable(id: number) {
    return this.prisma.promotion.update({
      where: { id },
      data: { enabled: true },
    });
  }

  async findAllEnabled() {
    return this.prisma.promotion.findMany({
      where: { enabled: true },
      include: {
        promotionSlabs: true,
      },
    });
  }
}
