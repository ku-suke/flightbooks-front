import { IUnregisteredMuseum } from '@/entities/UnregisteredMuseum'

export interface UnregisteredMuseumState {
  items: IUnregisteredMuseum[]
}

export const initialState = (): UnregisteredMuseumState => ({
  items: []
});
