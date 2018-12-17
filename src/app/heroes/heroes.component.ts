import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
// import {HEROES} from "../mock-heroes";
import {HeroService} from '../hero.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // Add a private heroService parameter of type HeroService to the constructor.
  constructor(private heroService: HeroService) {
  }

  /*myHero: Hero = {
    id: 1,
    name: 'Windstorm'
  };*/

  myHero: Hero;

  // heroes = HEROES;
  heroes: Hero[];

  // selectedHero: Hero;

  ngOnInit() {
    this.getHeroes();
    this.heroService.getMyHero().subscribe(
      h => this.myHero = h
    );
  }

  // selectedHero  = HEROES[0]

  /*onSelect(hero: Hero): void {
    console.log(hero);
    this.selectedHero = hero;
  }*/

  getHeroes(): void {
    /**
     * getHeroes():Hero[]{ return HEROES;}
     * This will not work in a real app.
     * You're getting away with it now because the service currently returns mock heroes.
     * But soon the app will fetch heroes from a remote server, which is an inherently asynchronous operation.
     */
    // this.heroes = this.heroService.getHeroes();

    /**
     * getHeroes():Observable<Hero[]>{return of(HEROES);}
     * HeroService.getHeroes() must have an asynchronous signature of some kind.
     * It can take a callback. It could return a Promise. It could return an Observable.
     * HttpClient.get() returns an Observable.
     */
    this.heroService.getHeroes().subscribe(
      heroes => this.heroes = heroes
    );
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({name} as Hero).subscribe(h => {
      this.heroes.push(h);
    });
  }


  /**
   * 1. heroService.delete(). It must subscribe anyway.
   * 2. As a rule, an Observable does nothing until something subscribes!
   *
   */
  delete(hero: Hero): void {
    const me = this;
    switch ('ok_0') {
      case 'ok_0': // delete before subscribe
        me.heroes = me.heroes.filter(h2 => h2 !== hero);
        me.heroService.deleteHero(hero); // fail
        // me.heroService.deleteHero(hero).subscribe();//success
        break;
      case 'ok_1': // delete after subscribe
        me.heroService.deleteHero(hero).subscribe(h => {
          // me.heroes = me.heroes.filter(h2 => h2 !== h);//fail
          me.heroes = me.heroes.filter(h2 => h2 !== hero); // success
        });
        break;
    }


  }

}
