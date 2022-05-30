import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { ConfigService } from '@app/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  app.enableCors({
    origin: ['https://studio.apollographql.com'],
  });

  await app
    .listen(port)
    .then(() => {
      console.log(`🚀 Server is ready: http://localhost:${port}/graphql`);
    })
    .catch((e) => {
      console.log(e);
      console.log(`😿 Something went wrong`);
    });
}

(async () => {
  await bootstrap();
})();
