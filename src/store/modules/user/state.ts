import { User } from "firebase";

export interface UserState {
  user: User | null;
}

export const initialState = (): UserState => ({
  user: null
});
