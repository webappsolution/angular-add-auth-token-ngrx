import { APP_BASE_HREF } from "@angular/common";
import { NgModule } from "@angular/core";
import {
    RouterModule,
    Routes
} from "@angular/router";
import { appRoutePaths } from "./app.routes";

const PROVIDERS = [
    {
        provide: APP_BASE_HREF,
        useValue: "/"
    }
];

const routes: Routes = [
    //////////////////////////////////////////////////
    // Unprotected Routes
    //////////////////////////////////////////////////
    {
        path: appRoutePaths.login,
        loadChildren: "./auth/login/login.module#LoginModule"
    },
    {
        path: appRoutePaths.register,
        loadChildren: "./auth/register/register.module#RegisterModule"
    },

    //////////////////////////////////////////////////
    // Protected Routes
    //////////////////////////////////////////////////
    {
        path: appRoutePaths.beer,
        loadChildren: "./beer/beer.module#BeerModule",
        // TODO: BMR: 01/15/2019: We'll add an AuthGuard in a future post, but leaving this here as a placeholder.
        // canActivate: [TBD]
    },

    //////////////////////////////////////////////////
    // Redirects
    //////////////////////////////////////////////////
    {
        path: "**",
        pathMatch: "full",
        redirectTo: appRoutePaths.beer
    }
];

@NgModule({
    imports: [
        /**
         * Configure the router for the application.
         *
         * NOTE: Use `enableTracing: true` to see Angular built-in router logging.
         */
        RouterModule.forRoot(routes, { useHash: false, enableTracing: false })
    ],
    exports: [ RouterModule ],
    providers: PROVIDERS
})
export class AppRoutingModule {
}
