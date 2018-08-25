import { User } from "firebase";

export interface UserState {
  user: User | null;
  isAuthenticating: boolean
}

export const initialState = (): UserState => ({
  user: null,
  isAuthenticating: false
});
