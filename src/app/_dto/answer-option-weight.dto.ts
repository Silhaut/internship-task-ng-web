import { AnswerOptionWithQuestionDto } from './answer-option.dto';
import { ProfessionDto } from './profession.dto';

export type AnswerOptionWeightDto = {
  id: string;
  answerOptionId: string;
  professionId: string;
  weight: number;
  createdAt: Date;
  updatedAt: Date;
}

export type AnswerOptionWeightWithAnswerOptionAndProfessionDto = {
  id: string;
  weight: number;
  answerOption: AnswerOptionWithQuestionDto;
  profession: ProfessionDto;
  createdAt: Date;
  updatedAt: Date;
}
