import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

import {Hero} from '../hero';
import {HeroService} from "../hero.service";


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.getHero()
  }

  getHero(): void {
    /**
     * 1.The JavaScript (+) operator converts the string to a number, which is what a hero id should be.
     * 2.The route.snapshot is a static image of the route information shortly after the component was created
     * 3.The paramMap is a dictionary of route parameter values extracted from the URL.
     *   The "id" key returns the id of the hero to fetch.
     *
     */
    const id = +this.route.snapshot.paramMap.get('id');
    //switch ("with404") {
    switch ("no404") {
    //switch ("no404_2") {
      case "with404":
        this.heroService.getHero(id).subscribe(
          hero => this.hero = hero
        )
        break;
      case "no404":
        this.heroService.getHeroNo404(id).subscribe(
          hero => this.hero = hero
        )
        break;
    }

  }

  /**
   * By clicking the browser's back button, you can go back to the hero list or dashboard view,
   * depending upon which sent you to the detail view
   */
  goBack() {
    this.location.back();
  }

  save():void{
    this.heroService.updateHero(this.hero).subscribe(
      () => this.goBack()
    )
  }
}
