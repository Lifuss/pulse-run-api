const { model } = require('mongoose');
const { promoCodeSchema } = require('../schemas/mongoose/promoCodes');

const PromoCode = model('PromoCode', promoCodeSchema);

export default PromoCode;
