import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BaseComponent} from '../base.component';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {City} from '../../models/city.model';
import {CityService} from '../../services/city.service';

@Component({
    selector: 'app-city-table',
    templateUrl: './city-table.component.html',
    styleUrls: ['./city-table.component.css']
})
export class CityTableComponent extends BaseComponent implements OnInit, AfterViewInit {

    @Input() set cityData(cityData: City[]) {
        this.dataSource.data = cityData;
    }
    @Output() removeItemEvent = new EventEmitter<string>();
    @Output() putItemEvent = new EventEmitter<City>();

    private dataSource = new MatTableDataSource<City>();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns: string[] = ['name', 'state', 'creation-date', 'last-updated', 'actions'];

    constructor(private cityService: CityService) {
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

    private removeCity(cityId: string): void {
        this.cityService.deleteCity(cityId)
            .then(res => {
                this.removeItemEvent.emit();
            }).catch(err => this.errorHandler(err));
    }

    private putCity(city: City): void {
        this.putItemEvent.emit(city);
    }
}
