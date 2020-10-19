import { ObjectType, ID, Field } from 'type-graphql';

import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';
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
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @Field()
  @Column()
  createdBy: string;

  @Field({ defaultValue: new Date().toISOString() })
  @Column({ default: new Date().toISOString() })
  createdAt: string;

  @Field({ defaultValue: new Date().toISOString() })
  @Column({ default: new Date().toISOString() })
  modifiedAt: string;

  @Field({ defaultValue: Status.NOT_PROCESSED })
  @Column({ default: Status.NOT_PROCESSED })
  status: Status;

  @Field(() => [Service])
  async services(): Promise<Service[]> {
    const services = await Service.find({ where: { orderId: this.id.toString() } });
    return services;
  }
}
