import User from './user';
import Review from './review';
import Category from './category';
import * as product from './product';

export default {
  User,
  Review,
  Category,
  ...product
};
