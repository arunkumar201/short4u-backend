import mongoose, { Schema } from 'mongoose';

import { IShortUrl } from 'types';

export interface IShortUrlDocument extends Document, IShortUrl {}

const ShortUrlSchema: Schema = new Schema<IShortUrl>({
  original_url: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 20,
    validate: {
      validator: function (value: string) {
        return value.length > 20 || value.length < 10;
      },
      message: (props) => `${props.value} is not a valid url length between 10 and 20 characters   `,
    },
  },
  expiration_date: {
    type: Date,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  is_public: {
    type: Boolean,
    default: false,
  },
  short_url: {
    type: String,
    unique: true,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  customize_short_url: {
    type: String,
    unique: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

ShortUrlSchema.index({ short_url: 1 });
ShortUrlSchema.index({ customize_short_url: 1 });
ShortUrlSchema.index({ expiration_date: 1 });

const ShortUrl = mongoose.model<IShortUrlDocument>('ShortUrl', ShortUrlSchema);

export default ShortUrl;
