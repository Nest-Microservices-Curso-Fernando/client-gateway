import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { envs, PRODUCTS_SERVICE } from 'src/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: PRODUCTS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.productsMicroservice.host,
          port: envs.productsMicroservice.port,
        },
      },
    ]),
  ],
})
export class ProductsModule {}
