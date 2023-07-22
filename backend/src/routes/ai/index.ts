import {
    Router
  } from 'express'
  import {
    questionAnswer
  } from '../../controllers/ai'
import {
  userValidator
} from '../../middlewares/common'
  
  const aiRouter = Router();
  
  aiRouter.post("/quest-ans", userValidator, questionAnswer);
  
  export { aiRouter };