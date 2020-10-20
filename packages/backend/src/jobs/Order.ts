import { Order, Status } from '~/entity/Order';
import { constants } from '~/utils/globalMethods';

const { JOB_IMPORT_ORDER, PRIORITY_HIGH } = constants;

const handle = async ({ data }: any): Promise<void> => {
    const { id } = data;
    const order = await Order.findOne(id);
    if (order) {
        order.status = Status.IN_PROCESS;
        order.modifiedAt = new Date().toISOString();
        order.save();
    }
};

export default {
    name: JOB_IMPORT_ORDER,
    active: true,
    selfRegister: false,
    config: {
        priority: PRIORITY_HIGH,
    },
    handle,
};
