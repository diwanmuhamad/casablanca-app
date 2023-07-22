const { validationResult } = require('express-validator')
const {
  sendErrorMsg
} = require('../commons/response')
import express from 'express';

const validate = (req: express.Request, res: express.Response, next: any) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors: any[] = []
  errors.array().map((err: any) => extractedErrors.push({ [err.path]: err.msg }))

  return sendErrorMsg(res, {msg: 'Bad Request', error: extractedErrors})
}

export {
  validate,
}