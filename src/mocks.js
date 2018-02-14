import faker from 'faker';

import models from './models';
import { languages, types } from './config';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function getRating(min, max) {
  return +(Math.random() * (max - min) + min).toFixed(2);
}

export default async () => {
  const {
    User,
    Category,
    Review,
    Product,
    Bot,
    Channel,
    Group,
    Sticker
  } = models;
  const users = 50;
  // const productTypes = ['bot', 'channel', 'group'];
  const botCategoryIds = [
    '5a846ef07b3a800c29431258',
    '5a846ef07b3a800c29431254',
    '5a846ef07b3a800c29431256',
    '5a846ef07b3a800c2943125a',
    '5a846ef07b3a800c29431255',
    '5a846ef07b3a800c29431259',
    '5a846ef07b3a800c29431257'
  ];
  const channelCategoryIds = [
    '5a846ef07b3a800c2943125c',
    '5a846ef07b3a800c2943125d',
    '5a846ef07b3a800c2943125f',
    '5a846ef07b3a800c2943125e',
    '5a846ef07b3a800c2943125b',
    '5a846ef07b3a800c29431260',
    '5a846ef07b3a800c29431261'
  ];
  const groupCategoryIds = [
    '5a846ef07b3a800c29431262',
    '5a846ef07b3a800c29431267',
    '5a846ef07b3a800c29431264',
    '5a846ef07b3a800c29431266',
    '5a846ef07b3a800c29431263',
    '5a846ef07b3a800c29431268',
    '5a846ef07b3a800c29431265'
  ];
  const stickerCategoryIds = [
    '5a846ef07b3a800c2943126c',
    '5a846ef07b3a800c29431269',
    '5a846ef07b3a800c2943126a',
    '5a846ef07b3a800c2943126f',
    '5a846ef07b3a800c2943126b',
    '5a846ef07b3a800c2943126e',
    '5a846ef07b3a800c2943126d'
  ];

  if (true) {
    await User.remove();
    await Review.remove();
    await Product.remove();
    await Array.from({ length: users }).forEach(async () => {
      const user = await User.create({
        name: faker.name.firstName(),
        telegramId: getRandomInt(1000000, 9999999),
        secret: 'www'
      });

      // add bots
      await Array.from({ length: 5 }).forEach(async () => {
        // product description
        const descriptions = [
          {
            lang: 'en',
            name: faker.lorem.word(),
            body: faker.lorem.words(30)
          }
        ];
        if (Math.random() >= 0.5) {
          descriptions.push({
            lang: 'ru',
            name: faker.lorem.word(),
            body: faker.lorem.words(10)
          });
        }

        const bot = await Bot.create({
          descriptions,
          category:
            botCategoryIds[Math.floor(Math.random() * botCategoryIds.length)],
          owner: user.id,
          status: 'published',
          rating: getRating(1, 4.6)
        });

        // add reviews
        await Array.from({ length: 5 }).forEach(async () => {
          await Review.create({
            rate: getRandomInt(1, 5),
            text: faker.lorem.words(15),
            author: user.id,
            product: bot.id
          });
        });
      });

      // add channels
      await Array.from({ length: 5 }).forEach(async () => {
        // product description

        const channel = await Channel.create({
          name: faker.lorem.word(2),
          description: faker.lorem.words(30),
          lang: languages[Math.floor(Math.random() * languages.length)],
          category:
            channelCategoryIds[
              Math.floor(Math.random() * channelCategoryIds.length)
            ],
          owner: user.id,
          status: 'published',
          rating: getRating(1, 4.6)
        });

        // add reviews
        await Array.from({ length: 5 }).forEach(async () => {
          await Review.create({
            rate: getRandomInt(1, 5),
            text: faker.lorem.words(15),
            author: user.id,
            product: channel.id
          });
        });
      });

      // add groups
      await Array.from({ length: 5 }).forEach(async () => {
        // product description

        const group = await Group.create({
          name: faker.lorem.word(2),
          description: faker.lorem.words(30),
          lang: languages[Math.floor(Math.random() * languages.length)],
          category:
            groupCategoryIds[
              Math.floor(Math.random() * groupCategoryIds.length)
            ],
          owner: user.id,
          status: 'published',
          rating: getRating(1, 4.6)
        });

        // add reviews
        await Array.from({ length: 5 }).forEach(async () => {
          await Review.create({
            rate: getRandomInt(1, 5),
            text: faker.lorem.words(15),
            author: user.id,
            product: group.id
          });
        });
      });

      // add stickers
      await Array.from({ length: 5 }).forEach(async () => {
        // product description

        const sticker = await Sticker.create({
          name: faker.lorem.word(2),
          category:
            stickerCategoryIds[
              Math.floor(Math.random() * stickerCategoryIds.length)
            ],
          owner: user.id,
          status: 'published',
          rating: getRating(1, 4.6)
        });

        // add reviews
        await Array.from({ length: 5 }).forEach(async () => {
          await Review.create({
            rate: getRandomInt(1, 5),
            text: faker.lorem.words(15),
            author: user.id,
            product: sticker.id
          });
        });
      });
    });
  }
  // add categories
  if (false) {
    await Category.remove();
    await types.forEach(async type => {
      await Array.from({ length: 7 }).forEach(async () => {
        const names = [];
        languages.forEach(lang =>
          names.push({
            lang,
            text: faker.lorem.word()
          })
        );

        const category = await Category.create({
          type,
          name: names,
          url: faker.lorem.word()
        });
        console.log(`${type}'${category._id}',`);
      });
    });
  }
};
