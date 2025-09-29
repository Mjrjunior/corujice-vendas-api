import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import type { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto, @Req() req: Request) {
    const companyId = req['company'].id;
    return this.productsService.create(createProductDto, companyId);
  }

  @Get()
  findAll(@Req() req: Request, @Query('name') name?: string) {
    const companyId = req['company'].id;
    return this.productsService.findAll(companyId, name);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    const companyId = req['company'].id;
    return this.productsService.findOne(id, companyId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Req() req: Request,
  ) {
    const companyId = req['company'].id;
    return this.productsService.update(id, updateProductDto, companyId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    const companyId = req['company'].id;
    return this.productsService.remove(id, companyId);
  }
}
