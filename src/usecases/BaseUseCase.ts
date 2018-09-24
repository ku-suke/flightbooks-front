export default interface BaseUseCase {
  execute: (params?: any) => Promise<any>;
}
