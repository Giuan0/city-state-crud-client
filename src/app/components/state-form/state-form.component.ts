import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StateService} from '../../services/state.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {State} from '../../models/state.model';
import {BaseComponent} from '../base.component';

@Component({
    selector: 'app-state-form',
    templateUrl: './state-form.component.html',
    styleUrls: ['./state-form.component.scss']
})
export class StateFormComponent extends BaseComponent implements OnInit {

    @Output() newItemEvent = new EventEmitter<string>();
    private stateForm: FormGroup;
    private isEditMode = false;
    private stateToPut: State;

    constructor(private stateService: StateService, private formBuilder: FormBuilder) {
        super();
    }

    ngOnInit() {
        this.stateForm = this.formBuilder.group({
            name: new FormControl('',
                [
                    Validators.required,
                    Validators.minLength(3)]),
            abbreviation: new FormControl('',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(2)])
        });
    }

    onSubmit(state: State): void {
        this.resetErrorMessage();
        if (this.isEditMode) {
            this.putState(this.stateToPut._id, state);
        } else {
            this.postState(state);
        }
    }

    onCancel(): void {
        this.resetErrorMessage();
        this.isEditMode = false;
        this.stateToPut = null;
    }

    putStateMode(state: State): void {
        this.isEditMode = true;
        this.stateToPut = state;
        this.stateForm.reset(state);
    }

    private postState(state: State): void {
        this.stateService.postState(state).then(res => {
            this.stateForm.reset();
            this.newItemEvent.emit();
            this.isEditMode = false;
        }).catch(err => this.errorHandler(err));
    }

    private putState(stateId: string, newState: State): void {
        this.stateService.putState(stateId, newState).then(res => {
            this.stateForm.reset();
            this.newItemEvent.emit();
            this.isEditMode = false;
            this.stateToPut = null;
        }).catch(err => this.errorHandler(err));
    }

    private resetErrorMessage(): void {
        this.errorMessage = undefined;
    }
}
