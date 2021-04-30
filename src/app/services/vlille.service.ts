import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {MessageType} from '../enums/message-type.enum';
import {StationGetResult} from '../interfaces/station-get-result';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class VlilleService {
  public static readonly VLILLE_API_URL =
    'https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=vlille-realtime&rows=30&facet=libelle&facet=nom&facet=commune&facet=etat';

  constructor(private httpClient: HttpClient, private messageService: MessageService) {
    this.fetchAllStations();
  }

  /**
   * Fetch stations by name and update observers
   * @param name The name of the station to look for
   */
  fetchStationsByName(name: string): Observable<StationGetResult> {
    const queryUrl = new URL(`${VlilleService.VLILLE_API_URL}&refine.nom=${name.toUpperCase()}`);
    if (!name.trim()) {
      // if no search term, return all stations
      return this.fetchAllStations();
    }
    return this.httpClient
    .get<StationGetResult>(queryUrl.toString())
    .pipe(
      tap(result => this.handleResult(result)),
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Fetch all stations and update observers
   */
  fetchAllStations(): Observable<StationGetResult> {
    const queryUrl = new URL(VlilleService.VLILLE_API_URL);

    return this.httpClient
    .get<StationGetResult>(queryUrl.toString()).pipe(
      tap(result => this.handleResult(result)),
      catchError(err => this.handleError(err))
    );
  }

  /**
   * When an error occurs, add a message to the message service
   * @param error The occurred error
   */
  handleError(error: Error): Observable<StationGetResult> {
    console.error(error);
    this.messageService.addMessage({
      type: MessageType.ERROR,
      text: 'Une erreur est survenue. Merci de réessayer ultérieurement.'
    });
    return throwError(error);
  }

  /**
   * Check for stations, add a message to the message service if no stations were found
   * @param stationGetResult The result of the stations api
   */
  handleResult(stationGetResult: StationGetResult): void {
    if (!stationGetResult.records.length) {
      this.messageService.addMessage({
        type: MessageType.WARNING,
        text: 'Désolé, nous n’avons trouvé aucun résultat correspondant à votre recherche'
      });
    }
  }
}
