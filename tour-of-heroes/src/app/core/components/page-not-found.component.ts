import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <mat-card>
      <mat-card-title>404: Page Not Found</mat-card-title>

      <mat-card-content>
        Não conseguimos encontrar essa página! 
      </mat-card-content>

      <mat-card-actions>
        
        <button mat-raised-button color="primary" routerLink="/">
          Voltar para o Início
        </button>

      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
      :host {       
        text-align: center;
      }
    `,
  ],
})
export class PageNotFoundComponent {}
