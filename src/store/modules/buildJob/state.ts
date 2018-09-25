import { IBuildJob } from '@/entities/BuildJob'

export interface IBuildJobState {
  items: IBuildJob[]
  item: IBuildJob | null
}

export const initialState = (): IBuildJobState => ({
  items: [],
  item: null
});
