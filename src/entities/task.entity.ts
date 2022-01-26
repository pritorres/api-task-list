import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { User } from './user.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category_id: number;

  @Column()
  user_id: number;

  /*  @Column()
  category_id: number;

  @Column()
  user_id: number; */
  @Column()
  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category[];

  @Column()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User[];
}
