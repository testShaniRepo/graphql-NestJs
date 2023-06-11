import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType('Student')//change the name of the type to the string
export class StudentType {
    @Field()
    id:string

    @Field()
    firstName:string

    @Field()
    lastName:string

}