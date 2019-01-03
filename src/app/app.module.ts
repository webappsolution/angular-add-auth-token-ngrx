import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BeerModule } from "./beer/beer.module";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";

const MODULES = [
  BrowserModule,
  AppRoutingModule,
  CoreModule,
  SharedModule,
  BeerModule
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
