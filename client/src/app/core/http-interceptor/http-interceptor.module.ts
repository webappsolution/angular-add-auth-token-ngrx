import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AddTokenHeaderHttpRequestInterceptor } from "./add-token-header.http-request-interceptor";

const PROVIDERS = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AddTokenHeaderHttpRequestInterceptor,
        multi: true
    }
];

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: PROVIDERS
})
export class HttpInterceptorModule {
}
