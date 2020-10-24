import {
  Connection,
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from 'typeorm';

import { defaults, logger } from './globalMethods';
const { ENVIRONMENT } = defaults;

export const createTypeormConn = async (): Promise<Connection> => {
  logger.debug(`TypeORM Environment: ${ENVIRONMENT}`);

  const connectionOptions: ConnectionOptions = await getConnectionOptions(
    ENVIRONMENT,
  );
  return createConnection({ ...connectionOptions, name: 'default' });
};
