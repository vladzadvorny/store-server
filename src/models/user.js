import mongoose, { Schema } from 'mongoose';

const schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    telegramId: {
      type: Number,
      required: true
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      required: true,
      default: 'user'
    },
    secret: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

schema.set('toJSON', {
  virtuals: true
});

export default mongoose.model('User', schema);
