import { RecordModel } from './../models/record-model';

export interface ISingleRecordResult {
  status?: number;
  msg?: string;
  data?: RecordModel;
}

