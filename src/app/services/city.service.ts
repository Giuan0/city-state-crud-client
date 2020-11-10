import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApplicationResponse} from '../models/applicationResponse.model';
import {City} from '../models/city.model';
import {CityPutPostRequest} from '../models/city-put-request.model';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {

    constructor(private http: HttpClient) {
    }

    public getCities(): Promise<ApplicationResponse<City[]>> {
        return this.http.get<ApplicationResponse<City[]>>(`${environment.apiEndpoint}/city`)
            .toPromise();
    }

    public postCity(city: CityPutPostRequest): Promise<ApplicationResponse<City>> {
        return this.http.post<ApplicationResponse<City>>(`${environment.apiEndpoint}/city`, city)
            .toPromise();
    }

    public putCity(cityId: string, city: CityPutPostRequest): Promise<ApplicationResponse<City>> {
        return this.http.put<ApplicationResponse<City>>(`${environment.apiEndpoint}/city/${cityId}`, city)
            .toPromise();
    }

    public deleteCity(stateId: string): Promise<ApplicationResponse<string>> {
        return this.http.delete<ApplicationResponse<string>>(`${environment.apiEndpoint}/city/${stateId}`)
            .toPromise();
    }
}
