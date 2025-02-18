import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDate,
  ValidateNested,
  IsEnum,
  IsArray,
  IsUUID,
  IsNumber,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}

class ClientDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(11)
  cpf?: string;

  @IsOptional()
  @IsString()
  @MaxLength(14)
  cnpj?: string;

  @IsOptional()
  @IsString()
  nameFantasy?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateBirth?: Date;
}

class OrderItemDto {
  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsUUID()
  productId: string;
}

export class CreateOrderDto {
  @ValidateNested()
  @Type(() => ClientDto)
  client: ClientDto;

  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  @IsArray()
  orderItems: OrderItemDto[];

  @IsNotEmpty()
  @IsUUID()
  companyId: string;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}
