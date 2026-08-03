import bcrypt from "bcrypt";
export class BcryptServices {
  constructor() {}

  async hashedPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, userPassword: string) {
    return await bcrypt.compare(password, userPassword);
  }
}
