import { Field, ID, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class AssignStudentsToLesson {
    @IsUUID()
    @Field(type => ID)
    lessonId:string

    @IsUUID("4", {each:true})//validate all the array items uuids
    @Field(type => [ID])
    studentIds:string[]

}