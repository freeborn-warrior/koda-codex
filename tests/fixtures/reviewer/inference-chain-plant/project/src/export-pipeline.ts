import type { Dataset } from "./dataset.ts";
import { type Envelope, wrap } from "./envelope.ts";

function collectPayload(dataset: Dataset): Dataset["rows"] {
  return dataset.rows;
}

export function packageDataset(dataset: Dataset): Envelope<Dataset["rows"]> {
  return wrap(collectPayload(dataset));
}
