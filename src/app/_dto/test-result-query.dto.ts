import { QueryParamsDto } from './query-params.dto';

export type TestResultQueryDto = {
  id: string;
  testId: string;
  professionId: string;
  createdAt: string;
} & QueryParamsDto
