
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}

class ClientDto {
  @ApiProperty({ example: 'cliente@email.com', description: 'E-mail do cliente' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'João Silva', description: 'Nome do cliente' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: '12345678901', description: 'CPF do cliente' })
  @IsOptional()
  @IsString()
  @MaxLength(11)
  cpf?: string;

  @ApiPropertyOptional({ example: '12345678000199', description: 'CNPJ do cliente' })
  @IsOptional()
  @IsString()
  @MaxLength(14)
  cnpj?: string;

  @ApiProperty({ example: '11999999999', description: 'Telefone do cliente' })
  @IsString()
  @MaxLength(15)
  phone: string;

  @ApiPropertyOptional({ example: 'Nome Fantasia', description: 'Nome fantasia do cliente' })
  @IsOptional()
  @IsString()
  nameFantasy?: string;

  @ApiPropertyOptional({ example: '1990-01-01', description: 'Data de nascimento do cliente' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateBirth?: Date;
}

class OrderItemDto {
  @ApiProperty({ example: 'Produto Exemplo', description: 'Nome do produto' })
  @IsNotEmpty()
  @IsString()
  productName: string;

  @ApiPropertyOptional({ example: 'vermelho', description: 'Cor do produto' })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({ example: 2, description: 'Quantidade do produto' })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 99.99, description: 'Preço do produto' })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'uuid-do-produto', description: 'ID do produto' })
  @IsNotEmpty()
  @IsUUID()
  productId: string;
}

export class CreateOrderDto {
  @ApiProperty({ type: ClientDto, description: 'Dados do cliente' })
  @ValidateNested()
  @Type(() => ClientDto)
  client: ClientDto;

  @ApiProperty({ type: [OrderItemDto], description: 'Itens do pedido' })
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  @IsArray()
  orderItems: OrderItemDto[];

  @ApiProperty({ example: 'uuid-da-empresa', description: 'ID da empresa' })
  @IsNotEmpty()
  @IsUUID()
  companyId: string;

  @ApiPropertyOptional({ enum: OrderStatus, description: 'Status do pedido' })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}
