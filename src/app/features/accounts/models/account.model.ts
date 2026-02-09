export interface Account {
  id: string;
  name: string;
  type: AccountType;
  status: AccountStatus;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum AccountType {
  Organization = 'Organization',
  Individual = 'Individual'
}

export enum AccountStatus {
  Active = 'Active',
  Inactive = 'Inactive'
}
