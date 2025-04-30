// src/product/entities/product.entity.ts
import { Product } from '@prisma/client';

export class ProductEntity implements Product {
  id: number;
  name: string;
  description: string;
  price: number;
  weight: number;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
