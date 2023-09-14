import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 30 })
  name: string;

  @Column({ type: "number" })
  bereadtimes: number;

  @Column({ default: true })
  keep: boolean;

// 创建时间设置
  @CreateDateColumn({type:"timestamp"})
  entryTime:Date

}