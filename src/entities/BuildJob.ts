import firebase from "firebase";
import uuid from "uuid/v4";

export enum JobStatus {
  JOB_CREATED = "job created",
  JOB_ERROR = "job error"
}

export interface IBuildJob {
  identifier: string;
  bookId: string;
  key?: string;
  owner: string;
  status: JobStatus;
}

export const buildJobEntityFactory = ({
  bookId,
  owner
}: {
  bookId: string;
  owner: string;
}) => {
  return new BuildJobEntity({
    identifier: uuid(),
    bookId,
    owner,
    status: JobStatus.JOB_CREATED
  });
};

export default class BuildJobEntity {
  private _props: IBuildJob;

  constructor(params: IBuildJob) {
    this._props = {
      ...params
    };
  }

  get props(): IBuildJob {
    return this._props;
  }
}
