import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../entities/users/user.entity';
import { IGenericDataServices } from '../generics/generic-data.services';
import { MongoDataServices } from './abstract.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('DB_URL'),
        dbName: configService.getOrThrow<string>('DB_NAME'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    {
      provide: IGenericDataServices,
      useClass: MongoDataServices,
    },
  ],
  exports: [IGenericDataServices],
})
export class AbstractMongoModule {}
