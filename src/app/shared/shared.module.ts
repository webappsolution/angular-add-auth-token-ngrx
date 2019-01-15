import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {
    FormsModule,
    ReactiveFormsModule
} from "@angular/forms";
import { MaterialModule } from "./material/material.module";

const MODULES = [
    // Angular Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // 3rd Party Modules
    // MomentModule,

    // Application Shared Feature Modules
    MaterialModule
];

@NgModule({
    imports: MODULES,
    exports: MODULES,
    declarations: []
})
export class SharedModule {
}
