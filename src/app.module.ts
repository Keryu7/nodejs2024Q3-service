import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistController } from './artist/artist.controller';
import { ArtistService } from './artist/artist.service';
import { AlbumController } from './album/album.controller';
import { AlbumService } from './album/album.service';
import { TrackController } from './track/track.controller';
import { TrackService } from './track/track.service';
import { FavoritesController } from './favorites/favorites.controller';
import { FavoritesService } from './favorites/favorites.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [UserModule],
  controllers: [
    AppController,
    UserController,
    ArtistController,
    AlbumController,
    TrackController,
    FavoritesController,
  ],
  providers: [
    AppService,
    UserService,
    ArtistService,
    AlbumService,
    TrackService,
    FavoritesService,
  ],
})
export class AppModule {}
