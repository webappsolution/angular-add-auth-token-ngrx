import { NgModule } from "@angular/core";
import {
    RouterModule,
    Routes
} from "@angular/router";
import { LoginContainer } from "./login.container";

const routes: Routes = [
    {
        path: "",
        component: LoginContainer
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class LoginRoutingModule {
}
