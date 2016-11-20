System.register(["@angular/core", "@angular/common", "@angular/forms", "./DragDrop/DragDropModule", "@angular/http", "./Components/ComposantApp", "./Components/ComposantSecretaire", "./Components/ComposantPatient", "./Components/ComposantOnlyPatient", "./Components/ComposantInfirmier", "./Components/ComposantMaps", "./Components/ComposantAddPatient", "./Components/ComposantEditPatient", "./Components/ComposantMapsInfirmier", "@Services/cabinetMedicalService", "./Modules/routing.module", "angular2-google-maps/core", "angular2-fontawesome/angular2-fontawesome"], function(exports_1, context_1) {
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
    var core_1, common_1, forms_1, DragDropModule_1, http_1, ComposantApp_1, ComposantSecretaire_1, ComposantPatient_1, ComposantOnlyPatient_1, ComposantInfirmier_1, ComposantMaps_1, ComposantAddPatient_1, ComposantEditPatient_1, ComposantMapsInfirmier_1, cabinetMedicalService_1, routing_module_1, core_2, forms_2, common_2, angular2_fontawesome_1;
    var CabinetMedicalModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
                common_2 = common_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
                forms_2 = forms_1_1;
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
            function (ComposantEditPatient_1_1) {
                ComposantEditPatient_1 = ComposantEditPatient_1_1;
            },
            function (ComposantMapsInfirmier_1_1) {
                ComposantMapsInfirmier_1 = ComposantMapsInfirmier_1_1;
            },
            function (cabinetMedicalService_1_1) {
                cabinetMedicalService_1 = cabinetMedicalService_1_1;
            },
            function (routing_module_1_1) {
                routing_module_1 = routing_module_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (angular2_fontawesome_1_1) {
                angular2_fontawesome_1 = angular2_fontawesome_1_1;
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
                        forms_2.ReactiveFormsModule,
                        core_2.AgmCoreModule.forRoot({
                            apiKey: "AIzaSyCsJZjpW-blWWGv7DlYQSe3O9NEftzpan4"
                        }),
                        angular2_fontawesome_1.Angular2FontawesomeModule
                    ],
                    exports: [routing_module_1.AppRoutingModule],
                    declarations: [
                        ComposantApp_1.ComposantApp,
                        ComposantSecretaire_1.ComposantSecretaire,
                        ComposantPatient_1.ComposantPatient,
                        ComposantOnlyPatient_1.ComposantOnlyPatient,
                        ComposantInfirmier_1.ComposantInfirmier,
                        ComposantMaps_1.ComposantMaps,
                        ComposantAddPatient_1.ComposantAddPatient,
                        ComposantEditPatient_1.ComposantEditPatient,
                        ComposantMapsInfirmier_1.ComposantMapsInfirmier
                    ],
                    providers: [cabinetMedicalService_1.ServiceCabinetMedical, { provide: common_2.LocationStrategy, useClass: common_2.HashLocationStrategy }]
                }), 
                __metadata('design:paramtypes', [])
            ], CabinetMedicalModule);
            exports_1("CabinetMedicalModule", CabinetMedicalModule);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhYmluZXRNZWRpY2FsTW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUF3REE7WUFBb0MsQ0FBQztZQTVCckM7Z0JBQUMsZUFBUSxDQUFDO29CQUNOLE9BQU8sRUFBTzt3QkFDVixxQkFBWTt3QkFDWixtQkFBVzt3QkFDWCwrQkFBYzt3QkFDZCxpQkFBVTt3QkFDVixpQ0FBZ0I7d0JBQ2hCLDJCQUFtQjt3QkFDbkIsb0JBQWEsQ0FBQyxPQUFPLENBQUM7NEJBQ2xCLE1BQU0sRUFBRSx5Q0FBeUM7eUJBQ3BELENBQUM7d0JBQ0YsZ0RBQXlCO3FCQUM1QjtvQkFDRCxPQUFPLEVBQU8sQ0FBRSxpQ0FBZ0IsQ0FBRTtvQkFDbEMsWUFBWSxFQUFFO3dCQUNWLDJCQUFZO3dCQUNaLHlDQUFtQjt3QkFDbkIsbUNBQWdCO3dCQUNoQiwyQ0FBb0I7d0JBQ3BCLHVDQUFrQjt3QkFDbEIsNkJBQWE7d0JBQ2IseUNBQW1CO3dCQUNuQiwyQ0FBb0I7d0JBQ3BCLCtDQUFzQjtxQkFDekI7b0JBQ0QsU0FBUyxFQUFLLENBQUUsNkNBQXFCLEVBQUUsRUFBQyxPQUFPLEVBQUUseUJBQWdCLEVBQUUsUUFBUSxFQUFFLDZCQUFvQixFQUFDLENBQUU7aUJBRXZHLENBQUM7O29DQUFBO1lBQ0YsdURBQXFDLENBQUEiLCJmaWxlIjoiY2FiaW5ldE1lZGljYWxNb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9ICAgICAgICAgICAgICAgICBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gICAgICAgICAgICAgZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgIH0gICAgICAgICAgICAgZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBEcmFnRHJvcE1vZHVsZSB9ICAgICAgICAgICBmcm9tIFwiLi9EcmFnRHJvcC9EcmFnRHJvcE1vZHVsZVwiO1xuaW1wb3J0IHsgSHR0cE1vZHVsZSB9ICAgICAgICAgICAgICAgZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcblxuaW1wb3J0IHsgQ29tcG9zYW50QXBwIH0gICAgICAgICAgICAgZnJvbSBcIi4vQ29tcG9uZW50cy9Db21wb3NhbnRBcHBcIjtcbmltcG9ydCB7IENvbXBvc2FudFNlY3JldGFpcmUgfSAgICAgIGZyb20gXCIuL0NvbXBvbmVudHMvQ29tcG9zYW50U2VjcmV0YWlyZVwiO1xuaW1wb3J0IHsgQ29tcG9zYW50UGF0aWVudCB9ICAgICAgICAgZnJvbSBcIi4vQ29tcG9uZW50cy9Db21wb3NhbnRQYXRpZW50XCI7XG5pbXBvcnQgeyBDb21wb3NhbnRPbmx5UGF0aWVudCB9ICAgICBmcm9tIFwiLi9Db21wb25lbnRzL0NvbXBvc2FudE9ubHlQYXRpZW50XCI7XG5pbXBvcnQgeyBDb21wb3NhbnRJbmZpcm1pZXIgfSAgICAgICBmcm9tIFwiLi9Db21wb25lbnRzL0NvbXBvc2FudEluZmlybWllclwiO1xuaW1wb3J0IHsgQ29tcG9zYW50TWFwcyB9ICAgICAgICAgICAgZnJvbSBcIi4vQ29tcG9uZW50cy9Db21wb3NhbnRNYXBzXCI7XG5pbXBvcnQgeyBDb21wb3NhbnRBZGRQYXRpZW50IH0gICAgICBmcm9tIFwiLi9Db21wb25lbnRzL0NvbXBvc2FudEFkZFBhdGllbnRcIjtcbmltcG9ydCB7IENvbXBvc2FudEVkaXRQYXRpZW50IH0gICAgIGZyb20gXCIuL0NvbXBvbmVudHMvQ29tcG9zYW50RWRpdFBhdGllbnRcIjtcbmltcG9ydCB7IENvbXBvc2FudE1hcHNJbmZpcm1pZXIgfSAgIGZyb20gXCIuL0NvbXBvbmVudHMvQ29tcG9zYW50TWFwc0luZmlybWllclwiO1xuXG5pbXBvcnQgeyBTZXJ2aWNlQ2FiaW5ldE1lZGljYWwgfSAgICBmcm9tIFwiQFNlcnZpY2VzL2NhYmluZXRNZWRpY2FsU2VydmljZVwiO1xuXG5pbXBvcnQgeyBBcHBSb3V0aW5nTW9kdWxlIH0gICAgICAgICBmcm9tIFwiLi9Nb2R1bGVzL3JvdXRpbmcubW9kdWxlXCI7XG5cbmltcG9ydCB7IEFnbUNvcmVNb2R1bGUgfSAgICAgICAgICAgIGZyb20gXCJhbmd1bGFyMi1nb29nbGUtbWFwcy9jb3JlXCI7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gICAgICBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7XG4gICAgTG9jYXRpb25TdHJhdGVneSxcbiAgICBIYXNoTG9jYXRpb25TdHJhdGVneVxufSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQge0FuZ3VsYXIyRm9udGF3ZXNvbWVNb2R1bGV9IGZyb20gXCJhbmd1bGFyMi1mb250YXdlc29tZS9hbmd1bGFyMi1mb250YXdlc29tZVwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHMgICAgIDogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBEcmFnRHJvcE1vZHVsZSxcbiAgICAgICAgSHR0cE1vZHVsZSxcbiAgICAgICAgQXBwUm91dGluZ01vZHVsZSxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgQWdtQ29yZU1vZHVsZS5mb3JSb290KHtcbiAgICAgICAgICAgIGFwaUtleTogXCJBSXphU3lDc0paanBXLWJsV1dHdjdEbFlRU2UzTzlORWZ0enBhbjRcIlxuICAgICAgICB9KSxcbiAgICAgICAgQW5ndWxhcjJGb250YXdlc29tZU1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0cyAgICAgOiBbIEFwcFJvdXRpbmdNb2R1bGUgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQ29tcG9zYW50QXBwLFxuICAgICAgICBDb21wb3NhbnRTZWNyZXRhaXJlLFxuICAgICAgICBDb21wb3NhbnRQYXRpZW50LFxuICAgICAgICBDb21wb3NhbnRPbmx5UGF0aWVudCxcbiAgICAgICAgQ29tcG9zYW50SW5maXJtaWVyLFxuICAgICAgICBDb21wb3NhbnRNYXBzLFxuICAgICAgICBDb21wb3NhbnRBZGRQYXRpZW50LFxuICAgICAgICBDb21wb3NhbnRFZGl0UGF0aWVudCxcbiAgICAgICAgQ29tcG9zYW50TWFwc0luZmlybWllclxuICAgIF0sXG4gICAgcHJvdmlkZXJzICAgOiBbIFNlcnZpY2VDYWJpbmV0TWVkaWNhbCwge3Byb3ZpZGU6IExvY2F0aW9uU3RyYXRlZ3ksIHVzZUNsYXNzOiBIYXNoTG9jYXRpb25TdHJhdGVneX0gXVxuXG59KVxuZXhwb3J0IGNsYXNzIENhYmluZXRNZWRpY2FsTW9kdWxlIHsgfVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
