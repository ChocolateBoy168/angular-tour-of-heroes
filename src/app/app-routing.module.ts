import {NgModule} from '@angular/core';

// import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HeroesComponent} from './heroes/heroes.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';

const rotes: Routes = [{
  // Add a default route , This route redirects a URL that fully matches the empty path to the route whose path is '/dashboard'.
  path: '', redirectTo: '/dashboard', pathMatch: 'full'
}, {
  path: 'heroes', component: HeroesComponent
}, {
  path: 'dashboard', component: DashboardComponent
}, {
  // The colon (:) in the path indicates that :id is a placeholder for a specific hero id.
  path: 'detail/:id', component: HeroDetailComponent
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
