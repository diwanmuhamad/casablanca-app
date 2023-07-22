import {
  body
} from 'express-validator'

const signupValidationRules = () => {
  return [
    body('firstName').isString(),
    body('lastName').isString(),
    body('email').isEmail(),
    body('password').isString(),
  ]
}

const signinValidationRules = () => {
  return [
    body('email').isEmail(),
    body('password').isString(),
  ]
}

export {
  signupValidationRules,
  signinValidationRules
}