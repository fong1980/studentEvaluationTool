import {
  JsonController,
  Get
  //   Post,
  //   HttpCode,
  //   Body,
  //   Param
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
