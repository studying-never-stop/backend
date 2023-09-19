import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export type kinds = "Class of classes" | "philosophy" | "religion" | "science" 
| "Applied science" | "Social sciences" | "Historical land class" | "Historical places in China" 
| "World-historical site" | "Language category" | "arts"  
@Entity('Book')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 30 })
  name: string;

  @Column({ type: "varchar", length: 30 })
  writer: string;

  @Column({ type: "int", default: 10 })
  cost: number;

  @Column({ type: "int", default: 0 })
  bereadtimes: number;

  @Column({ type: "int", default: 1 })
  keep: number;

  @Column({
    type: "enum",
    enum: ["Class of classes" , //总类
     "philosophy" ,  //哲学
     "religion" , // 宗教
      "science" ,  //科学
      "Applied science" , //应用科学
      "Social sciences" ,  //社会科学
      "Historical land class" , //史地类
      "Historical places in China" , // 中国史地
      "World-historical site" , // 世界史地
      "Language category" , // 语文
      "arts" ],  // 艺术
    default: "Class of classes"
   })
  kind: kinds[];

// 创建时间设置
  @CreateDateColumn({type:"timestamp"})
  entryTime:Date

}

