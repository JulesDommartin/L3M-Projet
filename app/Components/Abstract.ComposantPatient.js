System.register(["@angular/core", "@Services/cabinetMedicalService", "@angular/forms", "@angular/router"], function(exports_1, context_1) {
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
    var core_1, NF, forms_1, cabinetMedicalService_1, router_1;
    var AbstractComposantPatient;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (NF_1) {
                NF = NF_1;
                cabinetMedicalService_1 = NF_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            AbstractComposantPatient = class AbstractComposantPatient {
                constructor(cms, router, fb) {
                    this.cms = cms;
                    this.router = router;
                    this.fb = fb;
                    this.this = this;
                    this.initDone = false;
                    this.editPatientForm = fb.group({
                        patientName: ["", forms_1.Validators.required],
                        patientForname: ["", forms_1.Validators.required],
                        patientNumber: ["", forms_1.Validators.required],
                        patientSex: cabinetMedicalService_1.sexeEnum.M,
                        patientCity: ["", forms_1.Validators.required],
                        patientPostalCode: [null, forms_1.Validators.required],
                        patientStreet: ["", forms_1.Validators.required],
                        patientStreetNumber: null,
                        patientFloor: ""
                    });
                }
                ngOnInit() {
                    this.initDone = true;
                }
                setAdresse(adresse) {
                    console.log(adresse);
                    if (adresse) {
                        this.editPatientForm.controls["patientStreet"].setValue(adresse.rue || "");
                        this.editPatientForm.controls["patientStreetNumber"].setValue(adresse.numero || "");
                        this.editPatientForm.controls["patientCity"].setValue(adresse.ville || "");
                        this.editPatientForm.controls["patientPostalCode"].setValue(adresse.codePostal || "");
                    }
                }
                annulerAjouterPatient() {
                    this.router.navigate(["/secretaire"]);
                }
            };
            __decorate([
                core_1.ViewChild("patientStreet"), 
                __metadata('design:type', core_1.ElementRef)
            ], AbstractComposantPatient.prototype, "patientStreet", void 0);
            __decorate([
                core_1.ViewChild("patientStreetNumber"), 
                __metadata('design:type', core_1.ElementRef)
            ], AbstractComposantPatient.prototype, "patientStreetNumber", void 0);
            __decorate([
                core_1.ViewChild("patientPostalCode"), 
                __metadata('design:type', core_1.ElementRef)
            ], AbstractComposantPatient.prototype, "patientPostalCode", void 0);
            __decorate([
                core_1.ViewChild("patientCity"), 
                __metadata('design:type', core_1.ElementRef)
            ], AbstractComposantPatient.prototype, "patientCity", void 0);
            AbstractComposantPatient = __decorate([
                core_1.Component({
                    templateUrl: "ts/views/edit.patient.html"
                }), 
                __metadata('design:paramtypes', [NF.ServiceCabinetMedical, router_1.Router, forms_1.FormBuilder])
            ], AbstractComposantPatient);
            exports_1("AbstractComposantPatient", AbstractComposantPatient);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQWJzdHJhY3QuQ29tcG9zYW50UGF0aWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFVQTtnQkFTSSxZQUFtQixHQUE2QixFQUFZLE1BQWUsRUFBWSxFQUFlO29CQUFuRixRQUFHLEdBQUgsR0FBRyxDQUEwQjtvQkFBWSxXQUFNLEdBQU4sTUFBTSxDQUFTO29CQUFZLE9BQUUsR0FBRixFQUFFLENBQWE7b0JBRnRHLFNBQUksR0FBRyxJQUFJLENBQUM7b0JBQ1osYUFBUSxHQUE0RCxLQUFLLENBQUM7b0JBRXRFLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQzt3QkFDNUIsV0FBVyxFQUFXLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO3dCQUMvQyxjQUFjLEVBQVEsQ0FBQyxFQUFFLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUM7d0JBQy9DLGFBQWEsRUFBUyxDQUFDLEVBQUUsRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQzt3QkFDL0MsVUFBVSxFQUFZLGdDQUFRLENBQUMsQ0FBQzt3QkFDaEMsV0FBVyxFQUFXLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO3dCQUMvQyxpQkFBaUIsRUFBSyxDQUFDLElBQUksRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQzt3QkFDakQsYUFBYSxFQUFTLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO3dCQUMvQyxtQkFBbUIsRUFBRyxJQUFJO3dCQUMxQixZQUFZLEVBQVUsRUFBRTtxQkFDM0IsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBQ0QsUUFBUTtvQkFDSixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDekIsQ0FBQztnQkFJTSxVQUFVLENBQUMsT0FBYTtvQkFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDckIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDVixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBUSxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBVSxFQUFFLENBQUMsQ0FBQzt3QkFDeEYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsQ0FBRSxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBTyxFQUFFLENBQUMsQ0FBQzt3QkFDeEYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQVUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQVEsRUFBRSxDQUFDLENBQUM7d0JBQ3hGLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUcsRUFBRSxDQUFDLENBQUM7b0JBQzVGLENBQUM7Z0JBQ0wsQ0FBQztnQkFFTSxxQkFBcUI7b0JBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDMUMsQ0FBQztZQUNMLENBQUM7WUF4Q0c7Z0JBQUMsZ0JBQVMsQ0FBQyxlQUFlLENBQUM7OzJFQUFBO1lBQzNCO2dCQUFDLGdCQUFTLENBQUMscUJBQXFCLENBQUM7O2lGQUFBO1lBQ2pDO2dCQUFDLGdCQUFTLENBQUMsbUJBQW1CLENBQUM7OytFQUFBO1lBQy9CO2dCQUFDLGdCQUFTLENBQUMsYUFBYSxDQUFDOzt5RUFBQTtZQVA3QjtnQkFBQyxnQkFBUyxDQUFDO29CQUNQLFdBQVcsRUFBRyw0QkFBNEI7aUJBQzdDLENBQUM7b0RBVTZCLHFCQUFxQjt3Q0FWbEQ7WUFDRiwrREF5Q0MsQ0FBQSIsImZpbGUiOiJDb21wb25lbnRzL0Fic3RyYWN0LkNvbXBvc2FudFBhdGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBFbGVtZW50UmVmLCBWaWV3Q2hpbGR9ICAgICAgICBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0ICogYXMgTkYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XG5pbXBvcnQge05nRm9ybSwgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9yc30gICAgICAgICAgICAgZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge3NleGVFbnVtfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBcIkBTZXJ2aWNlcy9jYWJpbmV0TWVkaWNhbFNlcnZpY2VcIjtcbmltcG9ydCB7Um91dGVyfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5cblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmxcdDogXCJ0cy92aWV3cy9lZGl0LnBhdGllbnQuaHRtbFwiXG59KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0Q29tcG9zYW50UGF0aWVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQFZpZXdDaGlsZChcInBhdGllbnRTdHJlZXRcIikgICAgICAgICBwYXRpZW50U3RyZWV0ICAgICAgIDogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKFwicGF0aWVudFN0cmVldE51bWJlclwiKSAgIHBhdGllbnRTdHJlZXROdW1iZXIgOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoXCJwYXRpZW50UG9zdGFsQ29kZVwiKSAgICAgcGF0aWVudFBvc3RhbENvZGUgICA6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZChcInBhdGllbnRDaXR5XCIpICAgICAgICAgICBwYXRpZW50Q2l0eSAgICAgICAgIDogRWxlbWVudFJlZjtcbiAgICBlZGl0UGF0aWVudEZvcm0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogRm9ybUdyb3VwO1xuICAgIHRpdGxlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBzdHJpbmc7XG4gICAgdGhpcyA9IHRoaXM7XG4gICAgaW5pdERvbmUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY21zOiBORi5TZXJ2aWNlQ2FiaW5ldE1lZGljYWwsIHByb3RlY3RlZCByb3V0ZXIgOiBSb3V0ZXIsIHByb3RlY3RlZCBmYjogRm9ybUJ1aWxkZXIpIHtcbiAgICAgICAgdGhpcy5lZGl0UGF0aWVudEZvcm0gPSBmYi5ncm91cCh7XG4gICAgICAgICAgICBwYXRpZW50TmFtZSAgICAgICAgIDogW1wiXCIsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgcGF0aWVudEZvcm5hbWUgICAgICA6IFtcIlwiLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIHBhdGllbnROdW1iZXIgICAgICAgOiBbXCJcIiwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBwYXRpZW50U2V4ICAgICAgICAgIDogc2V4ZUVudW0uTSxcbiAgICAgICAgICAgIHBhdGllbnRDaXR5ICAgICAgICAgOiBbXCJcIiwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBwYXRpZW50UG9zdGFsQ29kZSAgIDogW251bGwsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgcGF0aWVudFN0cmVldCAgICAgICA6IFtcIlwiLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIHBhdGllbnRTdHJlZXROdW1iZXIgOiBudWxsLFxuICAgICAgICAgICAgcGF0aWVudEZsb29yICAgICAgICA6IFwiXCJcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXREb25lID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWJzdHJhY3Qgc3VibWl0UGF0aWVudChldmVudDogRXZlbnQsIGY6IE5nRm9ybSk7XG5cbiAgICBwdWJsaWMgc2V0QWRyZXNzZShhZHJlc3NlIDogYW55KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGFkcmVzc2UpO1xuICAgICAgICBpZiAoYWRyZXNzZSkge1xuICAgICAgICAgICAgdGhpcy5lZGl0UGF0aWVudEZvcm0uY29udHJvbHNbXCJwYXRpZW50U3RyZWV0XCJdICAgICAgIC5zZXRWYWx1ZShhZHJlc3NlLnJ1ZSAgICAgICB8fCBcIlwiKTtcbiAgICAgICAgICAgIHRoaXMuZWRpdFBhdGllbnRGb3JtLmNvbnRyb2xzW1wicGF0aWVudFN0cmVldE51bWJlclwiXSAuc2V0VmFsdWUoYWRyZXNzZS5udW1lcm8gICAgfHwgXCJcIik7XG4gICAgICAgICAgICB0aGlzLmVkaXRQYXRpZW50Rm9ybS5jb250cm9sc1tcInBhdGllbnRDaXR5XCJdICAgICAgICAgLnNldFZhbHVlKGFkcmVzc2UudmlsbGUgICAgIHx8IFwiXCIpO1xuICAgICAgICAgICAgdGhpcy5lZGl0UGF0aWVudEZvcm0uY29udHJvbHNbXCJwYXRpZW50UG9zdGFsQ29kZVwiXSAgIC5zZXRWYWx1ZShhZHJlc3NlLmNvZGVQb3N0YWx8fCBcIlwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhbm51bGVyQWpvdXRlclBhdGllbnQoKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9zZWNyZXRhaXJlXCJdKTtcbiAgICB9XG59XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=
