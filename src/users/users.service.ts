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

    findOne(email: string): Promise<User[]> {
        return this.userRepository.find({where: {email}, take: 1});
    }

    create(user: User): any {
        return this.userRepository.save(user);
    }
}
