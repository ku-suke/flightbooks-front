import { IProjectTree } from "@/entities/ProjectTree";

export enum Types {
  STORE_DATA = 'projectTree/store_data',
  RESET_DATA = 'projectTree/reset_data'
}

export class StoreData implements FluxStandardAction {
  type = Types.STORE_DATA
  constructor(public payload: IProjectTree) {}
}

export class ResetData implements FluxStandardAction {
  type = Types.RESET_DATA
  payload = null
}
