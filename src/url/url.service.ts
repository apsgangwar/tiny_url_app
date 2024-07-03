import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import UrlEntity from './entities/url.entity';

import { CreateUrlDto } from './dto/create-url.dto';
import { GetUrlDto } from './dto/get-all-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';

const CHAR_ARRAY =
  '012345689abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';
const CHAR_LENGTH = CHAR_ARRAY.length;
const TINY_URL_LENGTH = 5;
const MAX_RETRIES = 3;

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(UrlEntity)
    private readonly urlRepo: Repository<UrlEntity>,
  ) {}

  randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getRandomString() {
    let str = '';

    for (let i = 0; i < TINY_URL_LENGTH; i++) {
      const char_index = this.randomIntFromInterval(0, CHAR_LENGTH - 1);
      str = str + CHAR_ARRAY[char_index];
    }

    return str;
  }

  async saveUrlToDatabase(full_url: string, short_url: string) {
    try {
      await this.urlRepo.save(
        this.urlRepo.create({
          full_url,
          short_url,
        }),
      );

      return true;
    } catch (e) {
      // further can check the error for duplicacy
      return false;
    }
  }

  async create(dto: CreateUrlDto) {
    const { full_url } = dto;
    let short_url = '';
    let url_saved = false;

    for (let i = 0; i < MAX_RETRIES; i++) {
      short_url = this.getRandomString();
      url_saved = await this.saveUrlToDatabase(full_url, short_url);

      if (url_saved) {
        return { short_url };
      }
    }

    throw new BadRequestException('Not able to create short url');
  }

  async findAll(dto: GetUrlDto) {
    const { take = 10, skip = 0 } = dto;
    const [data, count] = await this.urlRepo.findAndCount({ take, skip });

    return { data, count };
  }

  async findOne(id: string) {
    const entity = await this.urlRepo.findOne({ where: { id } });

    if (!entity) throw new NotFoundException();

    return entity;
  }

  async getFullUrl(short_url: string) {
    const entity = await this.urlRepo.findOne({ where: { short_url } });

    if (!entity) throw new NotFoundException('Invalid URL');

    return entity.full_url;
  }

  async update(id: string, dto: UpdateUrlDto) {
    const { full_url } = dto;
    const entity = await this.urlRepo.findOne({ where: { id } });

    if (!entity) throw new NotFoundException();

    await this.urlRepo.update({ id }, { full_url });

    return `URL updated successfully`;
  }

  async remove(id: string) {
    const entity = await this.urlRepo.findOne({ where: { id } });

    if (!entity) throw new NotFoundException();

    await this.urlRepo.delete({ id });

    return `URL deleted successfully`;
  }
}
