import { QueryParamsDto } from './query-params.dto';

export type AnswerOptionWeightQueryDto = {
  id: string;
  answerOptionId: string;
  professionId: string;
  weight: number;
} & QueryParamsDto
