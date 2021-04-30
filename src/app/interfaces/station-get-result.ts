import {Station} from './station';

export interface StationGetResult {
  nhits: number;
  parameters: {
    dataset: string,
  };
  records: Station[];
}
