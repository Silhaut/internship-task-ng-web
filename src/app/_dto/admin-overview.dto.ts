type SimpleUserDto = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
}

type TopProfessionDto = {
  profession: string;
  count: number;
}

type UserStatsDto = {
  total: number;
  byRole: Record<string, number>;
  latest: SimpleUserDto[];
}

type SimpleTestDto = {
  id: string;
  user: SimpleUserDto;
  profession: string;
  createdAt: Date;
}

type TestStatsDto = {
  total: number;
  completed: number;
  inProgress: number;
  topProfessions: TopProfessionDto[];
  latest: SimpleTestDto[];
}

type QuestionStatsDto = {
  total: number;
  totalAnswers: number;
  avgAnswersPerQuestion: number;
}

type ProfessionStatsDto = {
  total: number;
  mostCommon: string;
}

export type AdminOverviewDto = {
  users: UserStatsDto;
  tests: TestStatsDto;
  questions: QuestionStatsDto;
  professions: ProfessionStatsDto;
}
