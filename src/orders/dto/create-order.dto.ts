enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}

export class CreateOrderDto {
  client: {
    email: string;
    name: string;
    cpf?: string;
    cnpj?: string;
    nameFantasy?: string;
    dateBirth?: Date;
  };
  orderItems: {
    productName: string;
    color?: string;
    quantity: number;
    price: number;
    productId: string;
  }[];
  companyId: string;
  status?: OrderStatus;
}
