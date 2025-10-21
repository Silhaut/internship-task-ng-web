import { UserDto } from './user.dto';
import { TestResultWithProfessionDto } from './test-result.dto';
import { TestAnswerWithAnswerAndQuestionDto } from './test-answer.dto';

export type TestDto = {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TestWithUserDto = {
  id: string;
  user: UserDto;
  createdAt: Date;
  updatedAt: Date;
}

export type TestWithUserAndAnswerAndResultDto = {
  id: string;
  user: UserDto;
  answers: TestAnswerWithAnswerAndQuestionDto[];
  result: TestResultWithProfessionDto;
  createdAt: Date;
  updatedAt: Date;
}
