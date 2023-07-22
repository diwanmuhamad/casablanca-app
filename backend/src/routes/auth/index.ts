import {
  Router
} from 'express'
import {
  validate
} from '../../validations/common'
import {
  signinValidationRules,
  signupValidationRules
} from '../../validations/sign'
import {
  signIn,
  signUp,
} from '../../controllers/auth'

const authRouter = Router();

authRouter.post("/login", signinValidationRules(), validate, signIn);
authRouter.post("/signup", signupValidationRules(), validate, signUp);

export { authRouter };