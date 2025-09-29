
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
	@ApiProperty({ example: 'João Silva', description: 'Nome do cliente' })
	name: string;

	@ApiProperty({ example: 'joao@email.com', description: 'E-mail do cliente' })
	email: string;

	@ApiProperty({ example: '12345678901', description: 'CPF do cliente', required: false })
	cpf?: string;

	@ApiProperty({ example: '12345678000199', description: 'CNPJ do cliente', required: false })
	cnpj?: string;
}
