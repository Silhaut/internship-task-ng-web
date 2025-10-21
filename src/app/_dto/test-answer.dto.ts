import { TestWithUserDto } from './test.dto';
import { QuestionDto } from './question.dto';
import { AnswerOptionDto } from './answer-option.dto';

export type TestAnswerDto = {
  id: string;
  testId: string;
  questionId: string;
  answerId: string;
}

export type TestAnswerWithTestAndQuestionAndAnswerDto = {
  id: string;
  test: TestWithUserDto;
  question: QuestionDto;
  answer: AnswerOptionDto;
}

export type TestAnswerWithAnswerAndQuestionDto = {
  id: string;
  answer: AnswerOptionDto;
  question: QuestionDto;
}
