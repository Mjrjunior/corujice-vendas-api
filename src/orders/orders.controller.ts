import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req: Request) {
    const companyId = req['company'].id;
    return this.ordersService.create(createOrderDto, companyId);
  }

  @Get()
  findAll(@Req() req: Request) {
    const companyId = req['company'].id;
    return this.ordersService.findAll(companyId);
  }

  @Get(':code')
  findOne(@Param('code') code: string, @Req() req: Request) {
    const companyId = req['company'].id;
    return this.ordersService.findOne(code, companyId);
  }

  @Patch(':code')
  update(
    @Param('code') code: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @Req() req: Request,
  ) {
    const companyId = req['company'].id;
    return this.ordersService.update(code, updateOrderDto, companyId);
  }

  @Delete(':code')
  remove(@Param('code') code: string, @Req() req: Request) {
    const companyId = req['company'].id;
    return this.ordersService.remove(code, companyId);
  }
}
