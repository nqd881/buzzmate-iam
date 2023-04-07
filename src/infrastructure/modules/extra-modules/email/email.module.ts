import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Module } from "@nestjs/common";
import { Ports } from "src/application/ports/constants";
import { EmailService } from "./email.service";

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          type: "OAuth2",
          user: "nqd881@gmail.com",
          clientId:
            "473488672971-2gg79u5ecj07ol7ecjkou5o2ua50286j.apps.googleusercontent.com",
          clientSecret: "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",
          refreshToken:
            "1//04Sv3Zr6f1HFoCgYIARAAGAQSNwF-L9IrvW4bMUY2cUe7R6wNagcFTDmDL4TOPj9CfYn1cO0v4sKAfgPXY3Oyl6o92bIMHeAb13s",
        },
      },
      defaults: {
        from: "Buzzmate",
      },
      template: {
        dir: `${process.cwd()}/src/infrastructure/modules/extra-modules/email/email-templates`,
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [
    {
      provide: Ports.EmailService,
      useClass: EmailService,
    },
  ],
  exports: [Ports.EmailService],
})
export class EmailModule {}
