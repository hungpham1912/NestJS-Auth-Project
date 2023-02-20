import { User } from 'src/module/core/users/entities/user.entity';
import {
  DataSource,
  getConnection,
  LoadEvent,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

// const Entity;

// export class PaginateCondition<T> {
//   public repository: Se;
//   public constructor(entity: User) {
//     const myDataSource = DataSource();
//     this.repository = myDataSource.getRepository(entity);
//   }
// }
