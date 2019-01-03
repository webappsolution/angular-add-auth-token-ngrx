import { NgModule } from "@angular/core";
import { BeerService } from "./beer.service";

const PROVIDERS = [
    BeerService
];

@NgModule({
    providers: PROVIDERS
})
export class ServiceModule {}
