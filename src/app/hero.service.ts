import {Injectable} from '@angular/core';
import {Hero} from './hero';
import {HEROES, MyHero} from './mock-heroes';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes'; // URL to web api

  /**
   * This is a typical "service-in-service" scenario: you inject the MessageService into the HeroService
   * which is injected into the HeroesComponent
   */
  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  /*getHeroes():Hero[]{
    return HEROES;
  }*/

  /*getHeroes(): Observable<Hero[]> {
    // of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }*/

  /** GET heroes from the server
   * This particular HttpClient.get call returns an Observable<Hero[]>,
   * literally "an observable of hero arrays".
   * In practice, it will only return a single hero array.
   */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log(`fetched heroes:${_}`)),
        catchError(this.handleError('getHeroes', []))
      );
    // return of([]);
  }


  /**
   * Like getHeroes(), getHero() has an asynchronous signature. It returns a mock hero as an Observable,
   * using the RxJS of() function.
   */
  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  getMyHero(): Observable<Hero> {
    this.messageService.add('HeroService: fetched my hero');
    return of(MyHero);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   *
   * Because each service method returns a different kind of Observable result,
   * handleError() takes a type parameter
   * so it can return the safe value as the type that the app expects.
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }


  /** Log a HeroService message with the MessageService */
  private log(msg: string) {
    this.messageService.add(`HeroService: ${msg}`);
  }
}
