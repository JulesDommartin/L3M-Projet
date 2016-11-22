System.register(["@angular/core", "./ComposantSecretaire", "@Services/cabinetMedicalService", "@angular/forms", "@angular/router", "./Abstract.ComposantPatient"], function(exports_1, context_1) {
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
    var core_1, ComposantSecretaire_1, NF, forms_1, cabinetMedicalService_1, router_1, Abstract_ComposantPatient_1;
    var ComposantAddPatient;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ComposantSecretaire_1_1) {
                ComposantSecretaire_1 = ComposantSecretaire_1_1;
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
            },
            function (Abstract_ComposantPatient_1_1) {
                Abstract_ComposantPatient_1 = Abstract_ComposantPatient_1_1;
            }],
        execute: function() {
            ComposantAddPatient = class ComposantAddPatient extends Abstract_ComposantPatient_1.AbstractComposantPatient {
                constructor(cms, router, fb) {
                    super(cms, router, fb);
                    this.cms = cms;
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
                        patientStreetNumber: [null, forms_1.Validators.required],
                        patientFloor: ""
                    });
                    this.title = "Ajouter un nouveau patient";
                }
                ngOnInit() {
                    this.initDone = true;
                }
                submitPatient(event, f) {
                    event.preventDefault();
                    if (f.valid) {
                        this.cms.AjouterPatient(f).then((dataPatient) => {
                            console.log("Patient ajouté : ", dataPatient);
                        });
                    }
                    else {
                        this.cms._service.error("Erreur", "Certains champs ne sont pas remplis comme il faut");
                        console.log("Error");
                    }
                }
                setAdresse(adresse) {
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
                core_1.Input(), 
                __metadata('design:type', ComposantSecretaire_1.ComposantSecretaire)
            ], ComposantAddPatient.prototype, "composantSecretaire", void 0);
            ComposantAddPatient = __decorate([
                core_1.Component({
                    templateUrl: "ts/Views/edit.patient.html"
                }), 
                __metadata('design:paramtypes', [NF.ServiceCabinetMedical, router_1.Router, forms_1.FormBuilder])
            ], ComposantAddPatient);
            exports_1("ComposantAddPatient", ComposantAddPatient);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50QWRkUGF0aWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFZQSx3REFBeUMsb0RBQXdCO2dCQU03RCxZQUFtQixHQUE2QixFQUFFLE1BQWUsRUFBRSxFQUFlO29CQUM5RSxNQUFNLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBRFIsUUFBRyxHQUFILEdBQUcsQ0FBMEI7b0JBRmhELFNBQUksR0FBRyxJQUFJLENBQUM7b0JBQ1osYUFBUSxHQUE0RCxLQUFLLENBQUM7b0JBR3RFLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQzt3QkFDNUIsV0FBVyxFQUFXLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO3dCQUMvQyxjQUFjLEVBQVEsQ0FBQyxFQUFFLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUM7d0JBQy9DLGFBQWEsRUFBUyxDQUFDLEVBQUUsRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQzt3QkFDL0MsVUFBVSxFQUFZLGdDQUFRLENBQUMsQ0FBQzt3QkFDaEMsV0FBVyxFQUFXLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO3dCQUMvQyxpQkFBaUIsRUFBSyxDQUFDLElBQUksRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQzt3QkFDakQsYUFBYSxFQUFTLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO3dCQUMvQyxtQkFBbUIsRUFBRyxDQUFDLElBQUksRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQzt3QkFDakQsWUFBWSxFQUFVLEVBQUU7cUJBQzNCLENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLDRCQUE0QixDQUFDO2dCQUM5QyxDQUFDO2dCQUNELFFBQVE7b0JBQ0osSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3pCLENBQUM7Z0JBRU0sYUFBYSxDQUFDLEtBQVksRUFBRSxDQUFTO29CQUN4QyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUNWLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBRSxDQUFDLFdBQVc7NEJBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsV0FBVyxDQUFDLENBQUM7d0JBQ2xELENBQUMsQ0FBQyxDQUFDO29CQUNQLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxtREFBbUQsQ0FBQyxDQUFDO3dCQUN2RixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN6QixDQUFDO2dCQUNMLENBQUM7Z0JBRU0sVUFBVSxDQUFDLE9BQWE7b0JBQzNCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQ1YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQVEsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQVUsRUFBRSxDQUFDLENBQUM7d0JBQ3hGLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQU8sRUFBRSxDQUFDLENBQUM7d0JBQ3hGLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFVLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFRLEVBQUUsQ0FBQyxDQUFDO3dCQUN4RixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFHLEVBQUUsQ0FBQyxDQUFDO29CQUM1RixDQUFDO2dCQUNMLENBQUM7Z0JBRU0scUJBQXFCO29CQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQzFDLENBQUM7WUFDTCxDQUFDO1lBaERHO2dCQUFDLFlBQUssRUFBRTs7NEVBQUE7WUFKWjtnQkFBQyxnQkFBUyxDQUFDO29CQUNQLFdBQVcsRUFBRyw0QkFBNEI7aUJBQzdDLENBQUM7b0RBTzZCLHFCQUFxQjttQ0FQbEQ7WUFDRixxREFpREMsQ0FBQSIsImZpbGUiOiJDb21wb25lbnRzL0NvbXBvc2FudEFkZFBhdGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBJbnB1dH0gICAgICAgIGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0NvbXBvc2FudFNlY3JldGFpcmV9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBcIi4vQ29tcG9zYW50U2VjcmV0YWlyZVwiO1xuaW1wb3J0ICogYXMgTkYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XG5pbXBvcnQge05nRm9ybSwgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9yc30gICAgICAgICAgICAgZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge3NleGVFbnVtfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBcIkBTZXJ2aWNlcy9jYWJpbmV0TWVkaWNhbFNlcnZpY2VcIjtcbmltcG9ydCB7Um91dGVyfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQge0Fic3RyYWN0Q29tcG9zYW50UGF0aWVudH0gZnJvbSBcIi4vQWJzdHJhY3QuQ29tcG9zYW50UGF0aWVudFwiO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsXHQ6IFwidHMvVmlld3MvZWRpdC5wYXRpZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBDb21wb3NhbnRBZGRQYXRpZW50IGV4dGVuZHMgQWJzdHJhY3RDb21wb3NhbnRQYXRpZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBjb21wb3NhbnRTZWNyZXRhaXJlICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogQ29tcG9zYW50U2VjcmV0YWlyZTtcbiAgICBlZGl0UGF0aWVudEZvcm0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogRm9ybUdyb3VwO1xuICAgIHRpdGxlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBzdHJpbmc7XG4gICAgdGhpcyA9IHRoaXM7XG4gICAgaW5pdERvbmUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY21zOiBORi5TZXJ2aWNlQ2FiaW5ldE1lZGljYWwsIHJvdXRlciA6IFJvdXRlciwgZmI6IEZvcm1CdWlsZGVyKSB7XG4gICAgICAgIHN1cGVyKGNtcywgcm91dGVyLCBmYik7XG4gICAgICAgIHRoaXMuZWRpdFBhdGllbnRGb3JtID0gZmIuZ3JvdXAoe1xuICAgICAgICAgICAgcGF0aWVudE5hbWUgICAgICAgICA6IFtcIlwiLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIHBhdGllbnRGb3JuYW1lICAgICAgOiBbXCJcIiwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBwYXRpZW50TnVtYmVyICAgICAgIDogW1wiXCIsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgcGF0aWVudFNleCAgICAgICAgICA6IHNleGVFbnVtLk0sXG4gICAgICAgICAgICBwYXRpZW50Q2l0eSAgICAgICAgIDogW1wiXCIsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgcGF0aWVudFBvc3RhbENvZGUgICA6IFtudWxsLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIHBhdGllbnRTdHJlZXQgICAgICAgOiBbXCJcIiwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBwYXRpZW50U3RyZWV0TnVtYmVyIDogW251bGwsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgcGF0aWVudEZsb29yICAgICAgICA6IFwiXCJcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudGl0bGUgPSBcIkFqb3V0ZXIgdW4gbm91dmVhdSBwYXRpZW50XCI7XG4gICAgfVxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXREb25lID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3VibWl0UGF0aWVudChldmVudDogRXZlbnQsIGY6IE5nRm9ybSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoZi52YWxpZCkge1xuICAgICAgICAgICAgdGhpcy5jbXMuQWpvdXRlclBhdGllbnQoZikudGhlbiggKGRhdGFQYXRpZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQYXRpZW50IGFqb3V0w6kgOiBcIiwgZGF0YVBhdGllbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNtcy5fc2VydmljZS5lcnJvcihcIkVycmV1clwiLCBcIkNlcnRhaW5zIGNoYW1wcyBuZSBzb250IHBhcyByZW1wbGlzIGNvbW1lIGlsIGZhdXRcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNldEFkcmVzc2UoYWRyZXNzZSA6IGFueSkge1xuICAgICAgICBpZiAoYWRyZXNzZSkge1xuICAgICAgICAgICAgdGhpcy5lZGl0UGF0aWVudEZvcm0uY29udHJvbHNbXCJwYXRpZW50U3RyZWV0XCJdICAgICAgIC5zZXRWYWx1ZShhZHJlc3NlLnJ1ZSAgICAgICB8fCBcIlwiKTtcbiAgICAgICAgICAgIHRoaXMuZWRpdFBhdGllbnRGb3JtLmNvbnRyb2xzW1wicGF0aWVudFN0cmVldE51bWJlclwiXSAuc2V0VmFsdWUoYWRyZXNzZS5udW1lcm8gICAgfHwgXCJcIik7XG4gICAgICAgICAgICB0aGlzLmVkaXRQYXRpZW50Rm9ybS5jb250cm9sc1tcInBhdGllbnRDaXR5XCJdICAgICAgICAgLnNldFZhbHVlKGFkcmVzc2UudmlsbGUgICAgIHx8IFwiXCIpO1xuICAgICAgICAgICAgdGhpcy5lZGl0UGF0aWVudEZvcm0uY29udHJvbHNbXCJwYXRpZW50UG9zdGFsQ29kZVwiXSAgIC5zZXRWYWx1ZShhZHJlc3NlLmNvZGVQb3N0YWx8fCBcIlwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhbm51bGVyQWpvdXRlclBhdGllbnQoKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9zZWNyZXRhaXJlXCJdKTtcbiAgICB9XG59XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=
