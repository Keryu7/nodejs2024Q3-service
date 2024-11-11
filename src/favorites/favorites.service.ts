import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Artist } from 'src/artist/interfaces/artist.interface';
import { Album } from 'src/album/interfaces/album.interface';
import { Track } from 'src/track/interfaces/track.interface';
import { Favorites } from './interfaces/favotites.interface';

@Injectable()
export class FavoritesService {
  private favoriteArtists: Artist[] = [];
  private favoriteAlbums: Album[] = [];
  private favoriteTracks: Track[] = [];

  getAllFavorites(): Favorites {
    return {
      artists: this.favoriteArtists,
      albums: this.favoriteAlbums,
      tracks: this.favoriteTracks,
    };
  }

  addTrackToFavorites(track: Track) {
    if (this.favoriteTracks.some((favTrack) => favTrack.id === track.id)) {
      throw new UnprocessableEntityException('Track is already in favorites');
    }
    this.favoriteTracks.push(track);
  }

  removeTrackFromFavorites(trackId: string) {
    const index = this.favoriteTracks.findIndex(
      (track) => track.id === trackId,
    );
    if (index === -1)
      throw new NotFoundException('Track not found in favorites');
    this.favoriteTracks.splice(index, 1);
  }

  addAlbumToFavorites(album: Album) {
    if (this.favoriteAlbums.some((favAlbum) => favAlbum.id === album.id)) {
      throw new UnprocessableEntityException('Album is already in favorites');
    }
    this.favoriteAlbums.push(album);
  }

  removeAlbumFromFavorites(albumId: string) {
    const index = this.favoriteAlbums.findIndex(
      (album) => album.id === albumId,
    );
    if (index === -1)
      throw new NotFoundException('Album not found in favorites');
    this.favoriteAlbums.splice(index, 1);
  }

  addArtistToFavorites(artist: Artist) {
    if (this.favoriteArtists.some((favArtist) => favArtist.id === artist.id)) {
      throw new UnprocessableEntityException('Artist is already in favorites');
    }
    this.favoriteArtists.push(artist);
  }

  removeArtistFromFavorites(artistId: string) {
    const index = this.favoriteArtists.findIndex(
      (artist) => artist.id === artistId,
    );
    if (index === -1)
      throw new NotFoundException('Artist not found in favorites');
    this.favoriteArtists.splice(index, 1);
  }

  removeTrackIfFavorite(trackId: string) {
    this.favoriteTracks = this.favoriteTracks.filter(
      (track) => track.id !== trackId,
    );
  }

  removeAlbumIfFavorite(albumId: string) {
    this.favoriteAlbums = this.favoriteAlbums.filter(
      (album) => album.id !== albumId,
    );
  }

  removeArtistIfFavorite(artistId: string) {
    this.favoriteArtists = this.favoriteArtists.filter(
      (artist) => artist.id !== artistId,
    );
  }
}
