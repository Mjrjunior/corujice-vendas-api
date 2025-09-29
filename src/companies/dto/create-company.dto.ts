
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ example: 'Empresa Exemplo', description: 'Nome da empresa' })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'empresa@email.com', description: 'E-mail da empresa' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'senha123', description: 'Senha de acesso' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
