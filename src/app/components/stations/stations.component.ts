import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {StationState} from '../../enums/station-state.enum';
import {Station} from '../../interfaces/station';
import {StationGetResult} from '../../interfaces/station-get-result';
import {VlilleService} from '../../services/vlille.service';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: []
})
export class StationsComponent implements OnInit {
  // Latest stations found
  stationGetResult$: Observable<StationGetResult>;
  // Search form
  stationSearchFormGroup = new FormGroup({
    stationName: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z_ 0-9]*$'), Validators.min(3), Validators.max(50)])
  });
  // Hover state for the search button
  hoverState: boolean;

  constructor(private vLilleService: VlilleService) { }

  /**
   * Load all stations on init
   */
  ngOnInit(): void {
    this.stationGetResult$ = this.vLilleService.fetchAllStations();
  }

  /**
   * Load stations with name specified in input when submitted
   */
  onSubmit(): void {
    this.stationGetResult$ = this.vLilleService.fetchStationsByName(this.stationSearchFormGroup.value.stationName);
  }

  /**
   * Re-fetch all stations
   */
  reset(): void {
    this.stationGetResult$ = this.vLilleService.fetchAllStations();
  }

  /**
   * Check for the activeness of a station
   */
  isActive(station: Station): boolean {
    return station.fields.etat === StationState.IN_SERVICE;
  }

  /**
   * Check that a station has bikes left
   */
  hasBikesLeft(station: Station): boolean {
    return station.fields.nbvelosdispo > 0;
  }

  /**
   * Check that a station has space left
   */
  hasSpaceLeft(station: Station): boolean {
    return station.fields.nbplacesdispo > 0;
  }
}
