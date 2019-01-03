import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { BeerListComponent } from "./beer-list.component";

const MODULES = [
    SharedModule
];

const COMPONENTS: any = [
    BeerListComponent
];

@NgModule({
    imports: MODULES,
    exports: COMPONENTS,
    declarations: COMPONENTS
})
export class BeerModule {}
