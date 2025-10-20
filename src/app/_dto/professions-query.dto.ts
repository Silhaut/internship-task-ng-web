import { QueryParamsDto } from './query-params.dto';

export type ProfessionsQueryDto = {
  id?: string;
  name?: string;
  description?: string;
  createdAt?: string;
} & QueryParamsDto
