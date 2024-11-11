import { Module } from '@nestjs/common';
import { ArtistController } from './controllers/artist.controller';
import { ArtistService } from './services/artist.service';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [TrackModule, AlbumModule, FavoritesModule],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
