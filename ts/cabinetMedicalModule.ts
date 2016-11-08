import { NgModule }                 from "@angular/core";
import { CommonModule }             from "@angular/common";
import { FormsModule  }             from "@angular/forms";
import { DragDropModule }           from "./DragDrop/DragDropModule";
import { HttpModule }               from "@angular/http";

import { ComposantSecretaire }      from "./Components/ComposantSecretaire";
import { ComposantPatient }         from "./Components/ComposantPatient";
import { ComposantInfirmier }       from "./Components/ComposantInfirmier";
import { ServiceCabinetMedical }    from "@Services/cabinetMedicalService";
import { ComposantMaps }            from "./Components/ComposantMaps";
import { AppRoutingModule }         from "./Modules/routing.module";
import { SecretaryRoutingModule }   from "./Modules/routing.secretary.module";

import { AgmCoreModule }            from "angular2-google-maps/core";

@NgModule({
    imports     : [ CommonModule, FormsModule, DragDropModule, HttpModule, AppRoutingModule, SecretaryRoutingModule, AgmCoreModule.forRoot({
        apiKey: "AIzaSyCsJZjpW-blWWGv7DlYQSe3O9NEftzpan4"
    }) ],
    exports     : [ ComposantSecretaire ],
    declarations: [ ComposantSecretaire, ComposantPatient, ComposantInfirmier, ComposantMaps ],
    providers   : [ ServiceCabinetMedical ],

})
export class CabinetMedicalModule { }
