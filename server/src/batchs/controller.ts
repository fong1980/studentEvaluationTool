import { JsonController, Get } from "routing-controllers";
import batch from "./entity";

@JsonController()
export default class batchsController {
  @Get("/batchs")
  async allBatchs() {
    const batchs = await batch.find();
    return { batchs };
  }
}

//http get :4000/batchs
//http put :4000/games/7 name=newname color=blue
// http put :4000/games/7 name=newname color=nocolor
// http put :4000/games/2 name=newname color=nocolor board='[[\'o\', 'o', 'o'],['o', 'o', 'o'],['o', '1', 'o']]'
//http put :4000/games/2 name=newname color=blue board='{['o', 'o', 'o'],['o', 'o', 'o'],['o', '1', 'o']}'
//[['o', 'o', 'o'],['o', 'o', 'o'],['o', '1', 'o']]

// http post :4000/games/2 name=newname color=nocolor board=
