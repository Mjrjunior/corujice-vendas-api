import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createProductDto: CreateProductDto, company_id: string) {
    if (createProductDto.companyId !== company_id) {
      throw new Error(
        'You are not allowed to create products for other companies',
      );
    }
    return this.prisma.products.create({
      data: createProductDto,
    });
  }

  findAll(company_id: string) {
    return this.prisma.products.findMany({
      where: {
        companyId: company_id,
      },
    });
  }

  async findOne(id: string, company_id: string) {
    const product = await this.prisma.products.findUnique({
      where: {
        id,
      },
    });

    if (product.companyId !== company_id) {
      throw new Error(
        'You are not allowed to access products from other companies',
      );
    }

    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
    company_id: string,
  ) {
    const product = await this.prisma.products.findUnique({
      where: {
        id,
      },
    });

    if (product.companyId !== company_id) {
      throw new Error(
        'You are not allowed to update products from other companies',
      );
    }

    return this.prisma.products.update({
      where: {
        id,
      },
      data: updateProductDto,
    });
  }

  async remove(id: string, company_id: string) {
    const product = await this.prisma.products.findUnique({
      where: {
        id,
      },
    });

    if (product.companyId !== company_id) {
      throw new Error(
        'You are not allowed to delete products from other companies',
      );
    }

    return this.prisma.products.delete({
      where: {
        id,
      },
    });
  }
}
