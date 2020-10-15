import { Field, InputType } from 'type-graphql';

@InputType()
class OrderBaseInput {
  @Field()
  createdBy: string;
}

@InputType()
export class Create extends OrderBaseInput {}

@InputType()
export class Update extends OrderBaseInput {}

@InputType()
export class FilterInput {
  @Field({ nullable: true })
  createdBy?: string;
}
