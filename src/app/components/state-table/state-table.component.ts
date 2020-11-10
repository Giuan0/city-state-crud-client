import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {State} from '../../models/state.model';
import {StateService} from '../../services/state.service';
import {BaseComponent} from '../base.component';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
    selector: 'app-state-table',
    templateUrl: './state-table.component.html',
    styleUrls: ['./state-table.component.css']
})
export class StateTableComponent extends BaseComponent implements OnInit, AfterViewInit {

    @Input() set stateData(stateData: State[]) {
        this.dataSource.data = stateData;
    }
    @Output() removeItemEvent = new EventEmitter<string>();
    @Output() putItemEvent = new EventEmitter<State>();

    private dataSource = new MatTableDataSource<State>();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns: string[] = ['name', 'abbreviation', 'creation-date', 'last-updated', 'actions'];

    constructor(private stateService: StateService) {
        super();
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    private removeState(stateId: string): void {
        this.stateService.deleteStates(stateId)
            .then(res => {
                this.removeItemEvent.emit();
            }).catch(err => this.errorHandler(err));
    }

    private putState(state: State): void {
        this.putItemEvent.emit(state);
    }
}
