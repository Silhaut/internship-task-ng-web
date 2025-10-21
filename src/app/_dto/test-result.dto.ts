import { TestWithUserDto } from './test.dto';
import { ProfessionDto } from './profession.dto';

export type TestResultDto = {
  id: string;
  testId: string;
  professionId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TestResultWithTestAndProfessionDto = {
  id: string;
  test: TestWithUserDto
  profession: ProfessionDto;
  createdAt: Date;
  updatedAt: Date;
}

export type TestResultWithProfessionDto = {
  id: string;
  testId: string;
  profession: ProfessionDto;
  createdAt: Date;
  updatedAt: Date;
}
