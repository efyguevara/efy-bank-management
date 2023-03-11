import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserModule } from './user/user.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const user = await NestFactory.create(UserModule);
  await user.listen(3000);
}
bootstrap();
