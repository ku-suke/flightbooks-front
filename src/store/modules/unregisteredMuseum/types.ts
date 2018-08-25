import { IUnregisteredMuseum } from "@/entities/UnregisteredMuseum"

export enum Types {
  STORE_MUSEUMS = "unregistered/store_museums",
  RESET_MUSEUMS = "unregistered/reset_museums",
}

export class StoreMuseums implements FluxStandardAction {
  type = Types.STORE_MUSEUMS
  constructor(public payload: IUnregisteredMuseum[]){}
}

export class ResetMuseums implements FluxStandardAction {
  type = Types.RESET_MUSEUMS
  payload = null
}
