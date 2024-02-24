import app from './app';
import mongoose from 'mongoose';

const port = process.env.PORT || 3003;

mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.DB_HOST as string)
  .then(() => {
    console.log('Connected to the database.');
    app.listen(port, () => {
      console.log(`Server is running on ${port} port.`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
