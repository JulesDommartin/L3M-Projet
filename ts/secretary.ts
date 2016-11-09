import { NgModule }                 from "@angular/core";
import { BrowserModule }            from "@angular/platform-browser";
import { platformBrowserDynamic }   from "@angular/platform-browser-dynamic";
//import { provide }                  from "@angular/core";

import { CabinetMedicalModule }     from "./cabinetMedicalModule";
import { ComposantApp }             from "./Components/ComposantApp";

@NgModule({
    imports     : [ BrowserModule, CabinetMedicalModule ],
    declarations: [],
    bootstrap   : [ ComposantApp ]
})
export class AppModule {}


platformBrowserDynamic().bootstrapModule(AppModule);

//enableProdMode();
