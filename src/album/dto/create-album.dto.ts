import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsOptional()
  artistId: string | null;

  @IsInt()
  @IsNotEmpty()
  year: number;
}
