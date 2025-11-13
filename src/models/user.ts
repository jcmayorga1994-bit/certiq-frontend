// src/models/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
}

export class UserModel implements User {
  id!: number;
  name!: string;
  email!: string;
  role?: string;

  constructor(data: User) {
    Object.assign(this, data);
  }

  get shortName(): string {
    return this.name.split(' ')[0];
  }

  get initials(): string {
    return this.name
      .split(' ')
      .map((p) => p[0])
      .join('')
      .toUpperCase();
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }
}
