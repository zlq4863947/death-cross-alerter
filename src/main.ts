import { Logger } from '@nestjs/common';

import { Alerter } from './alerter';

async function main(): Promise<void> {
  const alerter = new Alerter();
  await alerter.start();
  Logger.log('启动死叉报警机器人');
}

main().catch((e) => {
  Logger.error(`程序异常退出, 错误信息:${e.message}`);
  process.exit(1);
});
