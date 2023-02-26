import { Repository, SelectQueryBuilder } from 'typeorm';

export class PaginateBuilder<T> {
  repository: SelectQueryBuilder<T>;
  alias: string;

  public constructor(repo: Repository<T>, alias: string) {
    this.repository = repo.createQueryBuilder(alias);
    this.alias = alias;
  }

  andWhere(
    colum: string,
    value: string | number | Date,
    condition: boolean,
    operator: string,
  ) {
    if (condition) {
      const { query, queryStr } = buildQueryStr(
        this.alias,
        colum,
        value,
        operator,
      );
      this.repository.andWhere(queryStr, query);
    }
    return this;
  }
  orWhere(
    colum: string,
    value: string | number | Date,
    condition: boolean,
    operator: string,
  ) {
    if (condition) {
      const { query, queryStr } = buildQueryStr(
        this.alias,
        colum,
        value,
        operator,
      );
      this.repository.orWhere(queryStr, query);
    }
    return this;
  }

  getRepository() {
    return this.repository;
  }
}

export function buildQueryStr(
  alias: string,
  colum: string,
  value: string | number | Date,
  operator: string,
): { query: any; queryStr: string } {
  let queryStr = '';
  let query = null;
  switch (operator) {
    case Operator.LIKE_RIGHT:
      queryStr = `${alias}.${colum} ilike :like_right`;
      query = { like_right: `${value}%` };
      break;
    case Operator.MT:
      queryStr = `${alias}.${colum} > :mt`;
      query = { mt: value };
      break;
    case Operator.LTE:
      queryStr = `${alias}.${colum} <= :lte`;
      query = { lte: value };
      break;
    case Operator.LT:
      queryStr = `${alias}.${colum} < :lt`;
      query = { lt: value };
      break;
    default:
      break;
  }

  return { query, queryStr };
}

export enum Operator {
  EQ = 'eq',
  GT = 'gt',
  GTE = 'gte',
  IN = 'in',
  NULL = 'null',
  LT = 'lt',
  LTE = 'lte',
  BTW = 'btw',
  LIKE = 'like',
  LIKE_RIGHT = 'like_right',
  LIKE_LEFT = 'like_left',
  SW = 'sw',
  MT = 'mt',
}
