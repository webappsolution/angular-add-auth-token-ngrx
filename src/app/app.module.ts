import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginModule } from "./auth/login/login.module";
import { BeerModule } from "./beer/beer.module";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";

const MODULES = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  CoreModule,
  SharedModule,
  // LoginModule,
  // BeerModule
];

const COMPONENTS = [
  AppComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: MODULES,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
