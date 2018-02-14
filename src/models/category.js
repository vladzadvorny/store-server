import mongoose, { Schema } from 'mongoose';

import { languages, types } from '../config';

const nameSchema = new Schema(
  {
    lang: {
      type: String,
      enum: languages,
      required: true,
      default: languages[0]
    },
    text: {
      type: String,
      required: true,
      minlength: [1, '2 to 56 characters'],
      maxlength: [56, '2 to 56 characters']
    }
  },
  { _id: false }
);

const schema = new Schema(
  {
    name: [nameSchema],
    type: {
      type: String,
      enum: types, // ['bot', 'channel', 'group', 'sticker']
      required: true,
      default: types[0]
    },
    url: {
      type: String
    }
  },
  { usePushEach: true }
);

schema.set('toJSON', {
  virtuals: true
});

export default mongoose.model('Category', schema);
