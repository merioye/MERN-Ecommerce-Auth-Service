import { DocumentBuilder } from '@nestjs/swagger';

export const buildSwaggerConfig = (PORT: number) => {
  const config = new DocumentBuilder()
    .setTitle('Ecommerce Auth Service')
    .setDescription(
      'This is ecommerce auth service application made with Nest and documented with Swagger',
    )
    .setVersion('1.0')
    .addServer(`http://localhost:${PORT}`, 'Local Server')
    .build();

  return config;
};
