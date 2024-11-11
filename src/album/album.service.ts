import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';
import { TrackService } from '../track/track.service';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  constructor(
    private readonly trackService: TrackService,
    private readonly favoritesService: FavoritesService,
  ) {}
  findAll(): Album[] {
    return this.albums;
  }

  findById(id: string, showError = true): Album {
    const album = this.albums.find((album) => album.id === id);
    if (!album && showError) throw new NotFoundException('Album not found');
    return album;
  }

  create(createAlbumDto: CreateAlbumDto): Album {
    const newAlbum: Album = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const album = this.findById(id);
    Object.assign(album, updateAlbumDto);
    return album;
  }

  remove(id: string): void {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) throw new NotFoundException('Album not found');

    this.trackService.removeAlbumFromTracks(id);
    this.favoritesService.removeAlbumIfFavorite(id);
    this.albums.splice(albumIndex, 1);
  }

  removeArtistFromAlbums(artistId: string): void {
    this.albums.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }
}
