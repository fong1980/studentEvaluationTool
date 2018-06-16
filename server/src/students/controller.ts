import {
  JsonController,
  Get,
  Post,
  HttpCode,
  Body,
  Param,
  Delete,
  NotFoundError,
  Put
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
    if (!student) throw new NotFoundError("Sorry Student doesn't exist");
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
    const batch2 = await Batch.findOne(batchId);
    if (!batch2) throw new NotFoundError("no batch find");
    return batch2.students;
  }
  //http post :4000/addStudent/2 firstName=henk lastName=nietsnuts photo="thisIsaPic.nl" 2=batchid

  //-----------delete student by id ------------
  @Delete("/student/:id")
  async deleteQuiz(@Param("id") id: number) {
    const student = await Students.findOne(id);

    if (!student) throw new NotFoundError("Nothing to Delete here!");

    if (student) student.remove();
    return "student Deleted with" + id;
  }
  //http delete :4000/student/2

  @Put("/students/:id")
  // @HttpCode(200)
  async editStudent(
    @Param("id") id: number,
    @Body() update: Partial<Students>
  ) {
    const student = await Students.findOne(id);
    if (!student) throw new NotFoundError("put Student doesn't exist");

    return Students.merge(student, update).save();
  }

  //http put :4000/students/2 firstName=henk lastName=nietsnuts photo="thisIsaPic.nl"
}
