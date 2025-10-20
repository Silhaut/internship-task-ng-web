import { QueryParamsDto } from './query-params.dto';

export type UsersQueryDto = {
  id?: string;
  telegramId?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role?: string;
  createdAt?: string;
} & QueryParamsDto
