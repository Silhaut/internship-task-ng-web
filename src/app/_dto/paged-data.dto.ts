export type PagedDataDto<T> = {
  data: T[]
  totalSize: number
  page: number
  size: number
  totalPage: number
}
