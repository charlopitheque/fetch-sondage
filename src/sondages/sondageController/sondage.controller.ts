import {Body, Controller, Get, Header, Param, Post, Req} from '@nestjs/common';
import {CreateSondageDTO} from '../DTO/CreateSondageDTO';
import {SondagesService} from '../sondages.service';
import {Sondage} from '../../entities/sondage.entity';

@Controller('sondage')
export class SondageController {
    constructor(private readonly sondagesService: SondagesService) {
    }

    @Get()
    @Header('Access-Control-Allow-Origin', '*')
    findAll(): Promise<Sondage[]> {
        return this.sondagesService.findAll();
    }

    @Get('push_sondage')
    pushSondage() {
        this.sondagesService.create('./src/data/sondageAnswers.csv');
    }

    @Get(':id')
    findOne(@Param() params): string {
        console.log(params.id);
        return `This action returns a #${params.id} sondage`;
    }

    @Post()
    async create(@Body() CreateSondageDTO: CreateSondageDTO) {
        return 'SondageInterface successfully posted';
    }

}
