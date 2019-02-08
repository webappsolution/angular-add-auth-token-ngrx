import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { BeerListComponent } from "./beer-list.component";
import { BeerListContainer } from "./beer-list.container";
import { BeerRoutingModule } from "./beer-routing.module";

const MODULES = [
    SharedModule,
    BeerRoutingModule
];

const COMPONENTS: any = [
    BeerListComponent,
    BeerListContainer
];

@NgModule({
    imports: MODULES,
    exports: COMPONENTS,
    declarations: COMPONENTS
})
export class BeerModule {
}
