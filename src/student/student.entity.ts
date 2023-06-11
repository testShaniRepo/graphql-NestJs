import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Student {
    //for mongoId
    @ObjectIdColumn()
    _id:string

    @PrimaryColumn()
    id:string //self id

    @Column()
    firstName:string

    @Column()
    lastName:string

}