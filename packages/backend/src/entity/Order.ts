import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

import Service from './Service';

export enum Status {
  NOT_PROCESSED = 'NOT_PROCESSED',
  IN_PROCESS = 'IN_PROCESS',
  PROCESSED = 'PROCESSED',
}

@Entity()
@ObjectType()
export class Order extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  createdBy: string;

  @Field({ defaultValue: new Date() })
  @Column({ default: new Date() })
  createdAt: Date;

  @Field({ defaultValue: new Date() })
  @Column({ default: new Date() })
  modifiedAt: Date;

  @Field({ defaultValue: Status.NOT_PROCESSED })
  @Column({ default: Status.NOT_PROCESSED })
  status: Status;

  @Field(() => [Service])
  async services(): Promise<Service[]> {
    return Service.find({ where: { orderId: this.id.toString() } });
  }
}
