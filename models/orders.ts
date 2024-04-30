import { model } from 'mongoose';
import { orderSchema } from '../schemas/mongoose/orders';

const Order = model('Order', orderSchema);

export default Order;
