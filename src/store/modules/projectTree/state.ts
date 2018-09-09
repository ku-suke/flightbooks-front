import { IProjectTree } from "@/entities/ProjectTree";

export interface IProjectTreeState {
  data: IProjectTree | null
}

export const initialState = (): IProjectTreeState => ({
  data: null
});
