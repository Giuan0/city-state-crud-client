import {HttpErrorResponse} from '@angular/common/http';

export class BaseComponent {
    public errorMessage: string;

    protected errorHandler(error: HttpErrorResponse): void {
        if (error.status === 0) {
            this.errorMessage = 'Verifique sua conexão com a internet!';
        } else if (error.status === 404) {
            this.errorMessage = 'Estado não existe.';
        } else if (error.status === 409) {
            this.errorMessage = 'Estado já existe.';
        } else {
            this.errorMessage = 'Erro desconhecido =(';
        }
    }
}
