import { Module } from '@nestjs/common';
import { TrackController } from './controllers/track.controller';
import { TrackService } from './services/track.service';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [FavoritesModule],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
