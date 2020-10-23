import { Field, InputType } from 'type-graphql';

@InputType()
class OrderBaseInput {
  @Field()
  createdBy: string;

  @Field({ nullable: true })
  name: string;
}

@InputType()
export class CreateOrderInput extends OrderBaseInput {}

@InputType()
export class UpdateOrderInput extends OrderBaseInput {}

@InputType()
export class FilterOrderInput {
  @Field({ nullable: true })
  createdBy?: string;
}
