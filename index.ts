import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';
import { AppModule } from './src/app.module';
const expressServer = express();

var instance_on = false;
const createFunction = async (expressInstance) => {
  if (instance_on) return;

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  app.enableCors();
  await app.init();
  instance_on = true;
};

export const api = functions.https.onRequest(async (request, response) => {
  await createFunction(expressServer);
  expressServer(request, response);
});
