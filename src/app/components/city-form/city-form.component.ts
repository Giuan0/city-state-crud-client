import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {City} from '../../models/city.model';
import {CityService} from '../../services/city.service';
import {BaseComponent} from '../base.component';
import {State} from '../../models/state.model';
import {CityPutPostRequest} from '../../models/city-put-request.model';

@Component({
    selector: 'app-city-form',
    templateUrl: './city-form.component.html',
    styleUrls: ['./city-form.component.css']
})
export class CityFormComponent extends BaseComponent implements OnInit {

    @Output() newItemEvent = new EventEmitter<string>();
    @Input() set stateData(stateData: State[]) {
        this.rawStateData = stateData;
        this.availableStates = stateData.map(state => state.abbreviation);
    }

    availableStates: string[];
    private rawStateData: State[];
    private cityForm: FormGroup;
    private isEditMode = false;
    private cityToPut: City;

    constructor(private cityService: CityService, private formBuilder: FormBuilder) {
        super();
    }

    ngOnInit() {
        this.cityForm = this.formBuilder.group({
            name: new FormControl('',
                [
                    Validators.required,
                    Validators.minLength(3)]),
            state: new FormControl('',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(2)])
        });
    }

    onSubmit(city: CityPutPostRequest): void {
        city.state = this.rawStateData
            .find(state => state.abbreviation === city.state)
            ._id;

        this.resetErrorMessage();
        if (this.isEditMode) {
            this.putCity(this.cityToPut._id, city);
        } else {
            this.postCity(city);
        }
    }

    onCancel(): void {
        this.resetErrorMessage();
        this.isEditMode = false;
        this.cityToPut = null;
    }

    putCityMode(city: City): void {
        console.log(city);
        this.isEditMode = true;
        this.cityToPut = city;
        this.cityForm.reset({
            name: city.name,
            state: city.state.abbreviation
        });
    }

    private postCity(city: CityPutPostRequest): void {
        this.cityService.postCity(city).then(res => {
            this.cityForm.reset();
            this.newItemEvent.emit();
            this.isEditMode = false;
        }).catch(err => this.errorHandler(err));
    }

    private putCity(cityId: string, newCity: CityPutPostRequest): void {
        this.cityService.putCity(cityId, newCity).then(res => {
            this.cityForm.reset();
            this.newItemEvent.emit();
            this.isEditMode = false;
            this.cityToPut = null;
        }).catch(err => this.errorHandler(err));
    }

    private resetErrorMessage(): void {
        this.errorMessage = undefined;
    }

}
