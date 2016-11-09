System.register(["@angular/core", "@angular/common", "@angular/forms", "./DragDrop/DragDropModule", "@angular/http", "./Components/ComposantApp", "./Components/ComposantSecretaire", "./Components/ComposantPatient", "./Components/ComposantOnlyPatient", "./Components/ComposantInfirmier", "./Components/ComposantMaps", "./Components/ComposantAddPatient", "@Services/cabinetMedicalService", "./Modules/routing.module", "angular2-google-maps/core"], function(exports_1, context_1) {
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
    var core_1, common_1, forms_1, DragDropModule_1, http_1, ComposantApp_1, ComposantSecretaire_1, ComposantPatient_1, ComposantOnlyPatient_1, ComposantInfirmier_1, ComposantMaps_1, ComposantAddPatient_1, cabinetMedicalService_1, routing_module_1, core_2;
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
            function (ComposantAddPatient_1_1) {
                ComposantAddPatient_1 = ComposantAddPatient_1_1;
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
                        ComposantMaps_1.ComposantMaps,
                        ComposantAddPatient_1.ComposantAddPatient
                    ],
                    providers: [cabinetMedicalService_1.ServiceCabinetMedical],
                }), 
                __metadata('design:paramtypes', [])
            ], CabinetMedicalModule);
            exports_1("CabinetMedicalModule", CabinetMedicalModule);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhYmluZXRNZWRpY2FsTW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBZ0RBO1lBQW9DLENBQUM7WUExQnJDO2dCQUFDLGVBQVEsQ0FBQztvQkFDTixPQUFPLEVBQU87d0JBQ1YscUJBQVk7d0JBQ1osbUJBQVc7d0JBQ1gsK0JBQWM7d0JBQ2QsaUJBQVU7d0JBQ1YsaUNBQWdCO3dCQUNoQix3QkFBd0I7d0JBQ3hCLHlCQUF5Qjt3QkFDekIsb0JBQWEsQ0FBQyxPQUFPLENBQUM7NEJBQ2xCLE1BQU0sRUFBRSx5Q0FBeUM7eUJBQ3BELENBQUM7cUJBQ0w7b0JBQ0QsT0FBTyxFQUFPLENBQUUsaUNBQWdCLENBQUU7b0JBQ2xDLFlBQVksRUFBRTt3QkFDViwyQkFBWTt3QkFDWix5Q0FBbUI7d0JBQ25CLG1DQUFnQjt3QkFDaEIsMkNBQW9CO3dCQUNwQix1Q0FBa0I7d0JBQ2xCLDZCQUFhO3dCQUNiLHlDQUFtQjtxQkFDdEI7b0JBQ0QsU0FBUyxFQUFLLENBQUUsNkNBQXFCLENBQUU7aUJBRTFDLENBQUM7O29DQUFBO1lBQ0YsdURBQXFDLENBQUEiLCJmaWxlIjoiY2FiaW5ldE1lZGljYWxNb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9ICAgICAgICAgICAgICAgICBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gICAgICAgICAgICAgZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgIH0gICAgICAgICAgICAgZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBEcmFnRHJvcE1vZHVsZSB9ICAgICAgICAgICBmcm9tIFwiLi9EcmFnRHJvcC9EcmFnRHJvcE1vZHVsZVwiO1xuaW1wb3J0IHsgSHR0cE1vZHVsZSB9ICAgICAgICAgICAgICAgZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcblxuaW1wb3J0IHsgQ29tcG9zYW50QXBwIH0gICAgICAgICAgICAgZnJvbSBcIi4vQ29tcG9uZW50cy9Db21wb3NhbnRBcHBcIjtcbmltcG9ydCB7IENvbXBvc2FudFNlY3JldGFpcmUgfSAgICAgIGZyb20gXCIuL0NvbXBvbmVudHMvQ29tcG9zYW50U2VjcmV0YWlyZVwiO1xuaW1wb3J0IHsgQ29tcG9zYW50UGF0aWVudCB9ICAgICAgICAgZnJvbSBcIi4vQ29tcG9uZW50cy9Db21wb3NhbnRQYXRpZW50XCI7XG5pbXBvcnQgeyBDb21wb3NhbnRPbmx5UGF0aWVudCB9ICAgICBmcm9tIFwiLi9Db21wb25lbnRzL0NvbXBvc2FudE9ubHlQYXRpZW50XCI7XG5pbXBvcnQgeyBDb21wb3NhbnRJbmZpcm1pZXIgfSAgICAgICBmcm9tIFwiLi9Db21wb25lbnRzL0NvbXBvc2FudEluZmlybWllclwiO1xuaW1wb3J0IHsgQ29tcG9zYW50TWFwcyB9ICAgICAgICAgICAgZnJvbSBcIi4vQ29tcG9uZW50cy9Db21wb3NhbnRNYXBzXCI7XG5pbXBvcnQgeyBDb21wb3NhbnRBZGRQYXRpZW50IH0gICAgICBmcm9tIFwiLi9Db21wb25lbnRzL0NvbXBvc2FudEFkZFBhdGllbnRcIjtcblxuaW1wb3J0IHsgU2VydmljZUNhYmluZXRNZWRpY2FsIH0gICAgZnJvbSBcIkBTZXJ2aWNlcy9jYWJpbmV0TWVkaWNhbFNlcnZpY2VcIjtcblxuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9ICAgICAgICAgZnJvbSBcIi4vTW9kdWxlcy9yb3V0aW5nLm1vZHVsZVwiO1xuLy9pbXBvcnQgeyBTZWNyZXRhcnlSb3V0aW5nTW9kdWxlIH0gICBmcm9tIFwiLi9Nb2R1bGVzL3JvdXRpbmcuc2VjcmV0YXJ5Lm1vZHVsZVwiO1xuLy9pbXBvcnQgeyBQYXRpZW50c1JvdXRpbmdNb2R1bGUgfSAgICBmcm9tIFwiLi9Nb2R1bGVzL3JvdXRpbmcucGF0aWVudHMubW9kdWxlXCI7XG5cbmltcG9ydCB7IEFnbUNvcmVNb2R1bGUgfSAgICAgICAgICAgIGZyb20gXCJhbmd1bGFyMi1nb29nbGUtbWFwcy9jb3JlXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0cyAgICAgOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIERyYWdEcm9wTW9kdWxlLFxuICAgICAgICBIdHRwTW9kdWxlLFxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlLFxuICAgICAgICAvL1BhdGllbnRzUm91dGluZ01vZHVsZSxcbiAgICAgICAgLy9TZWNyZXRhcnlSb3V0aW5nTW9kdWxlLFxuICAgICAgICBBZ21Db3JlTW9kdWxlLmZvclJvb3Qoe1xuICAgICAgICAgICAgYXBpS2V5OiBcIkFJemFTeUNzSlpqcFctYmxXV0d2N0RsWVFTZTNPOU5FZnR6cGFuNFwiXG4gICAgICAgIH0pXG4gICAgXSxcbiAgICBleHBvcnRzICAgICA6IFsgQXBwUm91dGluZ01vZHVsZSBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBDb21wb3NhbnRBcHAsXG4gICAgICAgIENvbXBvc2FudFNlY3JldGFpcmUsXG4gICAgICAgIENvbXBvc2FudFBhdGllbnQsXG4gICAgICAgIENvbXBvc2FudE9ubHlQYXRpZW50LFxuICAgICAgICBDb21wb3NhbnRJbmZpcm1pZXIsXG4gICAgICAgIENvbXBvc2FudE1hcHMsXG4gICAgICAgIENvbXBvc2FudEFkZFBhdGllbnRcbiAgICBdLFxuICAgIHByb3ZpZGVycyAgIDogWyBTZXJ2aWNlQ2FiaW5ldE1lZGljYWwgXSxcblxufSlcbmV4cG9ydCBjbGFzcyBDYWJpbmV0TWVkaWNhbE1vZHVsZSB7IH1cbiJdLCJzb3VyY2VSb290IjoiIn0=
