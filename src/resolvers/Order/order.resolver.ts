import { Arg, Mutation, Resolver } from 'type-graphql';

import { Create, Update, FilterInput } from './Inputs';
import { createBaseResolver } from '~/utils/createBaseResolver';
import { Order } from '~/entity/Order';
// import Queue from '~/utils/Queue';

const Inputs = {
  create: Create,
  update: Update,
  filter: FilterInput,
};

const BaseResolver = createBaseResolver('Order', Order, Order, Inputs);

@Resolver(Order)
export class OrderResolver extends BaseResolver {
  @Mutation(() => Order, { name: 'createOrder' })
  async createOrder(@Arg('data', () => Create) data: Create): Promise<Order> {
    const { createdBy } = data;
    const order = await Order.create({ createdBy });
    return order;
  }
}
