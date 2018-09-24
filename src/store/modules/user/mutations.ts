import { MutationTree } from "vuex";
import { UserState, initialState } from "@/store/modules/user/state";
import { Types, SignIn } from "@/store/modules/user/types";

export const mutations: MutationTree<UserState> = {
  [Types.SIGN_IN]: (state, action: SignIn) => {
    const user = action.payload;
    state.user = user;
  },
  [Types.SIGN_OUT]: state => {
    const { user } = initialState();
    state.user = user;
  },
  [Types.START_AUTHENTICATION]: state => {
    state.isAuthenticating = true;
  },
  [Types.FINISH_AUTHENTICATION]: state => {
    state.isAuthenticating = false;
  }
};
