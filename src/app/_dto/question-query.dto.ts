import { QueryParamsDto } from './query-params.dto';

export type QuestionQueryDto = {
  id?: string;
  text?: string;
  createdAt?: string;
} & QueryParamsDto
