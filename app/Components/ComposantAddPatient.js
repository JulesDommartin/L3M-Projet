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
                    console.log(f);
                    if (f.valid) {
                        this.cms.AjouterPatient(f).then((dataPatient) => {
                            //Ajouter le patient dans le cabinet
                            let patient = {
                                nom: dataPatient.patientName || "",
                                prenom: dataPatient.patientForname || "",
                                numeroSecuriteSociale: dataPatient.patientNumber || "",
                                sexe: dataPatient.patientSex || cabinetMedicalService_1.sexeEnum.M,
                                adresse: {
                                    ville: dataPatient.patientCity || "",
                                    codePostal: dataPatient.patientPostalCode || null,
                                    rue: dataPatient.patientStreet || "",
                                    numero: dataPatient.patientStreetNumber || null,
                                    etage: dataPatient.patientFloor || ""
                                }
                            };
                            this.router.navigate(["/secretaire"]);
                            console.log(patient);
                        });
                    }
                    else {
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
                    templateUrl: "ts/views/edit.patient.html"
                }), 
                __metadata('design:paramtypes', [NF.ServiceCabinetMedical, router_1.Router, forms_1.FormBuilder])
            ], ComposantAddPatient);
            exports_1("ComposantAddPatient", ComposantAddPatient);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50QWRkUGF0aWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFhQSx3REFBeUMsb0RBQXdCO2dCQU03RCxZQUFtQixHQUE2QixFQUFFLE1BQWUsRUFBRSxFQUFlO29CQUM5RSxNQUFNLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBRFIsUUFBRyxHQUFILEdBQUcsQ0FBMEI7b0JBRmhELFNBQUksR0FBRyxJQUFJLENBQUM7b0JBQ1osYUFBUSxHQUE0RCxLQUFLLENBQUM7b0JBR3RFLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQzt3QkFDNUIsV0FBVyxFQUFXLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO3dCQUMvQyxjQUFjLEVBQVEsQ0FBQyxFQUFFLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUM7d0JBQy9DLGFBQWEsRUFBUyxDQUFDLEVBQUUsRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQzt3QkFDL0MsVUFBVSxFQUFZLGdDQUFRLENBQUMsQ0FBQzt3QkFDaEMsV0FBVyxFQUFXLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO3dCQUMvQyxpQkFBaUIsRUFBSyxDQUFDLElBQUksRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQzt3QkFDakQsYUFBYSxFQUFTLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO3dCQUMvQyxtQkFBbUIsRUFBRyxDQUFDLElBQUksRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQzt3QkFDakQsWUFBWSxFQUFVLEVBQUU7cUJBQzNCLENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLDRCQUE0QixDQUFDO2dCQUM5QyxDQUFDO2dCQUNELFFBQVE7b0JBQ0osSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3pCLENBQUM7Z0JBRU0sYUFBYSxDQUFDLEtBQVksRUFBRSxDQUFTO29CQUN4QyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2YsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFFLENBQUMsV0FBVzs0QkFDekMsb0NBQW9DOzRCQUNwQyxJQUFJLE9BQU8sR0FBc0I7Z0NBQzdCLEdBQUcsRUFBdUIsV0FBVyxDQUFDLFdBQVcsSUFBYSxFQUFFO2dDQUNoRSxNQUFNLEVBQW9CLFdBQVcsQ0FBQyxjQUFjLElBQVUsRUFBRTtnQ0FDaEUscUJBQXFCLEVBQUssV0FBVyxDQUFDLGFBQWEsSUFBVyxFQUFFO2dDQUNoRSxJQUFJLEVBQXNCLFdBQVcsQ0FBQyxVQUFVLElBQWMsZ0NBQVEsQ0FBQyxDQUFDO2dDQUN4RSxPQUFPLEVBQW1CO29DQUN0QixLQUFLLEVBQWlCLFdBQVcsQ0FBQyxXQUFXLElBQWEsRUFBRTtvQ0FDNUQsVUFBVSxFQUFZLFdBQVcsQ0FBQyxpQkFBaUIsSUFBTyxJQUFJO29DQUM5RCxHQUFHLEVBQW1CLFdBQVcsQ0FBQyxhQUFhLElBQVcsRUFBRTtvQ0FDNUQsTUFBTSxFQUFnQixXQUFXLENBQUMsbUJBQW1CLElBQUssSUFBSTtvQ0FDOUQsS0FBSyxFQUFpQixXQUFXLENBQUMsWUFBWSxJQUFZLEVBQUU7aUNBQy9EOzZCQUNKLENBQUM7NEJBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDOzRCQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUN6QixDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3pCLENBQUM7Z0JBQ0wsQ0FBQztnQkFFTSxVQUFVLENBQUMsT0FBYTtvQkFDM0IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDVixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBUSxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBVSxFQUFFLENBQUMsQ0FBQzt3QkFDeEYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsQ0FBRSxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBTyxFQUFFLENBQUMsQ0FBQzt3QkFDeEYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQVUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQVEsRUFBRSxDQUFDLENBQUM7d0JBQ3hGLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUcsRUFBRSxDQUFDLENBQUM7b0JBQzVGLENBQUM7Z0JBQ0wsQ0FBQztnQkFFTSxxQkFBcUI7b0JBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDMUMsQ0FBQztZQUNMLENBQUM7WUEvREc7Z0JBQUMsWUFBSyxFQUFFOzs0RUFBQTtZQUpaO2dCQUFDLGdCQUFTLENBQUM7b0JBQ1AsV0FBVyxFQUFHLDRCQUE0QjtpQkFDN0MsQ0FBQztvREFPNkIscUJBQXFCO21DQVBsRDtZQUNGLHFEQWdFQyxDQUFBIiwiZmlsZSI6IkNvbXBvbmVudHMvQ29tcG9zYW50QWRkUGF0aWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIElucHV0fSAgICAgICAgZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtDb21wb3NhbnRTZWNyZXRhaXJlfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gXCIuL0NvbXBvc2FudFNlY3JldGFpcmVcIjtcclxuaW1wb3J0ICogYXMgTkYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XHJcbmltcG9ydCB7TmdGb3JtLCBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzfSAgICAgICAgICAgICBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcclxuaW1wb3J0IHtQYXRpZW50SW50ZXJmYWNlfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XHJcbmltcG9ydCB7c2V4ZUVudW19ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tIFwiQFNlcnZpY2VzL2NhYmluZXRNZWRpY2FsU2VydmljZVwiO1xyXG5pbXBvcnQge1JvdXRlcn0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQge0Fic3RyYWN0Q29tcG9zYW50UGF0aWVudH0gZnJvbSBcIi4vQWJzdHJhY3QuQ29tcG9zYW50UGF0aWVudFwiO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgdGVtcGxhdGVVcmxcdDogXCJ0cy92aWV3cy9lZGl0LnBhdGllbnQuaHRtbFwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb21wb3NhbnRBZGRQYXRpZW50IGV4dGVuZHMgQWJzdHJhY3RDb21wb3NhbnRQYXRpZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIEBJbnB1dCgpIGNvbXBvc2FudFNlY3JldGFpcmUgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBDb21wb3NhbnRTZWNyZXRhaXJlO1xyXG4gICAgZWRpdFBhdGllbnRGb3JtICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IEZvcm1Hcm91cDtcclxuICAgIHRpdGxlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBzdHJpbmc7XHJcbiAgICB0aGlzID0gdGhpcztcclxuICAgIGluaXREb25lICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY21zOiBORi5TZXJ2aWNlQ2FiaW5ldE1lZGljYWwsIHJvdXRlciA6IFJvdXRlciwgZmI6IEZvcm1CdWlsZGVyKSB7XHJcbiAgICAgICAgc3VwZXIoY21zLCByb3V0ZXIsIGZiKTtcclxuICAgICAgICB0aGlzLmVkaXRQYXRpZW50Rm9ybSA9IGZiLmdyb3VwKHtcclxuICAgICAgICAgICAgcGF0aWVudE5hbWUgICAgICAgICA6IFtcIlwiLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcclxuICAgICAgICAgICAgcGF0aWVudEZvcm5hbWUgICAgICA6IFtcIlwiLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcclxuICAgICAgICAgICAgcGF0aWVudE51bWJlciAgICAgICA6IFtcIlwiLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcclxuICAgICAgICAgICAgcGF0aWVudFNleCAgICAgICAgICA6IHNleGVFbnVtLk0sXHJcbiAgICAgICAgICAgIHBhdGllbnRDaXR5ICAgICAgICAgOiBbXCJcIiwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXHJcbiAgICAgICAgICAgIHBhdGllbnRQb3N0YWxDb2RlICAgOiBbbnVsbCwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXHJcbiAgICAgICAgICAgIHBhdGllbnRTdHJlZXQgICAgICAgOiBbXCJcIiwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXHJcbiAgICAgICAgICAgIHBhdGllbnRTdHJlZXROdW1iZXIgOiBbbnVsbCwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXHJcbiAgICAgICAgICAgIHBhdGllbnRGbG9vciAgICAgICAgOiBcIlwiXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IFwiQWpvdXRlciB1biBub3V2ZWF1IHBhdGllbnRcIjtcclxuICAgIH1cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaW5pdERvbmUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdWJtaXRQYXRpZW50KGV2ZW50OiBFdmVudCwgZjogTmdGb3JtKSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhmKTtcclxuICAgICAgICBpZiAoZi52YWxpZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNtcy5Bam91dGVyUGF0aWVudChmKS50aGVuKCAoZGF0YVBhdGllbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vQWpvdXRlciBsZSBwYXRpZW50IGRhbnMgbGUgY2FiaW5ldFxyXG4gICAgICAgICAgICAgICAgbGV0IHBhdGllbnQgOiBQYXRpZW50SW50ZXJmYWNlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vbSAgICAgICAgICAgICAgICAgICAgIDogZGF0YVBhdGllbnQucGF0aWVudE5hbWUgICAgICAgICAgfHwgXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBwcmVub20gICAgICAgICAgICAgICAgICA6IGRhdGFQYXRpZW50LnBhdGllbnRGb3JuYW1lICAgICAgIHx8IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbnVtZXJvU2VjdXJpdGVTb2NpYWxlICAgOiBkYXRhUGF0aWVudC5wYXRpZW50TnVtYmVyICAgICAgICB8fCBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNleGUgICAgICAgICAgICAgICAgICAgIDogZGF0YVBhdGllbnQucGF0aWVudFNleCAgICAgICAgICAgfHwgc2V4ZUVudW0uTSxcclxuICAgICAgICAgICAgICAgICAgICBhZHJlc3NlICAgICAgICAgICAgICAgICA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlsbGUgICAgICAgICAgICAgICA6IGRhdGFQYXRpZW50LnBhdGllbnRDaXR5ICAgICAgICAgIHx8IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVQb3N0YWwgICAgICAgICAgOiBkYXRhUGF0aWVudC5wYXRpZW50UG9zdGFsQ29kZSAgICB8fCBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydWUgICAgICAgICAgICAgICAgIDogZGF0YVBhdGllbnQucGF0aWVudFN0cmVldCAgICAgICAgfHwgXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtZXJvICAgICAgICAgICAgICA6IGRhdGFQYXRpZW50LnBhdGllbnRTdHJlZXROdW1iZXIgIHx8IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV0YWdlICAgICAgICAgICAgICAgOiBkYXRhUGF0aWVudC5wYXRpZW50Rmxvb3IgICAgICAgICB8fCBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9zZWNyZXRhaXJlXCJdKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhdGllbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0QWRyZXNzZShhZHJlc3NlIDogYW55KSB7XHJcbiAgICAgICAgaWYgKGFkcmVzc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5lZGl0UGF0aWVudEZvcm0uY29udHJvbHNbXCJwYXRpZW50U3RyZWV0XCJdICAgICAgIC5zZXRWYWx1ZShhZHJlc3NlLnJ1ZSAgICAgICB8fCBcIlwiKTtcclxuICAgICAgICAgICAgdGhpcy5lZGl0UGF0aWVudEZvcm0uY29udHJvbHNbXCJwYXRpZW50U3RyZWV0TnVtYmVyXCJdIC5zZXRWYWx1ZShhZHJlc3NlLm51bWVybyAgICB8fCBcIlwiKTtcclxuICAgICAgICAgICAgdGhpcy5lZGl0UGF0aWVudEZvcm0uY29udHJvbHNbXCJwYXRpZW50Q2l0eVwiXSAgICAgICAgIC5zZXRWYWx1ZShhZHJlc3NlLnZpbGxlICAgICB8fCBcIlwiKTtcclxuICAgICAgICAgICAgdGhpcy5lZGl0UGF0aWVudEZvcm0uY29udHJvbHNbXCJwYXRpZW50UG9zdGFsQ29kZVwiXSAgIC5zZXRWYWx1ZShhZHJlc3NlLmNvZGVQb3N0YWx8fCBcIlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFubnVsZXJBam91dGVyUGF0aWVudCgpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvc2VjcmV0YWlyZVwiXSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=
