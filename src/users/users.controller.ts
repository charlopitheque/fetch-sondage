import {Controller, Header, Post, Request} from '@nestjs/common';
import {UsersService} from './users.service';
import {User} from "../entities/user.entity";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post()
    @Header('Access-Control-Allow-Origin', '*')
    async post(@Request() req) {
        console.log(req.body);
        const user = new User();
        user.name = req.body.name;
        user.password = req.body.password;
        user.email = req.body.email;
        this.usersService.create(user);
    }
}
