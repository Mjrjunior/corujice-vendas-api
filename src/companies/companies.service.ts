import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createCompanyDto: CreateCompanyDto) {
    return this.prisma.company.create({
      data: {
        ...createCompanyDto,
        password: this.generateHash(createCompanyDto.password),
      },
    });
  }

  findAll() {
    return this.prisma.company.findMany(); 
  }

  findOne(id: string) {
    return this.prisma.company.findUnique({
      where: {
        id,
      },
    });
  }

  findOneLogin(email: string) {
    return this.prisma.company.findUnique({
      where: {
        email,
      },
    });
  }

  update(id: string, updateCompanyDto: UpdateCompanyDto) {
    return this.prisma.company.update({
      where: {
        id,
      },
      data: {
        ...updateCompanyDto,
        password: this.generateHash(updateCompanyDto.password),
      },
    });
  }

  remove(id: string) {
    return this.prisma.company.delete({
      where: {
        id,
      },
    });
  }

  generateHash(password: string) {
    return bcrypt.hashSync(password, 10);
  }
}
