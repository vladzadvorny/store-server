import _ from 'lodash';

export const convertProduct = product => {
  if (product.__t === 'bot') {
    const enIndex = _.findIndex(product.descriptions, ['lang', 'en']);

    return {
      id: product.id,
      name:
        enIndex === -1
          ? product.descriptions[0].name
          : product.descriptions[enIndex].name,
      description:
        enIndex === -1
          ? product.descriptions[0].body
          : product.descriptions[enIndex].body,
      type: 'bot',
      category: product.category,
      owner: product.owner,
      // image: product.image,
      status: product.status,
      rating: product.rating
    };
  }

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    type: product.__t,
    owner: product.owner,
    // image: product.image,
    status: product.status,
    rating: product.rating
  };
};

export const categoryResolver = async (
  { category: id },
  args,
  { loaders, locale }
) => {
  const lang = locale.interface;
  try {
    const _category = await loaders.getCategory.load(id);

    // get name
    const { text: name } = _category.name[
      _.findIndex(_category.name, ['lang', lang])
    ];

    return {
      id: _category.id,
      name,
      url: _category.url
    };
  } catch (error) {
    // console.log(error);
    throw error;
  }
};

export const ownerResolver = async ({ owner: id }, args, { loaders }) => {
  try {
    const user = await loaders.getUser.load(id);
    return user;
  } catch (error) {
    throw error;
  }
};
