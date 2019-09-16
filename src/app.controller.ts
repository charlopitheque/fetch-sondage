import {Controller, Get, Post, UseGuards, Request} from '@nestjs/common';
import {AppService} from './app.service';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from './auth/auth.service';

@Controller('api')
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly authService: AuthService,
    ) {
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        console.log('ici controller');
        return this.authService.login(req.user);
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
