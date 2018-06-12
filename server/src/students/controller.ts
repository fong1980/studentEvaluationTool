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
export default class batchsController {
  @Get("/students")
  async allStudent() {
    const students = await Students.find();
    return { students };
  }
  // //http get :4000/students

  //-----------post student

  @Post("/batch/:id/student") //@Post("/student") //
  @HttpCode(201)
  async createStudent(@Body() student: Students, @Param("id") batchId: number) {
    const batch = await Batch.findOne(batchId);
    if (batch) student.batch = batch;

    return student.save();
  }
  //http post :4000/batch/2/student firstName=anouk lastName=rees photo="thisIsaPic.nl" batch_id=2
  //http post :4000/student firstName=anouk lastName=rees photo="thisIsaPic.nl" batch_id=2

  //-----------post student------------

  @Get("/students/:id")
  async getStudentById(@Param("id") stuentId: number) {
    const student = await Students.findOne(stuentId);
    return { student };
  }
  //http get :4000/students/2

  @Delete("/student/:id")
  async deleteQuiz(@Param("id") id: number) {
    const student = await Students.findOne(id);

    if (!student) throw new NotFoundError("Nothing to Delete here!");

    if (student) student.remove();
    return "student Deleted.";
  }
  //http delete :4000/student/2
}
