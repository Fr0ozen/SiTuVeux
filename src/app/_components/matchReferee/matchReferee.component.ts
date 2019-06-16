import {Component, TemplateRef, ViewChild} from '@angular/core';
import {LoginService} from '../../_services/login.service';
import {User} from '../../_models/User';
import {GridApi} from 'ag-grid-community';
import {MatchService} from '../../_services/match.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
    templateUrl: './matchReferee.component.html',
    styleUrls: ['./matchReferee.component.scss']
})

export class MatchRefereeComponent {
    @ViewChild('content')
    private modalTemplate : TemplateRef<any>

    user: User;
    rowData: any;
    gridApi: GridApi;
    selectedTeam: string;
    selectedMatchId: number;

    constructor(private loginService: LoginService, private matchService: MatchService, private modalService: NgbModal,
                private router: Router) {
        this.user = loginService.currentUserValue;

        matchService.getAllMatchRefereeForGrid(this.user).subscribe(data => {
            this.gridApi.setRowData(data);
            this.gridApi.sizeColumnsToFit();
        });
    }

    columnDefs = [
        {headerName: 'Nom', field: 'name', sortable: true, filter: true, resizable: true},
        {
            headerName: 'Phase',
            field: 'phase',
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: 'Carte',
            field: 'map',
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: 'Équipes',
            field: 'team',
            sortable: true,
            filter: true,
            resizable: true
        }
    ];

    gridOptions = {
        columnDefs: this.columnDefs,
        domLayout: 'autoHeight',
        pagination: true,
        paginationPageSize: 5
    };

    onGridReady(params) {
        this.gridApi = params.api;
    }

    onRowClicked(params) {
        this.selectedTeam = params.data.team;
        this.selectedMatchId = params.data.id;
        this.modalService.open(this.modalTemplate, { centered: true });
    }

    launchMatch() {
        this.matchService.startMatch(this.user, this.selectedMatchId).subscribe(data => {
            this.modalService.dismissAll();
            this.router.navigate(['/match', { 'matchId': this.selectedMatchId}]);
        });
    }
}
