import { NgModule }     from "@angular/core";
import { RouterModule } from "@angular/router";

import {ComposantPatient} from "../Components/ComposantPatient";


@NgModule({
    imports: [
        RouterModule.forChild([
            { path: "patient/:numero",  component: ComposantPatient },
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class PatientsRoutingModule {}
