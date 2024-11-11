import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesService } from '../services/favorites.service';
import { TrackService } from 'src/track/services/track.service';
import { AlbumService } from 'src/album/services/album.service';
import { ArtistService } from 'src/artist/services/artist.service';
import { UuidParamDto } from '../../dto/uuid-param.dto';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  @Get()
  getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('track/:id')
  async addTrackToFavorites(@Param() params: UuidParamDto) {
    const track = this.trackService.findById(params.id, false);
    if (!track) {
      throw new UnprocessableEntityException('Track does not exist');
    }
    this.favoritesService.addTrackToFavorites(track);
    return { message: 'Track added to favorites' };
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrackFromFavorites(@Param() params: UuidParamDto) {
    this.favoritesService.removeTrackFromFavorites(params.id);
  }

  @Post('album/:id')
  async addAlbumToFavorites(@Param() params: UuidParamDto) {
    const album = this.albumService.findById(params.id, false);
    if (!album) {
      throw new UnprocessableEntityException('Album does not exist');
    }
    this.favoritesService.addAlbumToFavorites(album);
    return { message: 'Album added to favorites' };
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbumFromFavorites(@Param() params: UuidParamDto) {
    this.favoritesService.removeAlbumFromFavorites(params.id);
  }

  @Post('artist/:id')
  async addArtistToFavorites(@Param() params: UuidParamDto) {
    const artist = this.artistService.findById(params.id, false);
    if (!artist) {
      throw new UnprocessableEntityException('Artist does not exist');
    }
    this.favoritesService.addArtistToFavorites(artist);
    return { message: 'Artist added to favorites' };
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtistFromFavorites(@Param() params: UuidParamDto) {
    this.favoritesService.removeArtistFromFavorites(params.id);
  }
}
