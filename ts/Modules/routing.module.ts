import { NgModule }     from "@angular/core";
import { RouterModule } from "@angular/router";
import {ComposantSecretaire} from "../Components/ComposantSecretaire";
import {ComposantOnlyPatient} from "../Components/ComposantOnlyPatient";
import {ComposantAddPatient} from "../Components/ComposantAddPatient";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: "",
                redirectTo: "/secretaire",
                pathMatch: "full"
            },
            {
                path: "secretaire",
                component: ComposantSecretaire
            },
            {
                path: "patient/:numero",
                component: ComposantOnlyPatient
            },
            {
                path: "addPatient",
                component: ComposantAddPatient
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
