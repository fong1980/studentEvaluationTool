import {
  JsonController,
  Get
  // Post,
  // HttpCode,
  // Body,
  // Param
} from "routing-controllers";
import Evaluations from "./entity";

@JsonController()
export default class EvaluationsController {
  @Get("/evaluations")
  async allEvaluations() {
    const evaluations = await Evaluations.find();
    return { evaluations };
  }
  //http get :4000/Evaluations

  // @Post("/batch")
  // @HttpCode(201)
  // async newbatch(@Body() batch: Batch) {
  //   return batch.save();
  // }
  // // http post :4000/batch/ batchnr=10 startdate="22-04-2019" enddate="22-06-2019"

  // @Get("/batchs/:id")
  // async getBatchById(@Param("id") batchsId: number) {
  //   const batch = await Batch.findOne(batchsId);
  //   return { batch };
  // }
  // //http get :4000/batchs/2
}
