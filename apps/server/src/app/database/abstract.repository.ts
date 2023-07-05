import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument>{
    protected abstract readonly logger: Logger;

    constructor(protected readonly model: Model<TDocument>) { }

    async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
        const createdDocument = new this.model({
            ...document,
            _id: new Types.ObjectId()
        });

        return (await createdDocument.save()).toJSON() as unknown as TDocument;
    }

    async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        const document = await this.model.findOne(filterQuery, {}, { lean: true });

        if (!document) {
            this.logger.warn('Document not found with filterQuery', filterQuery);
            throw new NotFoundException('Document not found.');
        }

        return document;
    }

    async findOneAndUpdate(
        filterQuery: FilterQuery<TDocument>,
        update: UpdateQuery<TDocument>
    ) {
        const document = await this.model.findOneAndUpdate(filterQuery, update, {
            lean: true,
            new: true
        });

        if (!document) {
            this.logger.warn(`Document not found with filterQuery:`, filterQuery);
            throw new NotFoundException('Document not found.');
        }

        return document;
    }

    async find(
        filterQuery: FilterQuery<TDocument>,
        pageSize?: number,
        cursor?: string,
        sortField?: keyof TDocument,
        sortOrder: 'asc' | 'desc' = 'desc',
    ): Promise<TDocument[]> {
        if (!pageSize) {
            return this.model.find(filterQuery, {}, { lean: true });
        }

        let query = filterQuery;

        if (cursor && sortField) {
            query = {
                ...query,
                [sortField]: { $lt: cursor },
            };
        }

        const sortDirection: { [key: string]: 'asc' | 'desc'; } = sortField
            ? {
                [sortField]: sortOrder,
            }
            : {};

        return this.model
            .find(query, {}, { lean: true })
            .sort(sortDirection)
            .limit(pageSize);
    }

    async deleteMany(filterQuery: FilterQuery<TDocument>): Promise<void> {
        const result = await this.model.deleteMany(filterQuery);

        if (result.deletedCount === 0) {
            this.logger.warn('No documents found for deletion with filterQuery', filterQuery);
            // throw new NotFoundException('No documents found for deletion.');
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async aggregate(pipeline: any[]): Promise<any[]> {
        return this.model.aggregate(pipeline);
    }
}