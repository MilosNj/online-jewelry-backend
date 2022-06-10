import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { OrderModule } from './order/order.module';
import { ReviewModule } from './review/review.module';
import { OrderItemModule } from './order-item/order-item.module';
import { ShippingAddressModule } from './shipping-address/shipping-address.module';
import { PaymentResultModule } from './payment-result/payment-result.module';
import envConfig from '../config/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [envConfig.path],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ProductsModule,
    OrderModule,
    ReviewModule,
    OrderItemModule,
    ShippingAddressModule,
    PaymentResultModule,
    UsersModule,
  ],
})
export class AppModule {}
