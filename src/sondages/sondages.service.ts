import {Injectable} from '@nestjs/common';
// import { SondageInterface } from './interfaces/sondage.interface';
import {InjectRepository} from '@nestjs/typeorm';
import {Connection, Repository} from 'typeorm';
import {Sondage} from '../entities/sondage.entity';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import {Question} from '../entities/question.entity';
import {Answer} from '../entities/answer.entity';

@Injectable()
export class SondagesService {
    // private readonly sondages: SondageInterface[] = [];

    constructor(
        @InjectRepository(Sondage)
        private readonly sondageRepository: Repository<Sondage>,
        private readonly connection: Connection,
    ) {}

    findAll(): Promise<Sondage[]> {
        return this.sondageRepository.find({relations: ['answers', 'answers.question']});
    }

    create(file) {
        let i = 0;
        const lastRecord = this.sondageRepository.find({
            take: 1,
            order: {
                id: 'DESC',
            },
        });
        lastRecord.then(res => {
            console.log(res);
            fs.createReadStream(file)
                .pipe(csv())
                .on('data', (data) => {
                    if (res.length > 0 && new Date(res[0].creationDate).getTime() > new Date(data.Horodateur).getTime() ||
                        res.length > 0 && new Date(res[0].creationDate).getTime() === new Date(data.Horodateur).getTime()) {
                        console.log('ici');
                        i = res[0].id;
                    } else {
                        try {
                            i++;
                            const sondage = new Sondage();
                            sondage.name = `Sondage n°${i}`;
                            sondage.creationDate = new Date(data.Horodateur);
                            this.connection.manager.save(sondage)
                                .catch(() => {
                                    console.log('error sondage');
                                });
                            for (const dataKey in data) {
                                if (data.hasOwnProperty(dataKey)) {
                                    // console.log({ data: data[dataKey], key: dataKey });
                                    const question = new Question();
                                    question.label = dataKey;
                                    this.connection.manager.save(question)
                                        .catch(() => {
                                            console.log('error question');
                                        });
                                    const answer = new Answer();
                                    answer.label = data[dataKey];
                                    answer.question = question;
                                    answer.sondage = sondage;
                                    this.connection.manager.save(answer)
                                        .catch((err) => {
                                            console.log('err answer');
                                        });
                                }
                            }
                        } catch (err) {
                            console.log(err);
                        }
                    }
                })
                .on('end', () => {
                    console.log('ici');
                });
        });
    }

}
