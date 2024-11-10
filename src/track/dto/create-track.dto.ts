import { IsString, IsOptional, IsUUID, IsInt, Min } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID()
  artistId: string | null;

  @IsOptional()
  @IsUUID()
  albumId: string | null;

  @IsInt()
  @Min(1)
  duration: number;
}
