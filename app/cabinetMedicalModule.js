System.register(["@angular/core", "@angular/common", "@angular/forms", "./DragDrop/DragDropModule", "@angular/http", "./Components/ComposantSecretaire", "./Components/ComposantPatient", "./Components/ComposantInfirmier", "@Services/cabinetMedicalService", "./Components/ComposantMaps", "./Modules/routing.module", "./Modules/routing.secretary.module", "angular2-google-maps/core"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, forms_1, DragDropModule_1, http_1, ComposantSecretaire_1, ComposantPatient_1, ComposantInfirmier_1, cabinetMedicalService_1, ComposantMaps_1, routing_module_1, routing_secretary_module_1, core_2;
    var CabinetMedicalModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (DragDropModule_1_1) {
                DragDropModule_1 = DragDropModule_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (ComposantSecretaire_1_1) {
                ComposantSecretaire_1 = ComposantSecretaire_1_1;
            },
            function (ComposantPatient_1_1) {
                ComposantPatient_1 = ComposantPatient_1_1;
            },
            function (ComposantInfirmier_1_1) {
                ComposantInfirmier_1 = ComposantInfirmier_1_1;
            },
            function (cabinetMedicalService_1_1) {
                cabinetMedicalService_1 = cabinetMedicalService_1_1;
            },
            function (ComposantMaps_1_1) {
                ComposantMaps_1 = ComposantMaps_1_1;
            },
            function (routing_module_1_1) {
                routing_module_1 = routing_module_1_1;
            },
            function (routing_secretary_module_1_1) {
                routing_secretary_module_1 = routing_secretary_module_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            CabinetMedicalModule = class CabinetMedicalModule {
            };
            CabinetMedicalModule = __decorate([
                core_1.NgModule({
                    imports: [common_1.CommonModule, forms_1.FormsModule, DragDropModule_1.DragDropModule, http_1.HttpModule, routing_module_1.AppRoutingModule, routing_secretary_module_1.SecretaryRoutingModule, core_2.AgmCoreModule.forRoot({
                            apiKey: "AIzaSyCsJZjpW-blWWGv7DlYQSe3O9NEftzpan4"
                        })],
                    exports: [ComposantSecretaire_1.ComposantSecretaire],
                    declarations: [ComposantSecretaire_1.ComposantSecretaire, ComposantPatient_1.ComposantPatient, ComposantInfirmier_1.ComposantInfirmier, ComposantMaps_1.ComposantMaps],
                    providers: [cabinetMedicalService_1.ServiceCabinetMedical],
                }), 
                __metadata('design:paramtypes', [])
            ], CabinetMedicalModule);
            exports_1("CabinetMedicalModule", CabinetMedicalModule);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhYmluZXRNZWRpY2FsTW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBeUJBO1lBQW9DLENBQUM7WUFUckM7Z0JBQUMsZUFBUSxDQUFDO29CQUNOLE9BQU8sRUFBTyxDQUFFLHFCQUFZLEVBQUUsbUJBQVcsRUFBRSwrQkFBYyxFQUFFLGlCQUFVLEVBQUUsaUNBQWdCLEVBQUUsaURBQXNCLEVBQUUsb0JBQWEsQ0FBQyxPQUFPLENBQUM7NEJBQ25JLE1BQU0sRUFBRSx5Q0FBeUM7eUJBQ3BELENBQUMsQ0FBRTtvQkFDSixPQUFPLEVBQU8sQ0FBRSx5Q0FBbUIsQ0FBRTtvQkFDckMsWUFBWSxFQUFFLENBQUUseUNBQW1CLEVBQUUsbUNBQWdCLEVBQUUsdUNBQWtCLEVBQUUsNkJBQWEsQ0FBRTtvQkFDMUYsU0FBUyxFQUFLLENBQUUsNkNBQXFCLENBQUU7aUJBRTFDLENBQUM7O29DQUFBO1lBQ0YsdURBQXFDLENBQUEiLCJmaWxlIjoiY2FiaW5ldE1lZGljYWxNb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9ICAgICAgICAgICAgICAgICBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gICAgICAgICAgICAgZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgIH0gICAgICAgICAgICAgZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBEcmFnRHJvcE1vZHVsZSB9ICAgICAgICAgICBmcm9tIFwiLi9EcmFnRHJvcC9EcmFnRHJvcE1vZHVsZVwiO1xuaW1wb3J0IHsgSHR0cE1vZHVsZSB9ICAgICAgICAgICAgICAgZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcblxuaW1wb3J0IHsgQ29tcG9zYW50U2VjcmV0YWlyZSB9ICAgICAgZnJvbSBcIi4vQ29tcG9uZW50cy9Db21wb3NhbnRTZWNyZXRhaXJlXCI7XG5pbXBvcnQgeyBDb21wb3NhbnRQYXRpZW50IH0gICAgICAgICBmcm9tIFwiLi9Db21wb25lbnRzL0NvbXBvc2FudFBhdGllbnRcIjtcbmltcG9ydCB7IENvbXBvc2FudEluZmlybWllciB9ICAgICAgIGZyb20gXCIuL0NvbXBvbmVudHMvQ29tcG9zYW50SW5maXJtaWVyXCI7XG5pbXBvcnQgeyBTZXJ2aWNlQ2FiaW5ldE1lZGljYWwgfSAgICBmcm9tIFwiQFNlcnZpY2VzL2NhYmluZXRNZWRpY2FsU2VydmljZVwiO1xuaW1wb3J0IHsgQ29tcG9zYW50TWFwcyB9ICAgICAgICAgICAgZnJvbSBcIi4vQ29tcG9uZW50cy9Db21wb3NhbnRNYXBzXCI7XG5pbXBvcnQgeyBBcHBSb3V0aW5nTW9kdWxlIH0gICAgICAgICBmcm9tIFwiLi9Nb2R1bGVzL3JvdXRpbmcubW9kdWxlXCI7XG5pbXBvcnQgeyBTZWNyZXRhcnlSb3V0aW5nTW9kdWxlIH0gICBmcm9tIFwiLi9Nb2R1bGVzL3JvdXRpbmcuc2VjcmV0YXJ5Lm1vZHVsZVwiO1xuXG5pbXBvcnQgeyBBZ21Db3JlTW9kdWxlIH0gICAgICAgICAgICBmcm9tIFwiYW5ndWxhcjItZ29vZ2xlLW1hcHMvY29yZVwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHMgICAgIDogWyBDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBEcmFnRHJvcE1vZHVsZSwgSHR0cE1vZHVsZSwgQXBwUm91dGluZ01vZHVsZSwgU2VjcmV0YXJ5Um91dGluZ01vZHVsZSwgQWdtQ29yZU1vZHVsZS5mb3JSb290KHtcbiAgICAgICAgYXBpS2V5OiBcIkFJemFTeUNzSlpqcFctYmxXV0d2N0RsWVFTZTNPOU5FZnR6cGFuNFwiXG4gICAgfSkgXSxcbiAgICBleHBvcnRzICAgICA6IFsgQ29tcG9zYW50U2VjcmV0YWlyZSBdLFxuICAgIGRlY2xhcmF0aW9uczogWyBDb21wb3NhbnRTZWNyZXRhaXJlLCBDb21wb3NhbnRQYXRpZW50LCBDb21wb3NhbnRJbmZpcm1pZXIsIENvbXBvc2FudE1hcHMgXSxcbiAgICBwcm92aWRlcnMgICA6IFsgU2VydmljZUNhYmluZXRNZWRpY2FsIF0sXG5cbn0pXG5leHBvcnQgY2xhc3MgQ2FiaW5ldE1lZGljYWxNb2R1bGUgeyB9XG4iXSwic291cmNlUm9vdCI6IiJ9
