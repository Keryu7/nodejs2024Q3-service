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
import { AlbumService } from '../services/album.service';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { UuidParamDto } from '../../dto/uuid-param.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAllAlbums() {
    return this.albumService.findAll();
  }

  @Get(':id')
  getAlbum(@Param() params: UuidParamDto) {
    return this.albumService.findById(params.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  updateAlbum(
    @Param() params: UuidParamDto,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(params.id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param() params: UuidParamDto) {
    this.albumService.remove(params.id);
  }
}
