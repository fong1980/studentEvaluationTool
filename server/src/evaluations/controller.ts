import {
  JsonController,
  Get,
  Post,
  HttpCode,
  Body,
  Param,
  //Delete,
  NotFoundError
} from "routing-controllers";
import Evaluations from "./entity";
import Students from "../students/entity";
import Users from "../users/entity";
import Batchs from "../batchs/entity";

@JsonController()

//---get all evaluations
export default class EvaluationsController {
  @Get("/evaluations")
  async allEvaluations() {
    const evaluations = await Evaluations.find();
    return { evaluations };
  }
  //http get :4000/Evaluations

  //---post evaluations using studId + user Id
  @Post("/evaluation/:stuId/:userId")
  @HttpCode(201)
  async createEvaluation(
    @Body() evaluations: Evaluations,
    @Param("stuId") studId: number,
    @Param("userId") userId: number
  ) {
    const student = await Students.findOne(studId);
    const user = await Users.findOne(userId);

    if (!student) throw new NotFoundError("no student find");
    if (!user) throw new NotFoundError("no user find");

    const newEvaluation = await Evaluations.create({
      ...evaluations,
      student,
      user
    }).save();
    const student2 = await Students.findOne(studId);

    return student2;
  }
  // http post :4000/evaluation/1/1 remark=favorstudent color=green date="22-04-2019"
  // @Post("/evaluation/:stuId/:userId")

  //--get evaluation by batch
  @Get("/evaluationbatch/:id")
  async getEvaluationsByBatch(@Param("id") batchsId: number) {
    const batch = await Batchs.findOne(batchsId);
    if (!batch) throw new NotFoundError("no batch find");

    const student = batch.students;
    //evaluations verder uitfilteren in de frontend

    return student;
  }
  //http get :4000/evaluationbatch/2

  // //get evaluation by batch
  // @Get("/evaluationstud/:id")
  // async getEvaluationBystud(@Param("id") batchsId: number) {
  //   const student = await Students.findOne(batchsId);
  //   const evaluation = await Evaluations.find({ student });

  //   return evaluation;
  // }
}

// @Get("/evaluationbatch/:id")
// async getEvaluationsByBatch(@Param("id") batchsId: number) {
//   const batch = await Batchs.findOne(batchsId);
//   if (!batch) throw new NotFoundError("no batch find");
//   //const evaluation = await Evaluations.find({ student });
//   // const evaluation = await G.findOne(batchsId);

//   return batch.students;
