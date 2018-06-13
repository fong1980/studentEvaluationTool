import {
  JsonController,
  Get,
  Post,
  HttpCode,
  Body,
  Param,
  Delete,
  NotFoundError
} from "routing-controllers";
import Students from "./entity";
import Batch from "../batchs/entity";

@JsonController()
//--------get all student---
export default class batchsController {
  @Get("/students")
  async allStudent() {
    const students = await Students.find();
    return { students };
  }
  // //http get :4000/students

  //--------get students by batchnr
  @Get("/studentBatch/:id")
  async getStudentByBatch(@Param("id") batchId: number) {
    const batch = await Batch.findOne(batchId);

    if (!batch) throw new NotFoundError("Batch not found!");
    return batch.students;
  }
  //http get :4000/studentBatch/2

  //get student by id
  @Get("/students/:id")
  async getStudentById(@Param("id") stuentId: number) {
    const student = await Students.findOne(stuentId);
    return student;
  }
  //http get :4000/students/2

  //-----------post student by batchnr
  @Post("/addStudent/:id") //@Post("/student") //
  @HttpCode(201)
  async createStudent(@Body() student: Students, @Param("id") batchId: number) {
    const batch = await Batch.findOne(batchId);
    if (!batch) throw new NotFoundError("no batch find");

    const newStudent = await Students.create({ ...student, batch }).save(); //zie tic tak game.
    return newStudent;
  }
  //http post :4000/addStudent/2 firstName=henk lastName=nietsnuts photo="thisIsaPic.nl"

  //-----------delete student by id ------------
  @Delete("/student/:id")
  async deleteQuiz(@Param("id") id: number) {
    const student = await Students.findOne(id);

    if (!student) throw new NotFoundError("Nothing to Delete here!");

    if (student) student.remove();
    return "student Deleted with" + id;
  }
  //http delete :4000/student/2
}
