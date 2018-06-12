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
import Evaluations from "./entity";
import Students from "../students/entity";
import Users from "../users/entity";

@JsonController()
export default class EvaluationsController {
  @Get("/evaluations")
  async allEvaluations() {
    const evaluations = await Evaluations.find();
    return { evaluations };
  }
  //http get :4000/Evaluations

  @Post("/evaluation/:stuId/:userId")
  @HttpCode(201)
  async createEvaluation(
    @Body() evaluations: Evaluations,
    @Param("stuId") studId: number,
    @Param("userId") userId: number
  ) {
    const student = await Students.findOne(studId);
    const user = await Users.findOne(userId);

    if (!student) throw new NotFoundError("no batch find");
    if (!user) throw new NotFoundError("no batch find");

    const newEvaluation = await Evaluations.create({
      ...evaluations,
      student,
      user
    }).save();
    return newEvaluation;
  }

  // http post :4000/evaluation/1/1 color=green date="22-04-2019"

  // @Get("/batchs/:id")
  // async getBatchById(@Param("id") batchsId: number) {
  //   const batch = await Batch.findOne(batchsId);
  //   return { batch };
  // }
  // //http get :4000/batchs/2
}
