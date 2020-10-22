import { Resolver } from 'type-graphql';

import Service from '~/entity/Service';
import { createBaseResolver } from '~/utils/createBaseResolver';

import { CreateServiceInput, FilterServiceInput, UpdateServiceInput } from './Inputs';

const Inputs = {
  create: CreateServiceInput,
  filter: FilterServiceInput,
  update: UpdateServiceInput,
};

const BaseResolver = createBaseResolver('Service', Service, Service, Inputs);

@Resolver(Service)
export class OrderResolver extends BaseResolver {}
