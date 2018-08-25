declare interface Service {
  handle: (param?: any) => Promise<any>;
}
