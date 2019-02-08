import { NgModule } from "@angular/core";
import {
    RouterModule,
    Routes
} from "@angular/router";
import { BeerListContainer } from "./beer-list.container";

const routes: Routes = [
    {
        path: "",
        component: BeerListContainer
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class BeerRoutingModule {
}
