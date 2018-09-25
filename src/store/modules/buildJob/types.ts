import { IBuildJob } from '@/entities/BuildJob'

export enum Types {
  STORE_ITEMS = "buildJob/store_items",
  RESET_ITEMS = "buildJob/reset_items",
  STORE_ITEM = "buildJob/store_item",
  RESET_ITEM = "buildJob/reset_item"
}

export class StoreItems implements FluxStandardAction {
  type = Types.STORE_ITEMS;
  constructor(public payload: IBuildJob[]) {}
}

export class ResetItems implements FluxStandardAction {
  type = Types.RESET_ITEMS;
  payload = null;
}

export class StoreItem implements FluxStandardAction {
  type = Types.STORE_ITEM;
  constructor(public payload: IBuildJob) {}
}

export class ResetItem implements FluxStandardAction {
  type = Types.RESET_ITEM;
  payload = null;
}
