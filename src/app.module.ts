import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeormConfig } from './config/typeorm.config';
import { UrlModule } from './url/url.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), UrlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
