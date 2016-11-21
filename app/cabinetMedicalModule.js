System.register(["@angular/core", "@angular/common", "@angular/forms", "./DragDrop/DragDropModule", "@angular/http", "./Components/ComposantApp", "./Components/ComposantSecretaire", "./Components/ComposantPatient", "./Components/ComposantOnlyPatient", "./Components/ComposantInfirmier", "./Components/ComposantMaps", "./Components/ComposantAddPatient", "./Components/ComposantEditPatient", "./Components/ComposantMapsInfirmier", "@Services/cabinetMedicalService", "./Modules/routing.module", "angular2-notifications", "angular2-google-maps/core", "angular2-fontawesome/angular2-fontawesome"], function(exports_1, context_1) {
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
    var core_1, common_1, forms_1, DragDropModule_1, http_1, ComposantApp_1, ComposantSecretaire_1, ComposantPatient_1, ComposantOnlyPatient_1, ComposantInfirmier_1, ComposantMaps_1, ComposantAddPatient_1, ComposantEditPatient_1, ComposantMapsInfirmier_1, cabinetMedicalService_1, routing_module_1, angular2_notifications_1, core_2, forms_2, common_2, angular2_fontawesome_1;
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
            function (angular2_notifications_1_1) {
                angular2_notifications_1 = angular2_notifications_1_1;
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
                        angular2_fontawesome_1.Angular2FontawesomeModule,
                        angular2_notifications_1.SimpleNotificationsModule
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhYmluZXRNZWRpY2FsTW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUE0REE7WUFBb0MsQ0FBQztZQTdCckM7Z0JBQUMsZUFBUSxDQUFDO29CQUNOLE9BQU8sRUFBTzt3QkFDVixxQkFBWTt3QkFDWixtQkFBVzt3QkFDWCwrQkFBYzt3QkFDZCxpQkFBVTt3QkFDVixpQ0FBZ0I7d0JBQ2hCLDJCQUFtQjt3QkFDbkIsb0JBQWEsQ0FBQyxPQUFPLENBQUM7NEJBQ2xCLE1BQU0sRUFBRSx5Q0FBeUM7eUJBQ3BELENBQUM7d0JBQ0YsZ0RBQXlCO3dCQUN6QixrREFBeUI7cUJBQzVCO29CQUNELE9BQU8sRUFBTyxDQUFFLGlDQUFnQixDQUFFO29CQUNsQyxZQUFZLEVBQUU7d0JBQ1YsMkJBQVk7d0JBQ1oseUNBQW1CO3dCQUNuQixtQ0FBZ0I7d0JBQ2hCLDJDQUFvQjt3QkFDcEIsdUNBQWtCO3dCQUNsQiw2QkFBYTt3QkFDYix5Q0FBbUI7d0JBQ25CLDJDQUFvQjt3QkFDcEIsK0NBQXNCO3FCQUN6QjtvQkFDRCxTQUFTLEVBQUssQ0FBRSw2Q0FBcUIsRUFBRSxFQUFDLE9BQU8sRUFBRSx5QkFBZ0IsRUFBRSxRQUFRLEVBQUUsNkJBQW9CLEVBQUMsQ0FBRTtpQkFFdkcsQ0FBQzs7b0NBQUE7WUFDRix1REFBcUMsQ0FBQSIsImZpbGUiOiJjYWJpbmV0TWVkaWNhbE1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gICAgICAgICAgICAgICAgIGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSAgICAgICAgICAgICBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSAgfSAgICAgICAgICAgICBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IERyYWdEcm9wTW9kdWxlIH0gICAgICAgICAgIGZyb20gXCIuL0RyYWdEcm9wL0RyYWdEcm9wTW9kdWxlXCI7XG5pbXBvcnQgeyBIdHRwTW9kdWxlIH0gICAgICAgICAgICAgICBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuXG5pbXBvcnQgeyBDb21wb3NhbnRBcHAgfSAgICAgICAgICAgICBmcm9tIFwiLi9Db21wb25lbnRzL0NvbXBvc2FudEFwcFwiO1xuaW1wb3J0IHsgQ29tcG9zYW50U2VjcmV0YWlyZSB9ICAgICAgZnJvbSBcIi4vQ29tcG9uZW50cy9Db21wb3NhbnRTZWNyZXRhaXJlXCI7XG5pbXBvcnQgeyBDb21wb3NhbnRQYXRpZW50IH0gICAgICAgICBmcm9tIFwiLi9Db21wb25lbnRzL0NvbXBvc2FudFBhdGllbnRcIjtcbmltcG9ydCB7IENvbXBvc2FudE9ubHlQYXRpZW50IH0gICAgIGZyb20gXCIuL0NvbXBvbmVudHMvQ29tcG9zYW50T25seVBhdGllbnRcIjtcbmltcG9ydCB7IENvbXBvc2FudEluZmlybWllciB9ICAgICAgIGZyb20gXCIuL0NvbXBvbmVudHMvQ29tcG9zYW50SW5maXJtaWVyXCI7XG5pbXBvcnQgeyBDb21wb3NhbnRNYXBzIH0gICAgICAgICAgICBmcm9tIFwiLi9Db21wb25lbnRzL0NvbXBvc2FudE1hcHNcIjtcbmltcG9ydCB7IENvbXBvc2FudEFkZFBhdGllbnQgfSAgICAgIGZyb20gXCIuL0NvbXBvbmVudHMvQ29tcG9zYW50QWRkUGF0aWVudFwiO1xuaW1wb3J0IHsgQ29tcG9zYW50RWRpdFBhdGllbnQgfSAgICAgZnJvbSBcIi4vQ29tcG9uZW50cy9Db21wb3NhbnRFZGl0UGF0aWVudFwiO1xuaW1wb3J0IHsgQ29tcG9zYW50TWFwc0luZmlybWllciB9ICAgZnJvbSBcIi4vQ29tcG9uZW50cy9Db21wb3NhbnRNYXBzSW5maXJtaWVyXCI7XG5cbmltcG9ydCB7IFNlcnZpY2VDYWJpbmV0TWVkaWNhbCB9ICAgIGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XG5cbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSAgICAgICAgIGZyb20gXCIuL01vZHVsZXMvcm91dGluZy5tb2R1bGVcIjtcblxuaW1wb3J0IHsgU2ltcGxlTm90aWZpY2F0aW9uc01vZHVsZSB9ZnJvbSBcImFuZ3VsYXIyLW5vdGlmaWNhdGlvbnNcIjtcblxuXG5pbXBvcnQgeyBBZ21Db3JlTW9kdWxlIH0gICAgICAgICAgICBmcm9tIFwiYW5ndWxhcjItZ29vZ2xlLW1hcHMvY29yZVwiO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9ICAgICAgZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge1xuICAgIExvY2F0aW9uU3RyYXRlZ3ksXG4gICAgSGFzaExvY2F0aW9uU3RyYXRlZ3lcbn0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHtBbmd1bGFyMkZvbnRhd2Vzb21lTW9kdWxlfSBmcm9tIFwiYW5ndWxhcjItZm9udGF3ZXNvbWUvYW5ndWxhcjItZm9udGF3ZXNvbWVcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzICAgICA6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgRHJhZ0Ryb3BNb2R1bGUsXG4gICAgICAgIEh0dHBNb2R1bGUsXG4gICAgICAgIEFwcFJvdXRpbmdNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIEFnbUNvcmVNb2R1bGUuZm9yUm9vdCh7XG4gICAgICAgICAgICBhcGlLZXk6IFwiQUl6YVN5Q3NKWmpwVy1ibFdXR3Y3RGxZUVNlM085TkVmdHpwYW40XCJcbiAgICAgICAgfSksXG4gICAgICAgIEFuZ3VsYXIyRm9udGF3ZXNvbWVNb2R1bGUsXG4gICAgICAgIFNpbXBsZU5vdGlmaWNhdGlvbnNNb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHMgICAgIDogWyBBcHBSb3V0aW5nTW9kdWxlIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIENvbXBvc2FudEFwcCxcbiAgICAgICAgQ29tcG9zYW50U2VjcmV0YWlyZSxcbiAgICAgICAgQ29tcG9zYW50UGF0aWVudCxcbiAgICAgICAgQ29tcG9zYW50T25seVBhdGllbnQsXG4gICAgICAgIENvbXBvc2FudEluZmlybWllcixcbiAgICAgICAgQ29tcG9zYW50TWFwcyxcbiAgICAgICAgQ29tcG9zYW50QWRkUGF0aWVudCxcbiAgICAgICAgQ29tcG9zYW50RWRpdFBhdGllbnQsXG4gICAgICAgIENvbXBvc2FudE1hcHNJbmZpcm1pZXJcbiAgICBdLFxuICAgIHByb3ZpZGVycyAgIDogWyBTZXJ2aWNlQ2FiaW5ldE1lZGljYWwsIHtwcm92aWRlOiBMb2NhdGlvblN0cmF0ZWd5LCB1c2VDbGFzczogSGFzaExvY2F0aW9uU3RyYXRlZ3l9IF1cblxufSlcbmV4cG9ydCBjbGFzcyBDYWJpbmV0TWVkaWNhbE1vZHVsZSB7IH1cbiJdLCJzb3VyY2VSb290IjoiIn0=
