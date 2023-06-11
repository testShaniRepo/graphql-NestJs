import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import {v4 as uuid} from 'uuid'

@Injectable()
export class StudentService {
    constructor(@InjectRepository(Student) private studentRepository:Repository<Student>){} // inject instance of the Student

    
    async createStudent({firstName, lastName}: CreateStudentInput): Promise<Student>{
        const student = this.studentRepository.create({id:uuid(),firstName,lastName})
        return this.studentRepository.save(student)
    }

    async getStudents(): Promise<Student[]>{
        return this.studentRepository.find()
    }

    async getStudent(id:string): Promise<Student>{
        return this.studentRepository.findOne({id})
    }

    async getManyStudents(studentIds: string[]): Promise<Student[]> {
        return this.studentRepository.find({ // mongo query to find all the students with the ids
            where: {
                id:{
                    $in:studentIds
                }
            }
        })
    }
}
