import {StationState} from '../enums/station-state.enum';

export interface Station {
  datasetid: string;
  fields: {
    etat: StationState,
    commune: string,
    nbvelosdispo: number,
    nbplacesdispo: number,
    nom: string
  };
}
