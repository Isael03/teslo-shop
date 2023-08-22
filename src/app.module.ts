import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';


@Module({
  imports: [
    ConfigModule.forRoot(), // acceso a variables de entorno
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      //entities: [],
      synchronize: true,
      autoLoadEntities:true
    }),
    ProductsModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
