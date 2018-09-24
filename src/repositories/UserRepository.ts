import { User } from "firebase";
import store from "@/store";

export default class UserRepository {
  constructor() {}

  getCurrentUser(): User | null {
    return store.state.user.user;
  }

  isAuthenticating(): boolean {
    return store.state.user.isAuthenticating;
  }
}
