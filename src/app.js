import Koa from 'koa';
import Router from 'koa-router';
import koaBody from 'koa-bodyparser';
import compress from 'koa-compress';
import cors from 'kcors';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import { makeExecutableSchema } from 'graphql-tools';
import depthLimit from 'graphql-depth-limit';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import { isDevelopment, endpointURL } from './config';
import models from './models';
import loaders from './loaders';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers'))
);
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = new Koa();
const router = new Router();

app.use(koaBody());
app.use(cors());
app.use(compress());

// locale
app.use(async (ctx, next) => {
  ctx.locale = { interface: 'en', products: ['en'] };
  try {
    const locale = JSON.parse(ctx.headers['x-locale']);
    ctx.locale = Object.assign({}, ctx.locale, locale);
  } catch (error) {
    //
  }

  await next();
});

router.all(
  endpointURL,
  graphqlKoa(ctx => ({
    schema,
    context: {
      locale: ctx.locale,
      models,
      loaders: loaders()
    },
    validationRules: [depthLimit(3)],
    debug: false
  }))
);

if (isDevelopment) {
  router.get(
    '/graphiql',
    graphiqlKoa({
      endpointURL
    })
  );
}

app.use(router.routes()).use(router.allowedMethods());

export default app;
