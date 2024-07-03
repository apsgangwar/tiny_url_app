import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { IsUrl } from 'class-validator';

export class UpdateUrlDto {
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  full_url: string;
}
