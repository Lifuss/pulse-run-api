import { model } from 'mongoose';
import subscribeSchema from '../schemas/mongoose/subscribe';

const Subscribe = model('Subscribe', subscribeSchema);

export default Subscribe;
