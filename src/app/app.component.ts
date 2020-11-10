import {Component} from '@angular/core';
import {StateService} from './services/state.service';
import {State} from './models/state.model';
import {BaseComponent} from './components/base.component';
import {City} from './models/city.model';
import {CityService} from './services/city.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent {
    stateData: State[] = [];
    cityData: City[] = [];

    constructor(private stateService: StateService, private cityService: CityService) {
        super();
        this.loadData();
    }

    private loadData(): void {
        this.stateService.getStates().then(res => {
            this.stateData = res.data;
        }).catch(err => this.errorHandler(err));
        this.cityService.getCities().then(res => {
            this.cityData = res.data;
        }).catch(err => this.errorHandler(err));
    }

    reloadData() {
        this.loadData();
    }
}
