import {RedisModule} from "@liaoliaots/nestjs-redis";
import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {CqrsModule} from "@nestjs/cqrs";
import {EventEmitterModule} from "@nestjs/event-emitter";
import {MongooseModule} from "@nestjs/mongoose";
import {AuthModule} from "./infrastructure/modules/auth/auth.module";
import {UserModule} from "./infrastructure/modules/user/user.module";

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    CqrsModule,
    MongooseModule.forRoot(
      "mongodb+srv://admin:anchuoicanai@chatssy.lgekg.mongodb.net/?retryWrites=true&w=majority"
    ),
    ConfigModule.forRoot({
      envFilePath: "src/infrastructure/env/.dev.env",
      isGlobal: true,
    }),
    RedisModule.forRoot({
      config: {
        url: "redis://localhost:6379",
      },
    }),

    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
