import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { UrlService } from './url/url.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly urlService: UrlService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':short_url')
  async getFullUrl(@Param('short_url') short_url: string, @Res() res) {
    const fullUrl = await this.urlService.getFullUrl(short_url);
    res.redirect(fullUrl);
  }
}
