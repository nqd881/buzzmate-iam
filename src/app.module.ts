import {EnvNames} from "@infrastructure/env/env.name";
import {DomainEventBusModule} from "@infrastructure/modules/extra-modules/domain-event-bus/domain-event-bus.module";
import {RabbitMQEventBusModule} from "@infrastructure/modules/extra-modules/rabbitmq-event-bus/rabbitmq-event-bus.module";
import {RedisModule} from "@liaoliaots/nestjs-redis";
import {Module} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {CqrsModule} from "@nestjs/cqrs";
import {EventEmitterModule} from "@nestjs/event-emitter";
import {MongooseModule} from "@nestjs/mongoose";
import {AuthModule} from "./infrastructure/modules/auth/auth.module";
import {UserModule} from "./infrastructure/modules/user/user.module";

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    CqrsModule,
    ConfigModule.forRoot({
      // envFilePath: "src/infrastructure/env/.dev.env",
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (env: ConfigService) => {
        return {
          uri: env.get(EnvNames.MONGODB_URI),
        };
      },
      inject: [ConfigService],
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (env: ConfigService) => {
        return {
          config: {
            host: env.get(EnvNames.REDIS_HOST),
            port: env.get(EnvNames.REDIS_PORT),
          },
        };
      },
      inject: [ConfigService],
    }),

    RabbitMQEventBusModule,
    DomainEventBusModule,

    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
