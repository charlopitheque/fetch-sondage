import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Answer } from './answer.entity';

@Entity()
export class Sondage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('datetime')
  creationDate: Date;

  @OneToMany(type => Answer, answer => answer.sondage, {cascade: true})
  @JoinColumn()
  answers: Answer[];
}
