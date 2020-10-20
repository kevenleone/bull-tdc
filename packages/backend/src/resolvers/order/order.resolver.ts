import { Arg, Mutation, Resolver } from 'type-graphql';

import { Order } from '~/entity/Order';
import { createBaseResolver } from '~/utils/createBaseResolver';
import { constants } from '~/utils/globalMethods';
import Queue from '~/utils/Queue';

import { Create, FilterInput, Update } from './Inputs';

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
    const order = await Order.create({ createdBy }).save();
    Queue.add(constants.JOB_IMPORT_ORDER, { id: order.id });
    return order;
  }
}
