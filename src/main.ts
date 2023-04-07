import {autoDeclare} from "@infrastructure/types/declare";
import {ValidationPipe} from "@nestjs/common";
import {NestFactory} from "@nestjs/core";
import cookieParser from "cookie-parser";
import {AppModule} from "./app.module";

autoDeclare();

async function bootstrap() {
  console.log("Iam Server");

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({transform: true}));

  await app.listen(process.env.SERVER_HTTP_PORT);
}

bootstrap();
