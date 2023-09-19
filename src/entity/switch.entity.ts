import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

//创建枚举类型(自定义类型)
export type actionType = "lend" | "return" | "buy"

@Entity('Switch')
export class Switch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  actor: string;

  @Column({ type: "varchar", length: 100 })
  book: string;

  @Column({
    type: "enum",
    enum: ["lend" , "return" , "buy"],
    default: "buy"
})
  acttype: actionType[];

  @CreateDateColumn({type:"timestamp"})
  entryTime:Date
}