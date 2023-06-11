import { Resolver, Query, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { LessonType } from "./lesson.type";
import { LessonService } from "./lesson.service";
import { CreateLessonInput } from "./lesson.input";
import { AssignStudentsToLesson } from "./assign-students-to-lesson.input.";
import { Lesson } from "./lesson.entity";
import { StudentService } from "../student/student.service"; // when import from other place change src/ to ../

@Resolver(of => LessonType)
export class LessonResolver {
    constructor(
        private lessonService: LessonService,
        private studentService: StudentService
    ){}
    @Query(returns => LessonType)
        lesson(
        @Args('id') id:string,
    ){
        return this.lessonService.getLesson(id)
 }

 @Query(returns => [LessonType])
 lessons(){
    return this.lessonService.getLessons()
 }

//     lesson(
//     ){
//         return {
//             id:'asdfdsf',
//             name:'heeloo',
//             startDate:(new Date()).toISOString(),
//             endDate:(new Date()).toISOString(),
//         }
//  }


 @Mutation(returns => LessonType)
 createLesson(@Args('createLessonInput') createLessonInput: CreateLessonInput,
){
    return this.lessonService.createLesson(createLessonInput)

 }

 @Mutation(returns => LessonType)
 assignStudentsToLesson(
    @Args('assignStudentsToLessonInput') {lessonId, studentIds }:AssignStudentsToLesson
 ){
    return this.lessonService.assignStudentsToLesson(lessonId, studentIds)
 }

 @ResolveField() // from a lesson when we ask for is students
 async students(@Parent() lesson:Lesson){ // when we try to resolve students filed show the students
    return this.studentService.getManyStudents(lesson.students)//pass the studs array
 }

}
