import { Module } from '@nestjs/common';
import { SondagesService } from './sondages.service';
import { SondageController } from './sondageController/sondage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sondage } from '../entities/sondage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sondage])],
  controllers: [SondageController],
  providers: [SondagesService],
  // exports: [SondagesService],
})
export class SondagesModule {
}
