import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  //@Exclude() // en respuesta expluya la password
  @Column({ type: 'varchar', length: 70, nullable: true })
  password: string;
}
