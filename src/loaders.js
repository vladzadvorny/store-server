import DataLoader from 'dataloader';
import { dataLoaderMongoose } from 'dataloader-mongoose';

import models from './models';

const { User, Category } = models;

export default () => ({
  getUser: new DataLoader(ids => dataLoaderMongoose(User, ids)),
  getCategory: new DataLoader(ids => dataLoaderMongoose(Category, ids))
});
