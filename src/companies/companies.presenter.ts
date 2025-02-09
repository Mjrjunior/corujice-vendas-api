import type { Company } from '@prisma/client';

export class CompaniesPresenter {
  constructor(readonly companies: Company) {}

  toJSON() {
    return {
      id: this.companies.id,
      name: this.companies.name,
      email: this.companies.email,
      created_at: this.companies.createdAt,
      updated_at: this.companies.updatedAt,
    };
  }
}
