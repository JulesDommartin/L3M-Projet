import { NgModule }     from "@angular/core";
import { RouterModule } from "@angular/router";
import {ComposantSecretaire} from "../Components/ComposantSecretaire";
import {ComposantOnlyPatient} from "../Components/ComposantOnlyPatient";

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
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
