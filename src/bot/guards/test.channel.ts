import { DiscordGuard } from 'discord-nestjs-xzyv';
import { ClientEvents, Message } from 'discord.js';
import { BotConfig } from '../bot.config';

export class TestChannel implements DiscordGuard {

  canActive(event: keyof ClientEvents, context: any): boolean | Promise<boolean> {
    let pass = false;
    if (event == 'message') {
      pass = (context[0] as Message).channel.id == "785817719169220619";
    }
    return pass;
  }

}