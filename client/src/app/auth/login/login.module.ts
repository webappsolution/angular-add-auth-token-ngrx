import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { LoginContainer } from "./login.container";

const MODULES = [
    SharedModule,
    LoginRoutingModule
];

const COMPONENTS: any = [
    LoginContainer,
    LoginComponent
];

@NgModule({
    imports: MODULES,
    exports: COMPONENTS,
    declarations: COMPONENTS
})
export class LoginModule {
}
