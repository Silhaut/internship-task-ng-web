import { QueryParamsDto } from './query-params.dto';

export type TestAnswerQueryDto = {
  id: string;
  testId: string;
  questionId: string;
  answerId: string;
} & QueryParamsDto
