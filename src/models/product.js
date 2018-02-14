import mongoose, { Schema } from 'mongoose';

// main
const productSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: 'Upload'
    },
    status: {
      type: String,
      enum: ['published', 'moderation'],
      required: true,
      default: 'moderation'
    },
    rating: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

productSchema.set('toJSON', {
  virtuals: true
});

export const Product = mongoose.model('Product', productSchema);

// bot
const botDescriptionSchema = new Schema(
  {
    lang: {
      type: String,
      required: true,
      maxlength: 2
    },
    name: {
      type: String,
      required: true,
      minlength: [2, '2 to 40 characters'],
      maxlength: [40, '2 to 40 characters']
    },
    body: {
      type: String,
      minlength: [2, '2 to 240 characters'],
      maxlength: [240, '2 to 240 characters']
    }
  },
  {
    _id: false
  }
);

const botSchema = new Schema({
  descriptions: [botDescriptionSchema]
});

export const Bot = Product.discriminator('bot', botSchema);

// channel
const channelSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  lang: {
    type: String,
    required: true,
    maxlength: 2
  }
});

export const Channel = Product.discriminator('channel', channelSchema);

// group
const groupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  lang: {
    type: String,
    required: true,
    maxlength: 2
  }
});

export const Group = Product.discriminator('group', groupSchema);

// sticker
const stickerSchema = new Schema({
  name: {
    type: String,
    required: true
  }
  // images: [String]
});

export const Sticker = Product.discriminator('sticker', stickerSchema);
