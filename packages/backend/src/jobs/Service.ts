import faker from 'faker';
import { Not } from 'typeorm';

import Service, { Status } from '~/entity/Service';
import { constants } from '~/utils/globalMethods';
const { JOB_SERVICE_CREATED, PRIORITY_HIGH } = constants;

// $and: [
//     { title: { $not: { $eq: 'Manager' } } },
//     { title: { $not: { $eq: 'Admin' } } },
//   ],

export default {
  active: true,
  config: {
    priority: PRIORITY_HIGH,
    repeat: {
      every: 10000, // time in milisseconds
    },
  },
  async handle(): Promise<void> {
    const services = await Service.find({
      where: {
        status: Not([Status.COMPLETE, Status.DISCARDED]),
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
        service.status = newStatus;
        service.save();
      }
    }
  },
  name: JOB_SERVICE_CREATED,
  selfRegister: true,
};
