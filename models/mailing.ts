import { Schema, model } from 'mongoose';

const mailingSchema = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    isSubscribed: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false },
);

const Mailing = model('Mailing', mailingSchema);

export default Mailing;
