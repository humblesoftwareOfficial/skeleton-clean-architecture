import { ClientSession, Model, Types } from 'mongoose';
import { IGenericRepository } from '../generics';

export class MongoGenericRepository<T> implements IGenericRepository<T> {
  public readonly _repository: Model<T>;
  public readonly _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  findAll(filterAttributes: string): Promise<T[]> {
    return this._repository
      .find({}, filterAttributes)
      .populate(this._populateOnFind)
      .exec();
  }

  findOne(code: string, filterAttributes: string): Promise<T> {
    return this._repository
      .findOne({ code }, filterAttributes)
      .exec() as unknown as Promise<T>;
  }

  findById(_id: Types.ObjectId, filterAttributes: string): Promise<T> {
    return this._repository
      .findById(_id, filterAttributes)
      .exec() as unknown as Promise<T>;
  }

  create(item: T): Promise<T> {
    return this._repository.create(item);
  }

  createInTransaction(item: T[], session: ClientSession): Promise<any> {
    return this._repository.create(item, {
      session,
    });
  }

  update(code: string, update: any): Promise<T> {
    return this._repository
      .findOneAndUpdate({ code }, update, { new: true })
      .exec() as unknown as Promise<T>;
  }

  updateInTransaction(
    code: string,
    update: any,
    session: ClientSession,
  ): Promise<T> {
    return this._repository
      .findOneAndUpdate({ code }, update, { new: true, session })
      .exec() as unknown as Promise<T>;
  }

  updateWithFilterObject(filter: any, update: any): Promise<T> {
    return this._repository
      .findOneAndUpdate({ ...filter }, update, { new: true })
      .exec() as unknown as Promise<T>;
  }

  updateWithFilterObjectInTransaction(
    filter: any,
    update: any,
    session: ClientSession,
  ): Promise<T> {
    return this._repository
      .findOneAndUpdate({ ...filter }, update, { new: true, session })
      .exec() as unknown as Promise<T>;
  }

  findAllByCodes(codes: string[], filterAttributes: string): Promise<T[]> {
    return this._repository
      .find({ code: { $in: codes } }, filterAttributes)
      .exec();
  }

  async findManyByPoles(
    poleIds: string[],
    filterAttributes: string,
  ): Promise<T[]> {
    return this._repository
      .find({ 'pole.entity': { $in: poleIds } }, filterAttributes)
      .exec();
  }

  bulkWrite(operations: any[]): Promise<any> {
    return this._repository.bulkWrite(operations);
  }

  bulkWriteInTransaction(
    operations: any[],
    session: ClientSession,
  ): Promise<any> {
    return this._repository.bulkWrite(operations, { session });
  }

  count(filter: any): Promise<number> {
    return this._repository.countDocuments({ ...filter }).exec();
  }

  updateManyInTransaction(
    filter: any,
    update: any,
    session: ClientSession,
  ): Promise<any> {
    return this._repository
      .updateMany({ ...filter }, update, { session })
      .exec();
  }

  populateEntities(value: any, populateOptions: any[]): Promise<any> {
    return this._repository.populate(value, populateOptions);
  }

  getLastInsertedDocument(): Promise<T[]> {
    return this._repository.find({}).sort({ _id: -1 }).limit(1).exec();
  }

  findAllByIds(ids: Types.ObjectId[], filterAttributes: string): Promise<T[]> {
    return this._repository
      .find({ _id: { $in: ids } }, filterAttributes)
      .exec();
  }
}
