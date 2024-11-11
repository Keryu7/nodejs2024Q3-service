import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class UpdateAlbumDto {
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
