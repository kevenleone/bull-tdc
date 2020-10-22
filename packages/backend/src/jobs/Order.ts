import faker from 'faker';

import { Order, Status } from '~/entity/Order';
import Service, { Status as ServiceStatus } from '~/entity/Service';
import { constants } from '~/utils/globalMethods';

const generateFakeServices = (orderId: string, total = 10): Service[] => {
  return [...new Array(total)].map(() => {
    return Service.create({
      createdAt: new Date(),
      description: faker.lorem.lines(3),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      orderId,
      serviceType: faker.random.words(2),
      status: ServiceStatus.CREATED,
    });
  });
};

const { JOB_IMPORT_ORDER, PRIORITY_HIGH } = constants;

const handle = async ({ data }: any): Promise<void> => {
  const { id } = data;
  const order = await Order.findOne(id);
  if (order) {
    order.status = Status.IN_PROCESS;
    order.modifiedAt = new Date().toISOString();
    order.save();

    const services = generateFakeServices(id, 10);

    for (const service of services) {
      service.save();
    }
  }
};

export default {
  active: true,
  config: {
    priority: PRIORITY_HIGH,
  },
  handle,
  name: JOB_IMPORT_ORDER,
  selfRegister: false,
};
