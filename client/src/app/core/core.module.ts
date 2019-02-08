import { HttpClientModule } from "@angular/common/http";
import {
    NgModule,
    Optional,
    SkipSelf
} from "@angular/core";
import { HttpInterceptorModule } from "./http-interceptor/http-interceptor.module";
import { RouteGuardModule } from "./route-guard/route-guard.module";
import { ServiceModule } from "./service/service.module";
import { StateModule } from "./state/state.module";

const MODULES = [
    HttpClientModule,
    HttpInterceptorModule,
    RouteGuardModule,
    ServiceModule,
    StateModule
];
const PROVIDERS = [];

@NgModule({
    imports: MODULES,
    exports: MODULES,
    providers: PROVIDERS
})
export class CoreModule {
    constructor(
        @Optional()
        @SkipSelf()
            parentModule: CoreModule
    ) {
        if (parentModule) {
            throw new Error("CoreModule is already loaded. Import only once in main AppModule.");
        }
    }
}
