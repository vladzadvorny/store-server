import mongoose, { Schema } from 'mongoose';

const schema = new Schema(
  {
    rate: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    text: {
      type: String,
      minlength: [2, '2 to 160 characters'],
      maxlength: [160, '2 to 160 characters']
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    }
  },
  { timestamps: true }
);

schema.set('toJSON', {
  virtuals: true
});

export default mongoose.model('Review', schema);
