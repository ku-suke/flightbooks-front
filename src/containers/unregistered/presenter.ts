import { IUnregisteredMuseum } from "@/entities/UnregisteredMuseum"
import UnregisteredMuseumRepository from "@/repositories/UnregisteredMuseumRepository"
import { timestampToFormattedDate } from "@/utils/translator";

export interface IPresenter {
  unregisteredMuseumRepository: UnregisteredMuseumRepository;
}

interface IDisplayMuseum {
  identifier: string;
  name: string;
  address: string;
  createdAt: string;
  source: string
}

export interface IPresenterState {
  museums: IDisplayMuseum[];
}

const formatMuseum = (museum: IUnregisteredMuseum): IDisplayMuseum => {
  const { identifier, name, address, createdAt, source } = museum;

  const formattedDate = timestampToFormattedDate(createdAt, "MM/DD HH:mm");

  return {
    identifier,
    name,
    address,
    createdAt: formattedDate,
    source: source
  };
};

export default ({ unregisteredMuseumRepository }: IPresenter): IPresenterState => {
  return {
    museums: unregisteredMuseumRepository.getMuseums().map(formatMuseum)
  };
};