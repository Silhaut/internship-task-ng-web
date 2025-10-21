import { QuestionDto } from './question.dto';

export type AnswerOptionDto = {
  id: string
  questionId: string
  text: string
  createdAt: Date
  updatedAt: Date
}

export type AnswerOptionWithQuestionDto = {
  id: string
  question: QuestionDto
  text: string
  createdAt: Date
  updatedAt: Date
}
