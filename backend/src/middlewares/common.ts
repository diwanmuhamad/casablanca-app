import {
  sendErrorMsg
} from '../commons/response'
import {
  verifyToken, decodeToken
} from '../commons/jwt'
import {
  User
} from '../../models/user-model'

async function validateToken(req: any, res: any, next: any) {
  const bearerHeader = req.headers['authorization']

  if (typeof bearerHeader === 'undefined') {
    console.log('userValidator:undefined bearer')
    return sendErrorMsg(res, { msg: "Unauthorized", error: 'Unauthorized' }, {errorCode: 401});
  }

  const token = bearerHeader.split(" ")[1]
  try {
    let decodedToken: any = null
    if (req?.decodeOnly) {
      decodedToken = await decodeToken(token)
    } else {
      decodedToken = await verifyToken(token)
    }
    if (!decodedToken) {
      console.log('userValidator:decodedToken error')
      return sendErrorMsg(res, { msg: "Unauthorized", error: 'Unauthorized' }, {errorCode: 401});
    }

    const user: any = await User.findOne({ where: { id: decodedToken?.payload?.userId } });

    if (user === null) {
      return sendErrorMsg(res, { msg: "Unauthorized", error: 'Unauthorized' }, {errorCode: 401});
    }
    
    const result = {
      id: user?.id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email
    }
    req.user = result
    return next()
  } catch (e) {
    console.log(e, ' userValidator:error')
    return sendErrorMsg(res, { msg: "Unauthorized", error: 'Unauthorized' }, {errorCode: 401});
  }
}

const userValidator = async (req: any, res: any, next: any) => {
  return await validateToken(req, res, next);
}

export {
  userValidator
}