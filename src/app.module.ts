import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SondageController } from './sondages/sondageController/sondage.controller';
import { SondagesService } from './sondages/sondages.service';
import { SondagesModule } from './sondages/sondages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'sondage_bdd',
        entities: [join(__dirname, '**/**.entity{.ts,.js}')],
        synchronize: true,
      },
    ),
    SondagesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // constructor(private readonly connection: Connection) {
  // }
}
