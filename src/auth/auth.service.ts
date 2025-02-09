import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CompaniesService } from 'src/companies/companies.service';

@Injectable()
export class AuthService {
  constructor(
    private CompaniesService: CompaniesService,
    private jwtService: JwtService,
  ) {}

  async login(createAuthDto: CreateAuthDto) {
    const company = await this.CompaniesService.findOneLogin(
      createAuthDto.email,
    );
    if (
      !company ||
      !bcrypt.compareSync(createAuthDto.password, company.password)
    ) {
      throw new Error('Invalid email or password');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = company;

    return {
      access_token: this.jwtService.sign(result),
    };
  }
}
