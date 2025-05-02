import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) { }

  private async getDiscount(productId: number, quantity: number): Promise<number> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }

    const promotions = await this.prisma.promotion.findMany({
      where: {
        enabled: true,
        startDate: { lte: new Date() },
        endDate: { gte: new Date() },
      },
      include: { promotionSlabs: true },
    });

    let totalDiscount = 0;

    for (const promotion of promotions) {
      const totalWeight = product.weight * quantity;
      const matchingSlab = promotion.promotionSlabs.find(
        (slab) => totalWeight >= slab.minWeight && totalWeight <= slab.maxWeight
      );

      if (matchingSlab) {
        switch (promotion.type) {
          case 'PERCENTAGE':
            if (promotion.discountPercentage != null) {
              totalDiscount += (promotion.discountPercentage / 100) * product.price * quantity;
            }
            break;
          case 'FIXED':
            totalDiscount += matchingSlab.discount * quantity;
            break;
          case 'WEIGHTED':
            if (matchingSlab) {
              totalDiscount += matchingSlab.discount * quantity;
            }
            break;
        }
      }
    }

    return totalDiscount;
  }

  async createOrder(data: CreateOrderDto) {
    const itemsWithDetails = await Promise.all(
      data.items.map(async (item) => {
        const product = await this.prisma.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          throw new Error(`Product ${item.productId} not found`);
        }

        const discount = await this.getDiscount(item.productId, item.quantity);
        const total = (product.price * item.quantity) - discount;

        return {
          productId: item.productId,
          productName: product.name,
          quantity: item.quantity,
          unitPrice: product.price,
          discount,
          total,
        };
      })
    );

    const subtotal = itemsWithDetails.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );

    const totalDiscount = itemsWithDetails.reduce(
      (sum, item) => sum + item.discount,
      0
    );

    const total = subtotal - totalDiscount;

    return this.prisma.order.create({
      data: {
        customerName: data.customerName,
        subtotal,
        totalDiscount,
        total,
        items: {
          create: itemsWithDetails,
        },
      },
      include: {
        items: true,
      },
    });
  }

  async getAllOrders() {
    return this.prisma.order.findMany({
      include: { items: true },
    });
  }
}
