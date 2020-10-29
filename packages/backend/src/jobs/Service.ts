import faker from 'faker';

import { Order, Status as OrderStatus } from '~/entity/Order';
import Service, { Status } from '~/entity/Service';
import { constants, logger } from '~/utils/globalMethods';
import Queue from '~/utils/Queue';

const {
  JOB_SERVICE_COMPLETE,
  JOB_SERVICE_CREATED,
  JOB_SERVICE_DISCARDED,
  JOB_SERVICE_EXECUTION,
  JOB_SERVICE_POOLING,
  JOB_SERVICE_WAITING_WINDOW,
  PRIORITY_HIGH,
} = constants;

const statuses = {
  [Status.COMPLETE]: JOB_SERVICE_COMPLETE,
  [Status.CREATED]: JOB_SERVICE_CREATED,
  [Status.DISCARDED]: JOB_SERVICE_DISCARDED,
  [Status.IN_EXECUTION]: JOB_SERVICE_EXECUTION,
  [Status.WAITING_WINDOW]: JOB_SERVICE_WAITING_WINDOW,
};

interface IHandleServiceStatus {
  data: {
    id: string;
  };
}

const handleServiceStatus = async ({
  data: { id },
}: IHandleServiceStatus): Promise<void> => {
  const service = await Service.findOne(id);

  if (!service) {
    return;
  }

  let newStatus = service?.status;

  switch (service.status) {
    case Status.CREATED: {
      newStatus = Status.IN_EXECUTION;
      break;
    }

    case Status.IN_EXECUTION: {
      newStatus = faker.random.boolean()
        ? Status.WAITING_WINDOW
        : Status.DISCARDED;
      break;
    }

    case Status.WAITING_WINDOW: {
      if (new Date().getMinutes() % 2) {
        newStatus = Status.COMPLETE;
      }
      break;
    }

    case Status.DISCARDED: {
      service.statusMessage = `Failed reason: ${faker.lorem.words(2)}`;
      break;
    }

    case Status.COMPLETE: {
      service.statusMessage = `Success: ${faker.lorem.words(4)}`;
      break;
    }
  }

  service.status = newStatus;
  service.save();
};

const queueConfig = {
  active: true,
  config: {
    priority: PRIORITY_HIGH,
  },
  async handle(): Promise<void> {
    const orders = await Order.find({
      where: {
        status: { $in: [OrderStatus.NOT_PROCESSED, OrderStatus.IN_PROCESS] },
      },
    });

    for (const order of orders) {
      const services = await Service.find({
        where: {
          orderId: order.id.toHexString(),
        },
      });

      const serviceCompleteStatuses = [Status.DISCARDED, Status.COMPLETE];

      for (const service of services) {
        if (
          serviceCompleteStatuses.includes(service.status) &&
          service.statusMessage
        ) {
          logger.warn(`${service.name} is complete, skipping !`);
        } else {
          Queue.add(statuses[service.status], { id: service.id.toHexString() });
        }
      }

      const isServicesComplete = services.every(({ status }) =>
        serviceCompleteStatuses.includes(status),
      );

      if (isServicesComplete) {
        order.status = OrderStatus.PROCESSED;
        order.save();
      }
    }
  },
};

export default [
  {
    ...queueConfig,
    config: {
      priority: PRIORITY_HIGH,
      repeat: {
        every: 20000, // time in milisseconds
      },
    },
    name: JOB_SERVICE_POOLING,
    selfRegister: true,
  },
  {
    ...queueConfig,
    handle: handleServiceStatus,
    name: JOB_SERVICE_CREATED,
  },
  {
    ...queueConfig,
    handle: handleServiceStatus,
    name: JOB_SERVICE_EXECUTION,
  },
  {
    ...queueConfig,
    handle: handleServiceStatus,
    name: JOB_SERVICE_WAITING_WINDOW,
  },
  {
    ...queueConfig,
    handle: handleServiceStatus,
    name: JOB_SERVICE_DISCARDED,
  },
  {
    ...queueConfig,
    handle: handleServiceStatus,
    name: JOB_SERVICE_COMPLETE,
  },
];
