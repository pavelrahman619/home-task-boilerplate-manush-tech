// src/product/product.service.ts
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }

  // List products
  async findAll() {
    return this.prisma.product.findMany(
      {
        orderBy: {
          createdAt: 'asc',
        },
      }
    );
  }

  // Create a product
  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({ data: createProductDto });
  }

  // Edit a product
  async update(id: number, updateProductDto: CreateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  // Disable a product
  async disable(id: number) {
    return this.prisma.product.update({
      where: { id },
      data: { enabled: false },
    });
  }

  // Enable a product
  async enable(id: number) {
    return this.prisma.product.update({
      where: { id },
      data: { enabled: true },
    });
  }

  async findAllEnabled() {
    return this.prisma.product.findMany({
      where: { enabled: true },
    });
  }
}
