import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
//import {HEROES} from "../mock-heroes";
import {HeroService} from "../hero.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  //heroes = HEROES;
  heroes: Hero[];

  //Add a private heroService parameter of type HeroService to the constructor.
  constructor(private heroService: HeroService) {
  }

  ngOnInit() {
    this.getHeroes();
  }

  selectedHero: Hero;

  //selectedHero  = HEROES[0]

  onSelect(hero: Hero): void {
    console.log(hero);
    this.selectedHero = hero;
  }

  getHeroes(): void {
    //this.heroes = this.heroService.getHeroes(); // ==>  service / getHeroes():Hero[]{ return HEROES;}
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes); // ==>  service / getHeroes():Observable<Hero[]>{return of(HEROES);}
  }

}
