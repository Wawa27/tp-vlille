import {Pipe, PipeTransform} from '@angular/core';
import {Station} from '../interfaces/station';
import {StationGetResult} from '../interfaces/station-get-result';

/**
 * Pipe to only get stations from a StationGetResult
 */
@Pipe({
  name: 'stationPipe'
})
export class StationPipe implements PipeTransform {

  transform(value: StationGetResult): Station[] {
    return value?.records;
  }
}
