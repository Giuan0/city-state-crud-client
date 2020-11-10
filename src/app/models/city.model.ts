import {State} from './state.model';

export interface City {
    _id?: string;
    name: string;
    state: State;
    createdAt?: Date;
    updatedAt?: Date;
}
