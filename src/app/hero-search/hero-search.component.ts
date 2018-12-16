import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Hero} from "../hero";
import {HeroService} from "../hero.service";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  private heroes$: Observable<Hero[]>;//Notice the declaration of heroes$ as an Observable
  private searchTerms = new Subject<string>();//The searchTerms property is declared as an RxJS Subject.

  constructor(private heroService: HeroService) {
  }

  // Push a search term into the observable stream.
  /**
   * 1. A Subject is both a source of observable values and an Observable itself.
   *    You can subscribe to a Subject as you would any Observable.
   * 2. You can also push values into that Observable by calling its next(value) method as the search() method does.
   */
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {

    /**
     * 1.Chaining RxJS operators
     * 2.Every time the user types in the textbox, the binding calls search() with the textbox value, a "search term".
     *   The searchTerms becomes an Observable emitting a steady stream of search terms.
     * 3.
     *
     */
    this.heroes$ = this.searchTerms.pipe(
      /**
       *1.wait 300ms after each keystroke before considering the term
       *2.debounceTime(300) waits until the flow of new string events pauses for 300 milliseconds
       *  before passing along the latest string. You'll never make requests more frequently than 300ms.
       */
      debounceTime(300),

      /**
       * 1.ignore new term if same as previous term
       * 2.distinctUntilChanged() ensures that a request is sent only if the filter text changed.
       */
      distinctUntilChanged(),

      /**
       * 1.switch to new search observable each time the term changes
       * 2.switchMap() calls the search service for each search term that makes it through debounce and distinctUntilChanged.
       *   It cancels and discards previous search observables, returning only the latest search service observable.
       */
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }

}
