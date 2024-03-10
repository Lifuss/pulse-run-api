import { model } from 'mongoose';
import supportSchema from '../schemas/mongoose/supports';

const Support = model('Support', supportSchema);

export default Support;
