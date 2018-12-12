import {Injectable} from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  /**
   * This is a typical "service-in-service" scenario: you inject the MessageService into the HeroService
   * which is injected into the HeroesComponent
   */
  constructor(private messageService: MessageService) {

  }

  /*getHeroes():Hero[]{
    return HEROES;
  }*/

  getHeroes(): Observable<Hero[]> {
    // of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
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
}
