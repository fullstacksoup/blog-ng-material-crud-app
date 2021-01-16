export interface ResponseModel {
  status?: number;
  msg?: string;
  data?: any;
}

export interface DataResultModel {
  status?: number;
  msg?: string;
  data?: RecordModel[];
}

interface RecordModel {
  Text?: string;
  Number?: number;
  Boolean?: boolean;
  JSDate?: Date;
  JSDateTime?: Date;
}
