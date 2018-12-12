import {NgModule} from '@angular/core';

// import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HeroesComponent} from './heroes/heroes.component';

const rotes: Routes = [{
  path: 'heroes', component: HeroesComponent
}];

@NgModule({
  // declarations: [],
  imports: [
    // CommonModule

    /**
     * You first must initialize the router and start it listening for browser location changes.
     */
    RouterModule.forRoot(rotes)
  ],
  /**
   * Add an @NgModule.exports array with RouterModule in it.
   * Exporting RouterModule makes router directives available for use in the AppModule components that will need them.
   */
  exports: [
    RouterModule
  ]

})
export class AppRoutingModule {
}
