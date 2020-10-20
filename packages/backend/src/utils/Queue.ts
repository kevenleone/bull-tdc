import { Queue, Worker } from 'bullmq';

import * as Jobs from '~/jobs';
import { constants, defaults, logger } from '~/utils/globalMethods';
const { REDIS_URL } = defaults;

const redisOptions = {
  host: REDIS_URL,
  port: 6379,
};

const queues = Object.values(Jobs).map((job) => {
  const { active = true, config, data, handle, name, selfRegister = false }: any = job;
  const bull = new Queue(name, { connection: { ...redisOptions } });
  if (selfRegister && active) bull.add(name, data, config);
  return {
    bull,
    name,
    handle,
    active,
  };
});

export default {
  queues,
  add(name: string, data?: any): any {
    const queue = this.queues.find((queue) => queue.name === name);
    if (queue) {
      queue.bull.add(name, data);
      logger.info(`Job: ${name} added to Queue`);
      return queue;
    }
    logger.warn(`Job: [${name}] wasn't found, and nothing was add to Queue`);
    return new Error(constants.JOB_NOT_FOUND(name));
  },
  process(): void {
    logger.debug('Queue Process initialized');

    for (const queue of this.queues) {
      const { active, name } = queue;
      if (active) {
        const worker = new Worker(name, queue.handle);

        worker.on('completed', () => {
          logger.info(`[${name}] | [COMPLETED]`);
        });

        worker.on('failed', (_, err) => {
          logger.error(`[${name}] | [FAILED] -> ${err.message}`);
        });
      }
    }
  },
};
