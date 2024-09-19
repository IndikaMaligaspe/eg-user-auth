import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // registerGlobals(app);
  await app.listen(8000);
}

export function registerGlobals(app: INestApplication) {
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
}

bootstrap();
