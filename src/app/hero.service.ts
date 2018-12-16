import {Injectable} from '@angular/core';
import {Hero} from './hero';
import {HEROES, MyHero} from './mock-heroes';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

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
        tap(_ => this.log(`fetched heroes:${_.length}個`)),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
    // return of([]);
  }


  /**
   * Like getHeroes(), getHero() has an asynchronous signature. It returns a mock hero as an Observable,
   * using the RxJS of() function.
   */

  /*getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }*/

  /**
   * Most web APIs support a get by id request in the form :baseURL/:id.
   * GET hero by id. Will 404 if id not found
   * */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`抓 hero id=${id} , ${JSON.stringify(_)}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  getMyHero(): Observable<Hero> {
    this.messageService.add('HeroService: fetched my hero');
    return of(MyHero);
  }

  /**
   * 1.The overall structure of the updateHero() method is similar to that of getHeroes(),
   *   but it uses http.put() to persist the changed hero on the server.
   * 2.The URL is unchanged. The heroes web API knows which hero to update by looking at the hero's id.
   * 3.The heroes web API expects a special header in HTTP save requests.
   *   That header is in the httpOptions constant defined in the HeroService.
   */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`更正 hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * POST: add a new hero to the server
   * HeroService.addHero() differs from updateHero in two ways.
   * 1.it calls HttpClient.post() instead of put().
   * 2.it expects the server to generates an id for the new hero,
   *   which it returns in the Observable<Hero> to the caller.
   *
   */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((h: Hero) => this.log(`新增 hero w/ id=${h.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /**
   * DELETE: delete the hero from the server
   * 1. it calls HttpClient.delete.
   * 2. the URL is the heroes resource URL plus the id of the hero to delete
   * 3. you don't send data as you did with put and post.
   * 4. you still send the httpOptions.
   * 5.小心 傳回是個null object todo 22222 應該是 http.delete 影響的
   */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url,httpOptions).pipe(
      tap(_ => this.log(`刪掉 hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
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
    this.messageService.add(`HeroService => ${msg}`);
  }
}
