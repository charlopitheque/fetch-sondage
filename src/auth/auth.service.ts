import {Injectable} from '@nestjs/common';
import {UsersService} from '../users/users.service';

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (user.length === 1 && user[0].password === pass) {
            const {password, ...result} = user[0];
            return result;
        }
        return null;
    }
}
