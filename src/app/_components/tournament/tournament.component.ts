import {Component} from '@angular/core';
import {TournamentService} from '../../_services/tournament.service';
import {LoginService} from '../../_services/login.service';
import {User} from '../../_models/User';
import {GridApi} from 'ag-grid-community';
import {DateRendererComponent} from '../dateRenderer/dateRenderer.component';
import {CashprizeRendererComponent} from '../cashprizeRenderer/cashprizeRenderer.component';
import {SponsorRendererComponent} from '../sponsorRenderer/sponsorRenderer.component';
import {Router} from '@angular/router';
import {MatchService} from '../../_services/match.service';

@Component({
    templateUrl: './tournament.component.html',
    styleUrls: ['./tournament.component.scss']
})

export class TournamentComponent {
    user: User;
    rowData: any;
    tournamentGridApi: GridApi;
    matchGridApi: GridApi;

    constructor(private tournamentService: TournamentService, private matchService: MatchService, private loginService: LoginService, private router: Router) {
        this.user = loginService.currentUserValue;

        tournamentService.getAllTournamentForGrid().subscribe(allTournament => {
            this.tournamentGridApi.setRowData(allTournament);
            this.tournamentGridApi.sizeColumnsToFit();
        });

        matchService.getAllMatchStartedForGrid().subscribe(data => {
            this.matchGridApi.setRowData(data);
            this.matchGridApi.sizeColumnsToFit();
        });
    }

    columnTournamentDefs = [
        {headerName: 'Nom', field: 'name', sortable: true, filter: true, resizable: true},
        {
            headerName: 'Récompense',
            field: 'cashprize',
            sortable: true,
            filter: true,
            resizable: true,
            cellRendererFramework: CashprizeRendererComponent
        },
        {
            headerName: 'Sponsor',
            field: 'sponsor',
            sortable: true,
            filter: true,
            resizable: true,
            cellRendererFramework: SponsorRendererComponent
        },
        {
            headerName: 'Date début',
            field: 'startinghour',
            sortable: true,
            filter: true,
            resizable: true,
            cellRendererFramework: DateRendererComponent
        }
    ];

    tournamentGridOptions = {
        columnDefs: this.columnTournamentDefs,
        domLayout: 'autoHeight',
        pagination: true,
        paginationPageSize: 5
    };

    onTournamentGridReady(params) {
        this.tournamentGridApi = params.api;
    }

    onTournamentRowClicked(params) {
        this.router.navigate(['/bracket', { 'tournamentId': params.data.id}]);
    }

    columnMatchDefs = [
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
        },
        {
            headerName: 'Score',
            field: 'score',
            sortable: true,
            filter: true,
            resizable: true
        }
    ];

    matchGridOptions = {
        columnDefs: this.columnMatchDefs,
        domLayout: 'autoHeight',
        pagination: true,
        paginationPageSize: 5
    };

    onMatchGridReady(params) {
        this.matchGridApi = params.api;
    }

    onMatchRowClicked(params) {
        this.router.navigate(['/match', { 'matchId': params.data.id}]);
    }
}
