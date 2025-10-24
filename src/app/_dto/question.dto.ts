import { AnswerOptionDto } from './answer-option.dto';

export type QuestionDto = {
  id: string;
  text: string;
  createdAt: Date
  updatedAt: Date
}

export type QuestionWithAnswersDto = {
  answerOptions: AnswerOptionDto[]
} & QuestionDto
