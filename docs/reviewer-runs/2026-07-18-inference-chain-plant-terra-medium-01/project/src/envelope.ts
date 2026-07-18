export type Envelope<T> = {
  payload: T;
};

export function wrap<T>(payload: T): Envelope<T> {
  return { payload };
}
