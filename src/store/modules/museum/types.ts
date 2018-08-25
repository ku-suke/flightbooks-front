import { IMuseum } from "@/entities/Museum";

export enum Types {
  STORE_ITEMS = "museum/store_items",
  RESET_ITEMS = "museum/reset_items",
  STORE_ITEM = "museum/store_item",
  RESET_ITEM = "museum/reset_item"
}

export class StoreItems implements FluxStandardAction {
  type = Types.STORE_ITEMS;
  constructor(public payload: IMuseum[]) {}
}

export class ResetItems implements FluxStandardAction {
  type = Types.RESET_ITEMS;
  payload = null;
}

export class StoreItem implements FluxStandardAction {
  type = Types.STORE_ITEM;
  constructor(public payload: IMuseum) {}
}

export class ResetItem implements FluxStandardAction {
  type = Types.RESET_ITEM;
  payload = null;
}
