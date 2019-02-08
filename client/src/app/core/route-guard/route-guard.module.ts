import { NgModule } from "@angular/core";
import { AuthRouteGuard } from "./auth.route-guard";

const PROVIDERS = [
    AuthRouteGuard
];

@NgModule({
    providers: PROVIDERS
})
export class RouteGuardModule {
}
