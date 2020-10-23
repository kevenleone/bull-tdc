import faker from 'faker';
import { In, Not } from 'typeorm';

import Service, { Status } from '~/entity/Service';
import { constants } from '~/utils/globalMethods';
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

const queueConfig = {
  active: true,
  config: {
    priority: PRIORITY_HIGH,
  },
  async handle(): Promise<void> {
    const services = await Service.find({
      where: {
        status: Not(In([Status.COMPLETE, Status.DISCARDED])),
      },
    });

    for (const service of services) {
      let newStatus = service.status;
      switch (service.status) {
        case Status.CREATED: {
          newStatus = Status.IN_EXECUTION;
          break;
        }

        case Status.IN_EXECUTION: {
          newStatus = faker.random.boolean() ? Status.WAITING_WINDOW : Status.DISCARDED;
          break;
        }

        case Status.WAITING_WINDOW: {
          newStatus = Status.COMPLETE;
          break;
        }
      }

      if (service.status !== newStatus) {
        Queue.add(statuses[newStatus], { after: newStatus, before: service.status });
        service.status = newStatus;
        service.save();
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
        every: 10000, // time in milisseconds
      },
    },

    name: JOB_SERVICE_POOLING,
    selfRegister: true,
  },
  {
    ...queueConfig,
    name: JOB_SERVICE_CREATED,
  },
  {
    ...queueConfig,
    name: JOB_SERVICE_EXECUTION,
  },
  {
    ...queueConfig,
    name: JOB_SERVICE_WAITING_WINDOW,
  },
  {
    ...queueConfig,
    name: JOB_SERVICE_DISCARDED,
  },
  {
    ...queueConfig,
    name: JOB_SERVICE_COMPLETE,
  },
];
