import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 49153,
      username: 'postgres',
      password: 'postgrespw',
      database: 'online-jewelry',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductsModule,
    // UsersModule,
  ],
})
export class AppModule {}
