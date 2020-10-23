import faker from 'faker';
import { Arg, Mutation, Resolver } from 'type-graphql';

import { Order, Status } from '~/entity/Order';
import { createBaseResolver } from '~/utils/createBaseResolver';
import { constants } from '~/utils/globalMethods';
import Queue from '~/utils/Queue';

import { CreateOrderInput, FilterOrderInput, UpdateOrderInput } from './Inputs';

const Inputs = {
  create: CreateOrderInput,
  filter: FilterOrderInput,
  update: UpdateOrderInput,
};

const BaseResolver = createBaseResolver('Order', Order, Order, Inputs);

@Resolver(Order)
export class OrderResolver extends BaseResolver {
  @Mutation(() => Order, { name: 'createOrder' })
  async createOrder(@Arg('data', () => CreateOrderInput) data: CreateOrderInput): Promise<Order> {
    const name = data.name || faker.commerce.productName();
    const createdAt = new Date();
    const status = Status.NOT_PROCESSED;
    const order = await Order.create({ ...data, createdAt, name, status }).save();
    Queue.add(constants.JOB_IMPORT_ORDER, { id: order.id });
    return order;
  }
}
