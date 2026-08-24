import { Controller, Get, Res } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  @Get()
  getFrontend(@Res() res: express.Response) {
    return res.sendFile(join(process.cwd(), 'public', 'index.html'));
  }
}