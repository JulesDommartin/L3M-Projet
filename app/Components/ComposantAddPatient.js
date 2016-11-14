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
                    templateUrl: "ts/Views/edit.patient.html"
                }), 
                __metadata('design:paramtypes', [NF.ServiceCabinetMedical, router_1.Router, forms_1.FormBuilder])
            ], ComposantAddPatient);
            exports_1("ComposantAddPatient", ComposantAddPatient);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50QWRkUGF0aWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFhQSx3REFBeUMsb0RBQXdCO2dCQU03RCxZQUFtQixHQUE2QixFQUFFLE1BQWUsRUFBRSxFQUFlO29CQUM5RSxNQUFNLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBRFIsUUFBRyxHQUFILEdBQUcsQ0FBMEI7b0JBRmhELFNBQUksR0FBRyxJQUFJLENBQUM7b0JBQ1osYUFBUSxHQUE0RCxLQUFLLENBQUM7b0JBR3RFLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQzt3QkFDNUIsV0FBVyxFQUFXLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO3dCQUMvQyxjQUFjLEVBQVEsQ0FBQyxFQUFFLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUM7d0JBQy9DLGFBQWEsRUFBUyxDQUFDLEVBQUUsRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQzt3QkFDL0MsVUFBVSxFQUFZLGdDQUFRLENBQUMsQ0FBQzt3QkFDaEMsV0FBVyxFQUFXLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO3dCQUMvQyxpQkFBaUIsRUFBSyxDQUFDLElBQUksRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQzt3QkFDakQsYUFBYSxFQUFTLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO3dCQUMvQyxtQkFBbUIsRUFBRyxDQUFDLElBQUksRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQzt3QkFDakQsWUFBWSxFQUFVLEVBQUU7cUJBQzNCLENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLDRCQUE0QixDQUFDO2dCQUM5QyxDQUFDO2dCQUNELFFBQVE7b0JBQ0osSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3pCLENBQUM7Z0JBRU0sYUFBYSxDQUFDLEtBQVksRUFBRSxDQUFTO29CQUN4QyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2YsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFFLENBQUMsV0FBVzs0QkFDekMsb0NBQW9DOzRCQUNwQyxJQUFJLE9BQU8sR0FBc0I7Z0NBQzdCLEdBQUcsRUFBdUIsV0FBVyxDQUFDLFdBQVcsSUFBYSxFQUFFO2dDQUNoRSxNQUFNLEVBQW9CLFdBQVcsQ0FBQyxjQUFjLElBQVUsRUFBRTtnQ0FDaEUscUJBQXFCLEVBQUssV0FBVyxDQUFDLGFBQWEsSUFBVyxFQUFFO2dDQUNoRSxJQUFJLEVBQXNCLFdBQVcsQ0FBQyxVQUFVLElBQWMsZ0NBQVEsQ0FBQyxDQUFDO2dDQUN4RSxPQUFPLEVBQW1CO29DQUN0QixLQUFLLEVBQWlCLFdBQVcsQ0FBQyxXQUFXLElBQWEsRUFBRTtvQ0FDNUQsVUFBVSxFQUFZLFdBQVcsQ0FBQyxpQkFBaUIsSUFBTyxJQUFJO29DQUM5RCxHQUFHLEVBQW1CLFdBQVcsQ0FBQyxhQUFhLElBQVcsRUFBRTtvQ0FDNUQsTUFBTSxFQUFnQixXQUFXLENBQUMsbUJBQW1CLElBQUssSUFBSTtvQ0FDOUQsS0FBSyxFQUFpQixXQUFXLENBQUMsWUFBWSxJQUFZLEVBQUU7aUNBQy9EOzZCQUNKLENBQUM7NEJBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDOzRCQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUN6QixDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3pCLENBQUM7Z0JBQ0wsQ0FBQztnQkFFTSxVQUFVLENBQUMsT0FBYTtvQkFDM0IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDVixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBUSxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBVSxFQUFFLENBQUMsQ0FBQzt3QkFDeEYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsQ0FBRSxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBTyxFQUFFLENBQUMsQ0FBQzt3QkFDeEYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQVUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQVEsRUFBRSxDQUFDLENBQUM7d0JBQ3hGLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUcsRUFBRSxDQUFDLENBQUM7b0JBQzVGLENBQUM7Z0JBQ0wsQ0FBQztnQkFFTSxxQkFBcUI7b0JBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDMUMsQ0FBQztZQUNMLENBQUM7WUEvREc7Z0JBQUMsWUFBSyxFQUFFOzs0RUFBQTtZQUpaO2dCQUFDLGdCQUFTLENBQUM7b0JBQ1AsV0FBVyxFQUFHLDRCQUE0QjtpQkFDN0MsQ0FBQztvREFPNkIscUJBQXFCO21DQVBsRDtZQUNGLHFEQWdFQyxDQUFBIiwiZmlsZSI6IkNvbXBvbmVudHMvQ29tcG9zYW50QWRkUGF0aWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIElucHV0fSAgICAgICAgZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Q29tcG9zYW50U2VjcmV0YWlyZX0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tIFwiLi9Db21wb3NhbnRTZWNyZXRhaXJlXCI7XG5pbXBvcnQgKiBhcyBORiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBcIkBTZXJ2aWNlcy9jYWJpbmV0TWVkaWNhbFNlcnZpY2VcIjtcbmltcG9ydCB7TmdGb3JtLCBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzfSAgICAgICAgICAgICBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7UGF0aWVudEludGVyZmFjZX0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tIFwiQFNlcnZpY2VzL2NhYmluZXRNZWRpY2FsU2VydmljZVwiO1xuaW1wb3J0IHtzZXhlRW51bX0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XG5pbXBvcnQge1JvdXRlcn0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHtBYnN0cmFjdENvbXBvc2FudFBhdGllbnR9IGZyb20gXCIuL0Fic3RyYWN0LkNvbXBvc2FudFBhdGllbnRcIjtcblxuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVVybFx0OiBcInRzL1ZpZXdzL2VkaXQucGF0aWVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgQ29tcG9zYW50QWRkUGF0aWVudCBleHRlbmRzIEFic3RyYWN0Q29tcG9zYW50UGF0aWVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgY29tcG9zYW50U2VjcmV0YWlyZSAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IENvbXBvc2FudFNlY3JldGFpcmU7XG4gICAgZWRpdFBhdGllbnRGb3JtICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IEZvcm1Hcm91cDtcbiAgICB0aXRsZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogc3RyaW5nO1xuICAgIHRoaXMgPSB0aGlzO1xuICAgIGluaXREb25lICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBib29sZWFuID0gZmFsc2U7XG4gICAgY29uc3RydWN0b3IocHVibGljIGNtczogTkYuU2VydmljZUNhYmluZXRNZWRpY2FsLCByb3V0ZXIgOiBSb3V0ZXIsIGZiOiBGb3JtQnVpbGRlcikge1xuICAgICAgICBzdXBlcihjbXMsIHJvdXRlciwgZmIpO1xuICAgICAgICB0aGlzLmVkaXRQYXRpZW50Rm9ybSA9IGZiLmdyb3VwKHtcbiAgICAgICAgICAgIHBhdGllbnROYW1lICAgICAgICAgOiBbXCJcIiwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBwYXRpZW50Rm9ybmFtZSAgICAgIDogW1wiXCIsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgcGF0aWVudE51bWJlciAgICAgICA6IFtcIlwiLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIHBhdGllbnRTZXggICAgICAgICAgOiBzZXhlRW51bS5NLFxuICAgICAgICAgICAgcGF0aWVudENpdHkgICAgICAgICA6IFtcIlwiLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIHBhdGllbnRQb3N0YWxDb2RlICAgOiBbbnVsbCwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBwYXRpZW50U3RyZWV0ICAgICAgIDogW1wiXCIsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgcGF0aWVudFN0cmVldE51bWJlciA6IFtudWxsLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIHBhdGllbnRGbG9vciAgICAgICAgOiBcIlwiXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnRpdGxlID0gXCJBam91dGVyIHVuIG5vdXZlYXUgcGF0aWVudFwiO1xuICAgIH1cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbml0RG9uZSA9IHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIHN1Ym1pdFBhdGllbnQoZXZlbnQ6IEV2ZW50LCBmOiBOZ0Zvcm0pIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc29sZS5sb2coZik7XG4gICAgICAgIGlmIChmLnZhbGlkKSB7XG4gICAgICAgICAgICB0aGlzLmNtcy5Bam91dGVyUGF0aWVudChmKS50aGVuKCAoZGF0YVBhdGllbnQpID0+IHtcbiAgICAgICAgICAgICAgICAvL0Fqb3V0ZXIgbGUgcGF0aWVudCBkYW5zIGxlIGNhYmluZXRcbiAgICAgICAgICAgICAgICBsZXQgcGF0aWVudCA6IFBhdGllbnRJbnRlcmZhY2UgPSB7XG4gICAgICAgICAgICAgICAgICAgIG5vbSAgICAgICAgICAgICAgICAgICAgIDogZGF0YVBhdGllbnQucGF0aWVudE5hbWUgICAgICAgICAgfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgcHJlbm9tICAgICAgICAgICAgICAgICAgOiBkYXRhUGF0aWVudC5wYXRpZW50Rm9ybmFtZSAgICAgICB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBudW1lcm9TZWN1cml0ZVNvY2lhbGUgICA6IGRhdGFQYXRpZW50LnBhdGllbnROdW1iZXIgICAgICAgIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIHNleGUgICAgICAgICAgICAgICAgICAgIDogZGF0YVBhdGllbnQucGF0aWVudFNleCAgICAgICAgICAgfHwgc2V4ZUVudW0uTSxcbiAgICAgICAgICAgICAgICAgICAgYWRyZXNzZSAgICAgICAgICAgICAgICAgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWxsZSAgICAgICAgICAgICAgIDogZGF0YVBhdGllbnQucGF0aWVudENpdHkgICAgICAgICAgfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVQb3N0YWwgICAgICAgICAgOiBkYXRhUGF0aWVudC5wYXRpZW50UG9zdGFsQ29kZSAgICB8fCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgcnVlICAgICAgICAgICAgICAgICA6IGRhdGFQYXRpZW50LnBhdGllbnRTdHJlZXQgICAgICAgIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBudW1lcm8gICAgICAgICAgICAgIDogZGF0YVBhdGllbnQucGF0aWVudFN0cmVldE51bWJlciAgfHwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV0YWdlICAgICAgICAgICAgICAgOiBkYXRhUGF0aWVudC5wYXRpZW50Rmxvb3IgICAgICAgICB8fCBcIlwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9zZWNyZXRhaXJlXCJdKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwYXRpZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvclwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRBZHJlc3NlKGFkcmVzc2UgOiBhbnkpIHtcbiAgICAgICAgaWYgKGFkcmVzc2UpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdFBhdGllbnRGb3JtLmNvbnRyb2xzW1wicGF0aWVudFN0cmVldFwiXSAgICAgICAuc2V0VmFsdWUoYWRyZXNzZS5ydWUgICAgICAgfHwgXCJcIik7XG4gICAgICAgICAgICB0aGlzLmVkaXRQYXRpZW50Rm9ybS5jb250cm9sc1tcInBhdGllbnRTdHJlZXROdW1iZXJcIl0gLnNldFZhbHVlKGFkcmVzc2UubnVtZXJvICAgIHx8IFwiXCIpO1xuICAgICAgICAgICAgdGhpcy5lZGl0UGF0aWVudEZvcm0uY29udHJvbHNbXCJwYXRpZW50Q2l0eVwiXSAgICAgICAgIC5zZXRWYWx1ZShhZHJlc3NlLnZpbGxlICAgICB8fCBcIlwiKTtcbiAgICAgICAgICAgIHRoaXMuZWRpdFBhdGllbnRGb3JtLmNvbnRyb2xzW1wicGF0aWVudFBvc3RhbENvZGVcIl0gICAuc2V0VmFsdWUoYWRyZXNzZS5jb2RlUG9zdGFsfHwgXCJcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgYW5udWxlckFqb3V0ZXJQYXRpZW50KCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvc2VjcmV0YWlyZVwiXSk7XG4gICAgfVxufVxuXG4iXSwic291cmNlUm9vdCI6IiJ9
