// src/promotion/promotion-slab.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreatePromotionSlabDto } from './dto/create-promotion-slab.dto';

@Injectable()
export class PromotionSlabService {
  constructor(private prisma: PrismaService) {}

  async create(createPromotionSlabDto: CreatePromotionSlabDto) {
    const { promotionId, ...slabData } = createPromotionSlabDto;
  
    return this.prisma.promotionSlab.create({
      data: {
        ...slabData,
        promotion: { connect: { id: promotionId } },
      },
    });
  }

  async findByPromotionId(promotionId: number) {
    return this.prisma.promotionSlab.findMany({
      where: { promotionId },
    });
  }
}
