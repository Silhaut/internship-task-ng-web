import { QueryParamsDto } from './query-params.dto';

export type TestQueryDto = {
  id?: string;
  userId?: string;
  createdAt?: string;
} & QueryParamsDto
