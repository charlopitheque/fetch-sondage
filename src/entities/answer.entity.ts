import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Sondage } from './sondage.entity';
import { Question } from './question.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  label: string;

  @OneToOne(type => Question)
  @JoinColumn()
  question: Question;

  @ManyToOne(type => Sondage, sondage => sondage.answers)
  @JoinColumn()
  sondage: Sondage;
}
