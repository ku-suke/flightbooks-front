declare interface UseCase {
  execute: (params?: any) => Promise<any>;
}
