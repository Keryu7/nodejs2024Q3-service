import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from './interfaces/track.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  findAll(): Track[] {
    return this.tracks;
  }

  findById(id: string): Track {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) throw new NotFoundException('Track not found');
    return track;
  }

  create(createTrackDto: CreateTrackDto): Track {
    const newTrack: Track = {
      id: uuidv4(),
      ...createTrackDto,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) throw new NotFoundException('Track not found');
    Object.assign(track, updateTrackDto);
    return track;
  }

  remove(id: string): void {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) throw new NotFoundException('Track not found');
    this.tracks.splice(trackIndex, 1);
  }

  removeArtistFromTracks(artistId: string): void {
    this.tracks.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }

  removeAlbumFromTracks(albumId: string): void {
    this.tracks.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }
}
