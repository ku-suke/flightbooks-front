import { User } from "firebase";

export enum Types {
  SIGN_IN = "user/sign_in",
  SIGN_OUT = "user/sign_out"
}

export class SignIn implements FluxStandardAction {
  type = Types.SIGN_IN;
  constructor(public payload: User) {}
}

export class SignOut implements FluxStandardAction {
  type = Types.SIGN_OUT;
  payload = null;
}
