import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserModule } from './user/user.module';
import { QrcodeModule } from './qrcode/qrcode.module';
import { AlgorithmModule } from './algorithm/algorithm.module';
@Module({
  imports: [
    // 连接数据库
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'Root1234!@#',
      database: 'test',
      // entities: [], // 实体文件
      synchronize: true, //是否自动将实体类同步到数据库
      retryAttempts: 10,
      retryDelay: 500,
      autoLoadEntities: true, // 将自动加载forFeature()方法，注册的每个实体都将自动添加到配置对象的实体数组中
    }),
    UserModule,
    QrcodeModule,
    AlgorithmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private datasource: DataSource) {}
}
