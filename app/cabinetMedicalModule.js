System.register(["@angular/core", "@angular/common", "@angular/forms", "./DragDrop/DragDropModule", "@angular/http", "./Components/ComposantApp", "./Components/ComposantSecretaire", "./Components/ComposantPatient", "./Components/ComposantOnlyPatient", "./Components/ComposantInfirmier", "./Components/ComposantMaps", "@Services/cabinetMedicalService", "./Modules/routing.module", "angular2-google-maps/core"], function(exports_1, context_1) {
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
    var core_1, common_1, forms_1, DragDropModule_1, http_1, ComposantApp_1, ComposantSecretaire_1, ComposantPatient_1, ComposantOnlyPatient_1, ComposantInfirmier_1, ComposantMaps_1, cabinetMedicalService_1, routing_module_1, core_2;
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
            function (ComposantApp_1_1) {
                ComposantApp_1 = ComposantApp_1_1;
            },
            function (ComposantSecretaire_1_1) {
                ComposantSecretaire_1 = ComposantSecretaire_1_1;
            },
            function (ComposantPatient_1_1) {
                ComposantPatient_1 = ComposantPatient_1_1;
            },
            function (ComposantOnlyPatient_1_1) {
                ComposantOnlyPatient_1 = ComposantOnlyPatient_1_1;
            },
            function (ComposantInfirmier_1_1) {
                ComposantInfirmier_1 = ComposantInfirmier_1_1;
            },
            function (ComposantMaps_1_1) {
                ComposantMaps_1 = ComposantMaps_1_1;
            },
            function (cabinetMedicalService_1_1) {
                cabinetMedicalService_1 = cabinetMedicalService_1_1;
            },
            function (routing_module_1_1) {
                routing_module_1 = routing_module_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            CabinetMedicalModule = class CabinetMedicalModule {
            };
            CabinetMedicalModule = __decorate([
                core_1.NgModule({
                    imports: [
                        common_1.CommonModule,
                        forms_1.FormsModule,
                        DragDropModule_1.DragDropModule,
                        http_1.HttpModule,
                        routing_module_1.AppRoutingModule,
                        //PatientsRoutingModule,
                        //SecretaryRoutingModule,
                        core_2.AgmCoreModule.forRoot({
                            apiKey: "AIzaSyCsJZjpW-blWWGv7DlYQSe3O9NEftzpan4"
                        })
                    ],
                    exports: [routing_module_1.AppRoutingModule],
                    declarations: [
                        ComposantApp_1.ComposantApp,
                        ComposantSecretaire_1.ComposantSecretaire,
                        ComposantPatient_1.ComposantPatient,
                        ComposantOnlyPatient_1.ComposantOnlyPatient,
                        ComposantInfirmier_1.ComposantInfirmier,
                        ComposantMaps_1.ComposantMaps
                    ],
                    providers: [cabinetMedicalService_1.ServiceCabinetMedical],
                }), 
                __metadata('design:paramtypes', [])
            ], CabinetMedicalModule);
            exports_1("CabinetMedicalModule", CabinetMedicalModule);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhYmluZXRNZWRpY2FsTW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBOENBO1lBQW9DLENBQUM7WUF6QnJDO2dCQUFDLGVBQVEsQ0FBQztvQkFDTixPQUFPLEVBQU87d0JBQ1YscUJBQVk7d0JBQ1osbUJBQVc7d0JBQ1gsK0JBQWM7d0JBQ2QsaUJBQVU7d0JBQ1YsaUNBQWdCO3dCQUNoQix3QkFBd0I7d0JBQ3hCLHlCQUF5Qjt3QkFDekIsb0JBQWEsQ0FBQyxPQUFPLENBQUM7NEJBQ2xCLE1BQU0sRUFBRSx5Q0FBeUM7eUJBQ3BELENBQUM7cUJBQ0w7b0JBQ0QsT0FBTyxFQUFPLENBQUUsaUNBQWdCLENBQUU7b0JBQ2xDLFlBQVksRUFBRTt3QkFDViwyQkFBWTt3QkFDWix5Q0FBbUI7d0JBQ25CLG1DQUFnQjt3QkFDaEIsMkNBQW9CO3dCQUNwQix1Q0FBa0I7d0JBQ2xCLDZCQUFhO3FCQUNoQjtvQkFDRCxTQUFTLEVBQUssQ0FBRSw2Q0FBcUIsQ0FBRTtpQkFFMUMsQ0FBQzs7b0NBQUE7WUFDRix1REFBcUMsQ0FBQSIsImZpbGUiOiJjYWJpbmV0TWVkaWNhbE1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gICAgICAgICAgICAgICAgIGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSAgICAgICAgICAgICBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSAgfSAgICAgICAgICAgICBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IERyYWdEcm9wTW9kdWxlIH0gICAgICAgICAgIGZyb20gXCIuL0RyYWdEcm9wL0RyYWdEcm9wTW9kdWxlXCI7XG5pbXBvcnQgeyBIdHRwTW9kdWxlIH0gICAgICAgICAgICAgICBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuXG5pbXBvcnQgeyBDb21wb3NhbnRBcHAgfSAgICAgICAgICAgICBmcm9tIFwiLi9Db21wb25lbnRzL0NvbXBvc2FudEFwcFwiO1xuaW1wb3J0IHsgQ29tcG9zYW50U2VjcmV0YWlyZSB9ICAgICAgZnJvbSBcIi4vQ29tcG9uZW50cy9Db21wb3NhbnRTZWNyZXRhaXJlXCI7XG5pbXBvcnQgeyBDb21wb3NhbnRQYXRpZW50IH0gICAgICAgICBmcm9tIFwiLi9Db21wb25lbnRzL0NvbXBvc2FudFBhdGllbnRcIjtcbmltcG9ydCB7IENvbXBvc2FudE9ubHlQYXRpZW50IH0gICAgIGZyb20gXCIuL0NvbXBvbmVudHMvQ29tcG9zYW50T25seVBhdGllbnRcIjtcbmltcG9ydCB7IENvbXBvc2FudEluZmlybWllciB9ICAgICAgIGZyb20gXCIuL0NvbXBvbmVudHMvQ29tcG9zYW50SW5maXJtaWVyXCI7XG5pbXBvcnQgeyBDb21wb3NhbnRNYXBzIH0gICAgICAgICAgICBmcm9tIFwiLi9Db21wb25lbnRzL0NvbXBvc2FudE1hcHNcIjtcblxuaW1wb3J0IHsgU2VydmljZUNhYmluZXRNZWRpY2FsIH0gICAgZnJvbSBcIkBTZXJ2aWNlcy9jYWJpbmV0TWVkaWNhbFNlcnZpY2VcIjtcblxuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9ICAgICAgICAgZnJvbSBcIi4vTW9kdWxlcy9yb3V0aW5nLm1vZHVsZVwiO1xuLy9pbXBvcnQgeyBTZWNyZXRhcnlSb3V0aW5nTW9kdWxlIH0gICBmcm9tIFwiLi9Nb2R1bGVzL3JvdXRpbmcuc2VjcmV0YXJ5Lm1vZHVsZVwiO1xuLy9pbXBvcnQgeyBQYXRpZW50c1JvdXRpbmdNb2R1bGUgfSAgICBmcm9tIFwiLi9Nb2R1bGVzL3JvdXRpbmcucGF0aWVudHMubW9kdWxlXCI7XG5cbmltcG9ydCB7IEFnbUNvcmVNb2R1bGUgfSAgICAgICAgICAgIGZyb20gXCJhbmd1bGFyMi1nb29nbGUtbWFwcy9jb3JlXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0cyAgICAgOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIERyYWdEcm9wTW9kdWxlLFxuICAgICAgICBIdHRwTW9kdWxlLFxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlLFxuICAgICAgICAvL1BhdGllbnRzUm91dGluZ01vZHVsZSxcbiAgICAgICAgLy9TZWNyZXRhcnlSb3V0aW5nTW9kdWxlLFxuICAgICAgICBBZ21Db3JlTW9kdWxlLmZvclJvb3Qoe1xuICAgICAgICAgICAgYXBpS2V5OiBcIkFJemFTeUNzSlpqcFctYmxXV0d2N0RsWVFTZTNPOU5FZnR6cGFuNFwiXG4gICAgICAgIH0pXG4gICAgXSxcbiAgICBleHBvcnRzICAgICA6IFsgQXBwUm91dGluZ01vZHVsZSBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBDb21wb3NhbnRBcHAsXG4gICAgICAgIENvbXBvc2FudFNlY3JldGFpcmUsXG4gICAgICAgIENvbXBvc2FudFBhdGllbnQsXG4gICAgICAgIENvbXBvc2FudE9ubHlQYXRpZW50LFxuICAgICAgICBDb21wb3NhbnRJbmZpcm1pZXIsXG4gICAgICAgIENvbXBvc2FudE1hcHNcbiAgICBdLFxuICAgIHByb3ZpZGVycyAgIDogWyBTZXJ2aWNlQ2FiaW5ldE1lZGljYWwgXSxcblxufSlcbmV4cG9ydCBjbGFzcyBDYWJpbmV0TWVkaWNhbE1vZHVsZSB7IH1cbiJdLCJzb3VyY2VSb290IjoiIn0=
