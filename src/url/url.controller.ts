import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { GetUrlDto } from './dto/get-all-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('create')
  create(@Body() dto: CreateUrlDto) {
    return this.urlService.create(dto);
  }

  @Get('all')
  findAll(@Query() dto: GetUrlDto) {
    return this.urlService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.urlService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUrlDto) {
    return this.urlService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.urlService.remove(id);
  }
}
