import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

//创建枚举类型(自定义类型)
export type UserRoleType = "admin" | "common"

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 20 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @Column({ type: "varchar", length: 11 })
  phone: string;

  @Column()
  email: string;

  @Column({
    type: "enum",
    enum: ["admin", "common"],
    default: "common"
})
  role: UserRoleType[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ type:'int', default:0 })
  readtimes: number;

  @Column({ type:'varchar' })
  salt:string;

//创建时间设置
//   @CreateDateColumn({type:"timestamp"})
//   entryTime:Date

}

