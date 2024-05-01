import { model } from 'mongoose';
import { promoCodeSchema } from '../schemas/mongoose/promoCode';

const PromoCode = model('PromoCode', promoCodeSchema);

export default PromoCode;
