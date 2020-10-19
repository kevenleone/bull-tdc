import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm';

enum Status {
  CREATED,
  WAITING_WINDOW,
  DISCARDED,
  IN_EXECUTION,
  COMPLETE,
}

registerEnumType(Status, {
  name: 'Status',
  description: 'Status used on Service',
});

@Entity()
@ObjectType()
export default class Service extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @Field()
  @Column()
  orderId: string;

  @Field()
  @Column()
  name: string;

  @Field({ defaultValue: new Date() })
  @Column()
  createdAt: Date;

  @Field()
  @Column()
  serviceType: string;

  @Field(() => Status)
  @Column()
  status: Status;
}
