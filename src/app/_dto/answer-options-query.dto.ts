import { QueryParamsDto } from './query-params.dto';

export type AnswerOptionsQueryDto = {
  id?: string;
  questionId?: string;
  text?: string;
  createdAt?: string;
} & QueryParamsDto
