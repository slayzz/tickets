export interface IPayload<T> {
  error: Error | null,
  payload: T | null;
}
