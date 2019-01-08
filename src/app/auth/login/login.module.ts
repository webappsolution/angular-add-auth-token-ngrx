import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { LoginComponent } from "./login.component";

const MODULES = [
    SharedModule
];

const COMPONENTS: any = [
    LoginComponent,
];

@NgModule({
    imports: MODULES,
    exports: COMPONENTS,
    declarations: COMPONENTS
})
export class LoginModule {}
