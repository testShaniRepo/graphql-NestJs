import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import {v4 as uuid} from 'uuid'
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>
    ){}

    async getLesson(id: string): Promise<Lesson>{
        return this.lessonRepository.findOne({id}) // get object with the id form mongo
    }

    async getLessons(): Promise<Lesson[]>{
        return this.lessonRepository.find() // return all the objects
    }

    // async createLesson(name, startDate, endDate): Promise<Lesson>{
    //     const lesson = this.lessonRepository.create({
    //         id: uuid(),
    //         name,
    //         startDate,
    //         endDate
    //     })

    //     return this.lessonRepository.save(lesson) //save the object in the mongo db
        
    // }

    // with Dto / graphql type
    async createLesson({name, startDate ,endDate, students}: CreateLessonInput): Promise<Lesson>{
        const lesson = this.lessonRepository.create({
            id: uuid(),
            name,
            startDate,
            endDate,
            students
        })

        return this.lessonRepository.save(lesson) //save the object in the mongo db
        
    }

    async assignStudentsToLesson(lessonId: string, studentIds: string[]): Promise<Lesson>{
        const lesson = await this.lessonRepository.findOne({id: lessonId})
        lesson.students = [...lesson.students, ...studentIds]
        return this.lessonRepository.save(lesson) 
    }
}
