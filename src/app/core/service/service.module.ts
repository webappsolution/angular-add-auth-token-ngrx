import { NgModule } from "@angular/core";
import { ApiEndpointService } from "./api-endpoint.service";
import { BeerService } from "./beer.service";

const PROVIDERS = [
    ApiEndpointService,
    BeerService
];

@NgModule({
    providers: PROVIDERS
})
export class ServiceModule {
}
