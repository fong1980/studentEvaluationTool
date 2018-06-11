import {
  JsonController,
  Get,
  //   Post,
  //   HttpCode,
  //   Body,
  Param,
  Delete,
  NotFoundError
} from "routing-controllers";
import Students from "./entity";

@JsonController()
export default class batchsController {
  @Get("/students")
  async allStudent() {
    const students = await Students.find();
    return { students };
  }
  // //http get :4000/students

  //-----------post student
  //   @Post("/student")
  //   @HttpCode(201)
  //   async newStudent(@Body() student: Students) {
  //     return student.save();
  //   }
  // http post :4000/student/ first_name=anouk last_name=rees photo="thisIsaPic.nl" batch_id=2

  //   @Post("/games")
  //   @HttpCode(201)
  //   async createGame(@CurrentUser() user: User) {
  //     const entity = await Game.create().save();

  //     await Player.create({
  //       game: entity,
  //       user,
  //       symbol: "x"
  //     }).save();

  //     const game = await Game.findOne(entity.id);

  //     return game;
  //   }

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
