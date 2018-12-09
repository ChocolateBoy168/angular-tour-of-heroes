/* AppModule decorators*/
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core'; // <-- critical metadata
import {FormsModule} from '@angular/forms'; // <-- NgModel lives here

import {AppComponent} from './app.component';
import {HeroesComponent} from './heroes/heroes.component';

/*The most important @NgModule decorator annotates the top-level AppModule class.*/
@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
