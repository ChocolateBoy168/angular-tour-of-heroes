import {Injectable} from '@angular/core';
import {Hero} from './hero';
import {HEROES, MyHero} from './mock-heroes';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient} from '@angular/common/http';

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

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl);
    //return of([]);
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

  /** Log a HeroService message with the MessageService */
  private log(msg: string) {
    this.messageService.add(`HeroService: ${msg}`);
  }
}
