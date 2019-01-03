import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { BeerListComponent } from "./beer-list.component";
import { BeerListContainer } from "./beer-list.container";

const MODULES = [
    SharedModule
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
export class BeerModule {}
