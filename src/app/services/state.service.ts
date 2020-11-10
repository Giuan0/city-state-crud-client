import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {State} from '../models/state.model';
import {ApplicationResponse} from '../models/applicationResponse.model';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class StateService {

    constructor(private http: HttpClient) {
    }

    public getStates(): Promise<ApplicationResponse<State[]>> {
        return this.http.get<ApplicationResponse<State[]>>(`${environment.apiEndpoint}/state`)
            .toPromise();
    }

    public postState(state: State): Promise<ApplicationResponse<State>> {
        return this.http.post<ApplicationResponse<State>>(`${environment.apiEndpoint}/state`, state)
            .toPromise();
    }

    public putState(stateId: string, state: State): Promise<ApplicationResponse<State>> {
        return this.http.put<ApplicationResponse<State>>(`${environment.apiEndpoint}/state/${stateId}`, state)
            .toPromise();
    }

    public deleteStates(stateId: string): Promise<ApplicationResponse<string>> {
        return this.http.delete<ApplicationResponse<string>>(`${environment.apiEndpoint}/state/${stateId}`)
            .toPromise();
    }
}
