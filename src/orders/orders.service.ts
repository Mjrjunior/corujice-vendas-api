import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { nanoId } from 'src/utils/codeGenerate';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
  async create(createOrderDto: CreateOrderDto, company_id: string) {
    const { client, orderItems } = createOrderDto;
    const existingClient = await this.prisma.client.findFirst({
      where: {
        email: client.email,
      },
    });

    if (createOrderDto.companyId !== company_id) {
      throw new Error(
        'You are not allowed to create orders for other companies',
      );
    }

    const totalValue = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    return this.prisma.$transaction(async (prisma) => {
      const createdClient =
        existingClient ||
        (await prisma.client.create({
          data: client,
        }));

      const createdOrder = await prisma.order.create({
        data: {
          value: totalValue,
          code: nanoId(),
          companyId: company_id,
          clientId: createdClient.id,
        },
      });

      const createdOrderItems = await Promise.all(
        orderItems.map((item) =>
          prisma.orderItem.create({
            data: {
              ...item,
              orderId: createdOrder.id,
            },
          }),
        ),
      );

      return { createdClient, createdOrder, createdOrderItems };
    });
  }

  findAll(company_id: string, clientName: string) {
    return this.prisma.order.findMany({
      where: {
        companyId: company_id,
        ...(clientName && {
          Client: {
            name: {
              contains: clientName,
              mode: 'insensitive',
            },
          },
        }),
      },
      include: {
        Client: true,
      },
    });
  }

  findOne(code: string, company_id: string) {
    return this.prisma.order.findFirst({
      where: {
        code,
        companyId: company_id,
      },
      include: {
        Client: true,
        OrderItem: true,
      },
    });
  }

  async update(
    code: string,
    updateOrderDto: UpdateOrderDto,
    company_id: string,
  ) {
    const order = await this.prisma.order.findUnique({
      where: {
        code,
      },
    });
    if (order.companyId !== company_id) {
      throw new Error(
        'You are not allowed to update products from other companies',
      );
    }
    return this.prisma.order.update({
      where: {
        code,
      },
      data: updateOrderDto,
    });
  }

  async remove(code: string, company_id: string) {
    const order = await this.prisma.order.findUnique({
      where: {
        code,
      },
    });

    if (order.companyId !== company_id) {
      throw new Error(
        'You are not allowed to delete products from other companies',
      );
    }
    await this.prisma.orderItem.deleteMany({
      where: {
        orderId: order.id,
      },
    });

    return this.prisma.order.delete({
      where: {
        code,
      },
    });
  }
}
