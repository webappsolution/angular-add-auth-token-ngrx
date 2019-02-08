import { NgModule } from "@angular/core";
import {
    RouterModule,
    Routes
} from "@angular/router";
import { RegisterContainer } from "./register.container";

const routes: Routes = [
    {
        path: "",
        component: RegisterContainer
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class RegisterRoutingModule {
}
