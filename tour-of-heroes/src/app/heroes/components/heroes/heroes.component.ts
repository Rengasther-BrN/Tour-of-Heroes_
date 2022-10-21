import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../core/components/confirmation-dialog/confirmation-dialog.component';
import { DialogData } from '../../../core/models/dialog-data.model';
import { Hero } from '../../../core/models/hero.model';
import { HeroService } from '../../../core/services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  heroes: Hero[] = [];

  constructor(private dialog: MatDialog, private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getAll().subscribe((heroes) => (this.heroes = heroes),
    err => (console.log(err))
  )}

  delete(hero: Hero): void {
    const dialogData: DialogData = {
      cancelText: 'Cancelar',
      confirmText: 'Deletar',
      content: `Deletar '${hero.name}'?`,
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData,
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.heroService.delete(hero).subscribe(() => 
          // this.heroes = this.heroes.filter((h) => h !== hero )  - nesse metódo nao há requisição para API
          this.getHeroes()
        );
      }
    });
  }

  onSelected(hero: Hero): void {
    this.delete(hero);
  }
}
