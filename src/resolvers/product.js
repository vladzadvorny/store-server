import { convertProduct, categoryResolver, ownerResolver } from '../utils';

export default {
  Query: {
    product: async (parent, { id }, { models }) => {
      try {
        const product = await models.Product.findById(id);

        return convertProduct(product);
      } catch (error) {
        throw error;
      }
    }
  },
  Product: {
    category: categoryResolver,
    owner: ownerResolver
  }
};
