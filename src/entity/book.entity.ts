import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('Book')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 30 })
  name: string;

  @Column({ type: "int", default: 0 })
  bereadtimes: number;

  @Column({ default: true })
  keep: boolean;

// 创建时间设置
  @CreateDateColumn({type:"timestamp"})
  entryTime:Date

}