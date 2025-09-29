
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Produto Exemplo', description: 'Nome do produto' })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 99.99, description: 'Preço do produto' })
  @IsPositive()
  price: number;

  @ApiProperty({ example: 'vermelho', description: 'Cor do produto', required: false })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty({ example: 'uuid-da-empresa', description: 'ID da empresa' })
  @IsString()
  @IsNotEmpty()
  companyId: string;
}
