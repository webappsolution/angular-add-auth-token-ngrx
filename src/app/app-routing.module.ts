import { APP_BASE_HREF } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { appRoutePaths } from "./app.routes";
import { LoginComponent } from "./auth/login/login.component";
// import { AuthGuard } from "./core/service/auth-guard.service";

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
    // loadChildren: "./auth/login/login.module#LoginModule",
    component: LoginComponent
  },
  // {
  //   path: appRoutePaths.signup,
  //   loadChildren: ""
  // },

  //////////////////////////////////////////////////
  // Protected Routes
  //////////////////////////////////////////////////
  {
    path: appRoutePaths.beer,
    loadChildren: "./beer/beer.module#BeerModule",
    // canActivate: [AuthGuard]
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
  exports: [RouterModule],
  providers: PROVIDERS
})
export class AppRoutingModule {}
