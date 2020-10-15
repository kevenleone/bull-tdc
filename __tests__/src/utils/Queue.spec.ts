import Queue from '~/utils/Queue';
import constants from '~/utils/contants';

const { JOB_NOT_FOUND } = constants;

describe('Test Queue Utils', () => {
  it('Try to add on queue a job that not exists and return nothing', () => {
    const JOB = 'REMOVE_ALL_USERS';
    const q = Queue.add(JOB, {});
    expect(q).toStrictEqual(new Error(JOB_NOT_FOUND(JOB)));
  });

  it('Process Queue', () => {
    Queue.process();
  });
});
