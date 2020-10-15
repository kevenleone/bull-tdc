import { ObjectType, ID, Field } from 'type-graphql';

import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';
import Service from './Service';

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

  @Field(() => [Service])
  async services(): Promise<Service[]> {
    const services = await Service.find({ where: { orderId: this.id.toString() } });
    return services;
  }
}
