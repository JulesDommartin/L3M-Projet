System.register(["@angular/core", "@angular/common", "@angular/forms", "./DragDrop/DragDropModule", "@angular/http", "./Components/ComposantApp", "./Components/ComposantSecretaire", "./Components/ComposantPatient", "./Components/ComposantOnlyPatient", "./Components/ComposantInfirmier", "./Components/ComposantMaps", "./Components/ComposantAddPatient", "./Components/ComposantEditPatient", "@Services/cabinetMedicalService", "./Modules/routing.module", "angular2-google-maps/core", "angular2-fontawesome/angular2-fontawesome"], function(exports_1, context_1) {
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
    var core_1, common_1, forms_1, DragDropModule_1, http_1, ComposantApp_1, ComposantSecretaire_1, ComposantPatient_1, ComposantOnlyPatient_1, ComposantInfirmier_1, ComposantMaps_1, ComposantAddPatient_1, ComposantEditPatient_1, cabinetMedicalService_1, routing_module_1, core_2, forms_2, common_2, angular2_fontawesome_1;
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
                        ComposantEditPatient_1.ComposantEditPatient
                    ],
                    providers: [cabinetMedicalService_1.ServiceCabinetMedical, { provide: common_2.LocationStrategy, useClass: common_2.HashLocationStrategy }]
                }), 
                __metadata('design:paramtypes', [])
            ], CabinetMedicalModule);
            exports_1("CabinetMedicalModule", CabinetMedicalModule);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhYmluZXRNZWRpY2FsTW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFzREE7WUFBb0MsQ0FBQztZQTNCckM7Z0JBQUMsZUFBUSxDQUFDO29CQUNOLE9BQU8sRUFBTzt3QkFDVixxQkFBWTt3QkFDWixtQkFBVzt3QkFDWCwrQkFBYzt3QkFDZCxpQkFBVTt3QkFDVixpQ0FBZ0I7d0JBQ2hCLDJCQUFtQjt3QkFDbkIsb0JBQWEsQ0FBQyxPQUFPLENBQUM7NEJBQ2xCLE1BQU0sRUFBRSx5Q0FBeUM7eUJBQ3BELENBQUM7d0JBQ0YsZ0RBQXlCO3FCQUM1QjtvQkFDRCxPQUFPLEVBQU8sQ0FBRSxpQ0FBZ0IsQ0FBRTtvQkFDbEMsWUFBWSxFQUFFO3dCQUNWLDJCQUFZO3dCQUNaLHlDQUFtQjt3QkFDbkIsbUNBQWdCO3dCQUNoQiwyQ0FBb0I7d0JBQ3BCLHVDQUFrQjt3QkFDbEIsNkJBQWE7d0JBQ2IseUNBQW1CO3dCQUNuQiwyQ0FBb0I7cUJBQ3ZCO29CQUNELFNBQVMsRUFBSyxDQUFFLDZDQUFxQixFQUFFLEVBQUMsT0FBTyxFQUFFLHlCQUFnQixFQUFFLFFBQVEsRUFBRSw2QkFBb0IsRUFBQyxDQUFFO2lCQUV2RyxDQUFDOztvQ0FBQTtZQUNGLHVEQUFxQyxDQUFBIiwiZmlsZSI6ImNhYmluZXRNZWRpY2FsTW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSAgICAgICAgICAgICAgICAgZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9ICAgICAgICAgICAgIGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IEZvcm1zTW9kdWxlICB9ICAgICAgICAgICAgIGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgRHJhZ0Ryb3BNb2R1bGUgfSAgICAgICAgICAgZnJvbSBcIi4vRHJhZ0Ryb3AvRHJhZ0Ryb3BNb2R1bGVcIjtcbmltcG9ydCB7IEh0dHBNb2R1bGUgfSAgICAgICAgICAgICAgIGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5cbmltcG9ydCB7IENvbXBvc2FudEFwcCB9ICAgICAgICAgICAgIGZyb20gXCIuL0NvbXBvbmVudHMvQ29tcG9zYW50QXBwXCI7XG5pbXBvcnQgeyBDb21wb3NhbnRTZWNyZXRhaXJlIH0gICAgICBmcm9tIFwiLi9Db21wb25lbnRzL0NvbXBvc2FudFNlY3JldGFpcmVcIjtcbmltcG9ydCB7IENvbXBvc2FudFBhdGllbnQgfSAgICAgICAgIGZyb20gXCIuL0NvbXBvbmVudHMvQ29tcG9zYW50UGF0aWVudFwiO1xuaW1wb3J0IHsgQ29tcG9zYW50T25seVBhdGllbnQgfSAgICAgZnJvbSBcIi4vQ29tcG9uZW50cy9Db21wb3NhbnRPbmx5UGF0aWVudFwiO1xuaW1wb3J0IHsgQ29tcG9zYW50SW5maXJtaWVyIH0gICAgICAgZnJvbSBcIi4vQ29tcG9uZW50cy9Db21wb3NhbnRJbmZpcm1pZXJcIjtcbmltcG9ydCB7IENvbXBvc2FudE1hcHMgfSAgICAgICAgICAgIGZyb20gXCIuL0NvbXBvbmVudHMvQ29tcG9zYW50TWFwc1wiO1xuaW1wb3J0IHsgQ29tcG9zYW50QWRkUGF0aWVudCB9ICAgICAgZnJvbSBcIi4vQ29tcG9uZW50cy9Db21wb3NhbnRBZGRQYXRpZW50XCI7XG5pbXBvcnQgeyBDb21wb3NhbnRFZGl0UGF0aWVudCB9ICAgICBmcm9tIFwiLi9Db21wb25lbnRzL0NvbXBvc2FudEVkaXRQYXRpZW50XCI7XG5cbmltcG9ydCB7IFNlcnZpY2VDYWJpbmV0TWVkaWNhbCB9ICAgIGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XG5cbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSAgICAgICAgIGZyb20gXCIuL01vZHVsZXMvcm91dGluZy5tb2R1bGVcIjtcblxuaW1wb3J0IHsgQWdtQ29yZU1vZHVsZSB9ICAgICAgICAgICAgZnJvbSBcImFuZ3VsYXIyLWdvb2dsZS1tYXBzL2NvcmVcIjtcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSAgICAgIGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtcbiAgICBMb2NhdGlvblN0cmF0ZWd5LFxuICAgIEhhc2hMb2NhdGlvblN0cmF0ZWd5XG59IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7QW5ndWxhcjJGb250YXdlc29tZU1vZHVsZX0gZnJvbSBcImFuZ3VsYXIyLWZvbnRhd2Vzb21lL2FuZ3VsYXIyLWZvbnRhd2Vzb21lXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0cyAgICAgOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIERyYWdEcm9wTW9kdWxlLFxuICAgICAgICBIdHRwTW9kdWxlLFxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBBZ21Db3JlTW9kdWxlLmZvclJvb3Qoe1xuICAgICAgICAgICAgYXBpS2V5OiBcIkFJemFTeUNzSlpqcFctYmxXV0d2N0RsWVFTZTNPOU5FZnR6cGFuNFwiXG4gICAgICAgIH0pLFxuICAgICAgICBBbmd1bGFyMkZvbnRhd2Vzb21lTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzICAgICA6IFsgQXBwUm91dGluZ01vZHVsZSBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBDb21wb3NhbnRBcHAsXG4gICAgICAgIENvbXBvc2FudFNlY3JldGFpcmUsXG4gICAgICAgIENvbXBvc2FudFBhdGllbnQsXG4gICAgICAgIENvbXBvc2FudE9ubHlQYXRpZW50LFxuICAgICAgICBDb21wb3NhbnRJbmZpcm1pZXIsXG4gICAgICAgIENvbXBvc2FudE1hcHMsXG4gICAgICAgIENvbXBvc2FudEFkZFBhdGllbnQsXG4gICAgICAgIENvbXBvc2FudEVkaXRQYXRpZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnMgICA6IFsgU2VydmljZUNhYmluZXRNZWRpY2FsLCB7cHJvdmlkZTogTG9jYXRpb25TdHJhdGVneSwgdXNlQ2xhc3M6IEhhc2hMb2NhdGlvblN0cmF0ZWd5fSBdXG5cbn0pXG5leHBvcnQgY2xhc3MgQ2FiaW5ldE1lZGljYWxNb2R1bGUgeyB9XG4iXSwic291cmNlUm9vdCI6IiJ9
