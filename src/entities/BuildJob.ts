export enum JobStatus {
  JOB_CREATED = "job created",
  JOB_ERROR = "job error"
}

export interface IBuildJob {
  bookId: string;
  key: string;
  owner: string;
  status: JobStatus;
}

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
