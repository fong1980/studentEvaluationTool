import { JsonController, Get, Post, HttpCode, Body } from "routing-controllers";
import Batch from "./entity";

@JsonController()
export default class batchsController {
  @Get("/batchs")
  async allBatchs() {
    const batchs = await Batch.find();
    return { batchs };
  }

  //http get :4000/batchs

  //   @Post("/batch")
  //   @HttpCode(201)
  //   createbatch(@Body() batch: Batch) {
  //     return batch.save();
  //   }

  @Post("/batch")
  @HttpCode(201)
  async newQuestion(@Body() batch: Batch) {
    return batch.save();
  }

  // http post :4000/batch/ batchnr=10 startdate="22-04-2019" enddate="22-06-2019"
}

// @Post("/questions")
// @HttpCode(201)
// async newQuestion(@Body() questions: Questions) {
//   return questions.save();
// }

// @Post('/games')
// @HttpCode(201)
// creategame(
// @Body() game: Game
// ) {
//     game.color=colors[Math.floor(Math.random()*colors.length)];
//     game.board=defaultBoard
// return game.save()
// }
