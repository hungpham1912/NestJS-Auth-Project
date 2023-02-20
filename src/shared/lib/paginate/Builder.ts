import { User } from 'src/module/core/users/entities/user.entity';
import { DataSource, LoadEvent, Repository, SelectQueryBuilder } from 'typeorm';

export class PaginateBuilder<T> {
  public repository: any;

  setRepository(entities) {
    const myDataSource = new DataSource({ type: 'postgres' });
    this.repository = myDataSource.getRepository(entities);
    return this;
  }
  async find() {
    return await this.repository.find();
  }
}
