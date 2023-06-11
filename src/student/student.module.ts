import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { StudentResolver } from './student.resolver';

@Module({
  imports:[
    TypeOrmModule.forFeature([Student])
  ],
  providers: [StudentResolver,StudentService],
  exports: [StudentService]//allow to use the student servcie form othe modules , can be injectable in other modules 
})
export class StudentModule {}
