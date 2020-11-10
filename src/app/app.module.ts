import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatTableModule} from '@angular/material/table';
import {StateService} from './services/state.service';
import {HttpClientModule} from '@angular/common/http';
import {MatTooltipModule} from '@angular/material/tooltip';
import {StateTableComponent} from './components/state-table/state-table.component';
import {StateFormComponent} from './components/state-form/state-form.component';
import {MatPaginatorModule, MatSelectModule} from '@angular/material';
import { CityFormComponent } from './components/city-form/city-form.component';
import { CityTableComponent } from './components/city-table/city-table.component';
import {CityService} from './services/city.service';

@NgModule({
    declarations: [
        AppComponent,
        StateTableComponent,
        StateFormComponent,
        CityFormComponent,
        CityTableComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatSliderModule,
        MatTableModule,
        HttpClientModule,
        FormsModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatTooltipModule,
        MatTabsModule,
        MatPaginatorModule,
        MatSelectModule
    ],
    providers: [
        StateService,
        CityService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
