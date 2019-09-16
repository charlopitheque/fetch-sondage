import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../entities/user.entity';

export type User = any;

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }

    async findOne(email: string): Promise<User[]> {
        const user =  await this.userRepository.find({where: {email}, take: 1});
        console.log(user);
        return user;
    }

    create(user: User): any {
        return this.userRepository.save(user);
    }
}
