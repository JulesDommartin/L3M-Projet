import { NgModule }     from "@angular/core";
import { RouterModule } from "@angular/router";
import { ComposantSecretaire } from "../Components/ComposantSecretaire";

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: "secretaire",  component: ComposantSecretaire },
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class SecretaryRoutingModule {}
