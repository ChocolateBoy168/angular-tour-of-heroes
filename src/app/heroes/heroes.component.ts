import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
// import {HEROES} from "../mock-heroes";
import {HeroService} from '../hero.service';

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

  //selectedHero: Hero;

  ngOnInit() {
    this.getHeroes();
    this.heroService.getMyHero().subscribe(
      h => this.myHero = h
    )
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

}
