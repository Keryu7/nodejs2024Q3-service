import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { UuidParamDto } from '../dto/uuid-param.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getAllArtists() {
    return this.artistService.findAll();
  }

  @Get(':id')
  getArtist(@Param() params: UuidParamDto) {
    return this.artistService.findById(params.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createArtist(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  updateArtist(
    @Param() params: UuidParamDto,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(params.id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param() params: UuidParamDto) {
    this.artistService.remove(params.id);
  }
}
