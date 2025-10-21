import { AnswerOptionDto } from './answer-option.dto';

export type QuestionWithAnswerOptionsDto = {
  id: string;
  text: string;
  createdAt: Date
  updatedAt: Date
  answerOptions: AnswerOptionDto[];
}
