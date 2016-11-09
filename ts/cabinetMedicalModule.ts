import { NgModule }                 from "@angular/core";
import { CommonModule }             from "@angular/common";
import { FormsModule  }             from "@angular/forms";
import { DragDropModule }           from "./DragDrop/DragDropModule";
import { HttpModule }               from "@angular/http";

import { ComposantApp }             from "./Components/ComposantApp";
import { ComposantSecretaire }      from "./Components/ComposantSecretaire";
import { ComposantPatient }         from "./Components/ComposantPatient";
import { ComposantOnlyPatient }     from "./Components/ComposantOnlyPatient";
import { ComposantInfirmier }       from "./Components/ComposantInfirmier";
import { ComposantMaps }            from "./Components/ComposantMaps";
import { ComposantAddPatient }      from "./Components/ComposantAddPatient";

import { ServiceCabinetMedical }    from "@Services/cabinetMedicalService";

import { AppRoutingModule }         from "./Modules/routing.module";
//import { SecretaryRoutingModule }   from "./Modules/routing.secretary.module";
//import { PatientsRoutingModule }    from "./Modules/routing.patients.module";

import { AgmCoreModule }            from "angular2-google-maps/core";

@NgModule({
    imports     : [
        CommonModule,
        FormsModule,
        DragDropModule,
        HttpModule,
        AppRoutingModule,
        //PatientsRoutingModule,
        //SecretaryRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyCsJZjpW-blWWGv7DlYQSe3O9NEftzpan4"
        })
    ],
    exports     : [ AppRoutingModule ],
    declarations: [
        ComposantApp,
        ComposantSecretaire,
        ComposantPatient,
        ComposantOnlyPatient,
        ComposantInfirmier,
        ComposantMaps,
        ComposantAddPatient
    ],
    providers   : [ ServiceCabinetMedical ],

})
export class CabinetMedicalModule { }
