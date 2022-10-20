import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Hero } from '../models/hero.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  
  private heroesUrl = `${environment.baseUrl}/heroes`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  // GET - no caminho: /heroes
  getAll(): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(this.heroesUrl)
      .pipe(tap((heroes) => this.log(`Buscou ${heroes.length} herói(es)`)));
  }

  // GET - no caminho: /heroes/id
  getOne(id: number): Observable<Hero> {
    return this.http
      .get<Hero>(this.getUrl(id))
      .pipe(tap((hero) => this.log(`Buscou ${this.descAttributes(hero)}`)));
  }

  // Input pesquisar
  // GET - no caminho: /heroes?name=term
  search(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http
      .get<Hero[]>(`${this.heroesUrl}?name=${term}`)
      .pipe(
        tap((heroes) =>
          heroes.length
            ? this.log(`Encontrou ${heroes.length} herói(es) como "${term}"`)
            : this.log(`nenhum herói encontrado "${term}"`)
        )
      );
  }

  // POST - no caminho: /heroes
  create(hero: Hero): Observable<Hero> {
    return this.http
      .post<Hero>(this.heroesUrl, hero)
      .pipe(tap((hero) => this.log(`criado ${this.descAttributes(hero)}`)));
  }

  // PUT - no caminho: /heroes/id
  update(hero: Hero): Observable<Hero> {
    return this.http
      .put<Hero>(this.getUrl(hero.id), hero)
      .pipe(tap((hero) => this.log(`alterado ${this.descAttributes(hero)}`)));
  }

  // DELETE - no caminho: /heroes/id
  delete(hero: Hero): Observable<any> {
    return this.http
      .delete<any>(this.getUrl(hero.id))
      .pipe(tap(() => this.log(`deletado ${this.descAttributes(hero)}`)));
  }

  private descAttributes(hero: Hero): string {
    return `Herói ID=${hero.id} e Nome=${hero.name}`;
  }

  // Chama o serviço de mensagem
  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  // Aqui foi geredo o getUrl para facilidar e diminuir as linhas de codigos nas requisições HTTP  
  private getUrl(id: number): string {
    return `${this.heroesUrl}/${id}`;
  }
}
