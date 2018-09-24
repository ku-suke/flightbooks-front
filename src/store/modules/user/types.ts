import { User } from "firebase";

export enum Types {
  SIGN_IN = "user/sign_in",
  SIGN_OUT = "user/sign_out",
  START_AUTHENTICATION = "user/start_authentication",
  FINISH_AUTHENTICATION = "user/finish_authentication"
}

export class SignIn implements FluxStandardAction {
  type = Types.SIGN_IN;
  constructor(public payload: User) {}
}

export class SignOut implements FluxStandardAction {
  type = Types.SIGN_OUT;
  payload = null;
}

export class StartAuthentication implements FluxStandardAction {
  type = Types.START_AUTHENTICATION;
}

export class FinishAuthentication implements FluxStandardAction {
  type = Types.FINISH_AUTHENTICATION;
}
