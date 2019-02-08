import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { RegisterRoutingModule } from "./register-routing.module";
import { RegisterComponent } from "./register.component";
import { RegisterContainer } from "./register.container";

const MODULES = [
    SharedModule,
    RegisterRoutingModule
];

const COMPONENTS: any = [
    RegisterContainer,
    RegisterComponent
];

@NgModule({
    imports: MODULES,
    exports: COMPONENTS,
    declarations: COMPONENTS
})
export class RegisterModule {
}
