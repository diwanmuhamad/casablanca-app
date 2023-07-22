import {
  User
} from '../../../models/user-model'
import {
  sendSuccessMsg,
  sendErrorMsg
} from '../../commons/response'
import {
  tokenSigning
} from '../../commons/jwt'
import { coreService } from '../../services';

async function generateNewToken(user: any) {
  const jwtPayload = {
    id: user?.id,
    email: user?.email,
  };
  const token = await tokenSigning(jwtPayload);
  const returnedData = {
    token: token,
  };

  return returnedData;
}

const signIn = async (req: any, res: any) => {
  const reqBody = JSON.parse(JSON.stringify(req.body));
  const user: any = await User.findOne({ where: { email: reqBody?.email } });
  if (user === null) {
    return sendErrorMsg(res, {
      msg: "sign in not successfully",
      error: "invalid data",
    });
  }

  const decPass = coreService.decryptData(user?.password)
  if (decPass !== reqBody?.password) {
    return sendErrorMsg(res, {
      msg: "sign in not successfully",
      error: "invalid data",
    });
  }

  // jwt sign
  try {
    const returnedData = await generateNewToken(user);

    return sendSuccessMsg(res, {
      msg: "sign in successfully",
      data: returnedData,
    });
  } catch (e) {
    console.log(e, " jwt:error");
    return sendErrorMsg(res, {
      msg: "sign in not successfully",
      error: "something wrong",
    });
  }
};

const signUp = async (req: any, res: any) => {
  const reqBody = JSON.parse(JSON.stringify(req.body));
  const user = await User.findOne({ where: { email: reqBody?.email } });
  if (user !== null) {
    return sendErrorMsg(res, {
      msg: "sign up not successfully",
      error: "user already exist!",
    });
  }

  const encPass = coreService.encryptData(reqBody?.password);
  try {
    await User.create({
      firstName: reqBody?.firstName,
      lastName: reqBody?.lastName,
      email: reqBody?.email,
      password: encPass
    });
    const {password, ...result} = reqBody
    return sendSuccessMsg(res, { msg: "sign up successfully", data: result });
  } catch (e) {
    console.log(e, " signup:error");
    return sendErrorMsg(res, {
      msg: "sign up not successfully",
      error: "something wrong",
    });
  }
};

export { signIn, signUp };
