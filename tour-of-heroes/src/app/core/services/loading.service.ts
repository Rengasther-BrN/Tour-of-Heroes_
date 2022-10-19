import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  // BehaviorSubject - é um observable mais evoluido, já pode passar um valor no caso um boolean=false
  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  // Ocultar
  hide(): void {
    this.loadingSubject.next(false);
  }

  // Mostrar
  show(): void {
    this.loadingSubject.next(true);
  }
}
