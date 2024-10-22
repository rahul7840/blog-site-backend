import * as bcrypt from 'bcrypt';

export class HashHelper {
  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }

  async comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  async hash(data: string): Promise<string> {
    const salt =  10;
    return bcrypt.hash(data, salt); 
  }

  async compare(data: string, hashedData: string): Promise<boolean> {
    return bcrypt.compare(data, hashedData);
  }
}
