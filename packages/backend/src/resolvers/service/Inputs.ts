import { Field, InputType } from 'type-graphql';

import { Status } from '~/entity/Service';

@InputType()
class ServiceBaseInput {
  @Field()
  createdBy: string;

  @Field()
  name: string;

  @Field()
  type: string;

  @Field()
  assinedTo: string;

  @Field()
  description: string;

  @Field(() => Status)
  status: Status;
}

@InputType()
export class CreateServiceInput extends ServiceBaseInput {}

@InputType()
export class UpdateServiceInput extends ServiceBaseInput {}

@InputType()
export class FilterServiceInput {
  @Field()
  name: string;

  @Field()
  type: string;
}
