import { injectable } from "inversify";
import { FindManyOptions, FindConditions, DeleteResult } from "typeorm";
import { DatabaseService } from "../../services/DatabaseService";

@injectable()
export abstract class AbstractRepository<T> {

    constructor(protected readonly databaseService: DatabaseService, private readonly repositoryEntity: new () => T) { }

    private getRepository() {
        return this.databaseService.getRepository(this.repositoryEntity)
    }

    protected get = async (whereClause: FindManyOptions<T> = {}): Promise<T[]> => {
        return (await this.getRepository()).find(whereClause)
    }

    protected create = async (data: T): Promise<boolean> => {
        try {
            const repository = await this.getRepository();
            const result = !!await repository.save(repository.create(data))
            return result
        } catch (error) {
            console.log(error)
        }
    }

    protected update = async (data: T): Promise<boolean> => {
        return await this.create(data)
    }

    protected delete = async (a: new () => T, whereCondition: FindConditions<T>): Promise<DeleteResult> => {
        const repository = await this.getRepository()
        return await repository.delete(whereCondition)
    }
}
