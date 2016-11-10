System.register(["@angular/core", "./ComposantSecretaire", "@Services/cabinetMedicalService", "@angular/forms", "@angular/router"], function(exports_1, context_1) {
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
    var core_1, ComposantSecretaire_1, NF, forms_1, cabinetMedicalService_1, router_1;
    var htmlTemplate, ComposantAddPatient;
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
            }],
        execute: function() {
            htmlTemplate = `
        <section class="add-patient">
        <h3>Ajouter un nouveau patient : </h3>
        <form (ngSubmit)="submitPatient($event,addPatientForm)" 
              [formGroup]="addPatientForm" 
              novalidate>
              <table>
                <tr>
                    <td class="label-input">Prenom : </td>
                    <td><input name="patientForname" 
                                formControlName="patientForname"
                                [formControl]="addPatientForm.controls['patientForname']" 
                                required></td>
                </tr>
                <tr>
                    <td class="label-input">Nom : </td>
                    <td><input name="patientName" 
                                formControlName="patientName"
                                [formControl]="addPatientForm.controls['patientName']"  
                                required/></td>
                </tr>
                <tr>
                    <td class="label-input">Numéro de sécurité sociale : </td>
                    <td><input name="patientNumber" 
                                formControlName="patientNumber"
                                [formControl]="addPatientForm.controls['patientNumber']"  
                                required/></td>
                </tr>
                <tr>
                    <td class="label-input">Sexe : </td>
                    <td>
                        <select name="patientSex" 
                                formControlName="patientSex"
                                [formControl]="addPatientForm.controls['patientSex']"  
                                required>
                            <option value="M" selected>Homme</option>
                            <option value="F">Femme</option>    
                        </select>
                    </td>
                </tr>
                <tr>
                    <td class="label-input">Adresse : </td>
                    <td>
                        <composant-maps [composantAddPatient]="this"></composant-maps>
                    </td>
                </tr>
                <tr>
                    <td class="label-input">Rue : </td>
                    <td><input name="patientStreet"
                                formControlName="patientStreet"
                                [formControl]="addPatientForm.controls['patientStreet']"  
                                required #patientStreet/></td>
                </tr>
                <tr>
                    <td class="label-input">Numéro de rue : </td>
                    <td><input name="patientStreetNumber" 
                                formControlName="patientStreetNumber"
                                [formControl]="addPatientForm.controls['patientStreetNumber']"  
                                required #patientStreetNumber/></td>
                </tr>
                <tr>
                    <td class="label-input">Etage : </td>
                    <td><input name="patientFloor"
                                formControlName="patientFloor"
                                [formControl]="addPatientForm.controls['patientFloor']"/></td>
                </tr>
                <tr>
                    <td class="label-input">Code postal : </td>
                    <td><input name="patientPostalCode" 
                                formControlName="patientPostalCode"
                                [formControl]="addPatientForm.controls['patientPostalCode']"  
                                required #patientPostalCode/></td>
                </tr>
                <tr>
                    <td class="label-input">Ville : </td>
                    <td><input name="patientCity" 
                                formControlName="patientCity"
                                [formControl]="addPatientForm.controls['patientCity']"  
                                required #patientCity/></td>
                </tr>
                <tr class="bottom-table">
                    <td></td>
                    <td>
                        <input value="Ajouter Patient" class="ajouter-patient" type="submit"/>
                        <input type="button" class="ajouter-patient" value="Annuler" (click)="annulerAjouterPatient()"/>
                    </td>
                </tr>
              </table>            
        </form>
    </section>
`;
            ComposantAddPatient = class ComposantAddPatient {
                constructor(cms, router, fb) {
                    this.cms = cms;
                    this.router = router;
                    this.fb = fb;
                    this.this = this;
                    this.initDone = false;
                    this.addPatientForm = fb.group({
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
                        this.addPatientForm.controls["patientStreet"].setValue(adresse.rue || "");
                        this.addPatientForm.controls["patientStreetNumber"].setValue(adresse.numero || "");
                        this.addPatientForm.controls["patientCity"].setValue(adresse.ville || "");
                        this.addPatientForm.controls["patientPostalCode"].setValue(adresse.codePostal || "");
                    }
                }
                annulerAjouterPatient() {
                    this.router.navigate(["/secretaire"]);
                }
            };
            __decorate([
                core_1.ViewChild("patientStreet"), 
                __metadata('design:type', core_1.ElementRef)
            ], ComposantAddPatient.prototype, "patientStreet", void 0);
            __decorate([
                core_1.ViewChild("patientStreetNumber"), 
                __metadata('design:type', core_1.ElementRef)
            ], ComposantAddPatient.prototype, "patientStreetNumber", void 0);
            __decorate([
                core_1.ViewChild("patientPostalCode"), 
                __metadata('design:type', core_1.ElementRef)
            ], ComposantAddPatient.prototype, "patientPostalCode", void 0);
            __decorate([
                core_1.ViewChild("patientCity"), 
                __metadata('design:type', core_1.ElementRef)
            ], ComposantAddPatient.prototype, "patientCity", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', ComposantSecretaire_1.ComposantSecretaire)
            ], ComposantAddPatient.prototype, "composantSecretaire", void 0);
            ComposantAddPatient = __decorate([
                core_1.Component({
                    template: htmlTemplate
                }), 
                __metadata('design:paramtypes', [NF.ServiceCabinetMedical, router_1.Router, forms_1.FormBuilder])
            ], ComposantAddPatient);
            exports_1("ComposantAddPatient", ComposantAddPatient);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50QWRkUGF0aWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBU00sWUFBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFBWixZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTBGcEIsQ0FBQztZQUlGO2dCQVNJLFlBQW1CLEdBQTZCLEVBQVUsTUFBZSxFQUFVLEVBQWU7b0JBQS9FLFFBQUcsR0FBSCxHQUFHLENBQTBCO29CQUFVLFdBQU0sR0FBTixNQUFNLENBQVM7b0JBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBYTtvQkFGbEcsU0FBSSxHQUFHLElBQUksQ0FBQztvQkFDWixhQUFRLEdBQWdELEtBQUssQ0FBQztvQkFFMUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO3dCQUMzQixXQUFXLEVBQVcsQ0FBQyxFQUFFLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUM7d0JBQy9DLGNBQWMsRUFBUSxDQUFDLEVBQUUsRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQzt3QkFDL0MsYUFBYSxFQUFTLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO3dCQUMvQyxVQUFVLEVBQVksZ0NBQVEsQ0FBQyxDQUFDO3dCQUNoQyxXQUFXLEVBQVcsQ0FBQyxFQUFFLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUM7d0JBQy9DLGlCQUFpQixFQUFLLENBQUMsSUFBSSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO3dCQUNqRCxhQUFhLEVBQVMsQ0FBQyxFQUFFLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUM7d0JBQy9DLG1CQUFtQixFQUFHLENBQUMsSUFBSSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO3dCQUNqRCxZQUFZLEVBQVUsRUFBRTtxQkFD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LFFBQVEsRUFBRyxZQUFZO2lCQUMxQixDQUFDO29EQVU2QixxQkFBcUI7bUNBVmxEO1lBQ0YscURBaUVDLENBQUEiLCJmaWxlIjoiQ29tcG9uZW50cy9Db21wb3NhbnRBZGRQYXRpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZH0gICAgICAgIGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0NvbXBvc2FudFNlY3JldGFpcmV9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBcIi4vQ29tcG9zYW50U2VjcmV0YWlyZVwiO1xuaW1wb3J0ICogYXMgTkYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XG5pbXBvcnQge05nRm9ybSwgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9yc30gICAgICAgICAgICAgZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge1BhdGllbnRJbnRlcmZhY2V9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBcIkBTZXJ2aWNlcy9jYWJpbmV0TWVkaWNhbFNlcnZpY2VcIjtcbmltcG9ydCB7c2V4ZUVudW19ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tIFwiQFNlcnZpY2VzL2NhYmluZXRNZWRpY2FsU2VydmljZVwiO1xuaW1wb3J0IHtSb3V0ZXJ9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcblxuXG5jb25zdCBodG1sVGVtcGxhdGUgPSBgXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiYWRkLXBhdGllbnRcIj5cbiAgICAgICAgPGgzPkFqb3V0ZXIgdW4gbm91dmVhdSBwYXRpZW50IDogPC9oMz5cbiAgICAgICAgPGZvcm0gKG5nU3VibWl0KT1cInN1Ym1pdFBhdGllbnQoJGV2ZW50LGFkZFBhdGllbnRGb3JtKVwiIFxuICAgICAgICAgICAgICBbZm9ybUdyb3VwXT1cImFkZFBhdGllbnRGb3JtXCIgXG4gICAgICAgICAgICAgIG5vdmFsaWRhdGU+XG4gICAgICAgICAgICAgIDx0YWJsZT5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImxhYmVsLWlucHV0XCI+UHJlbm9tIDogPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCBuYW1lPVwicGF0aWVudEZvcm5hbWVcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwicGF0aWVudEZvcm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xdPVwiYWRkUGF0aWVudEZvcm0uY29udHJvbHNbJ3BhdGllbnRGb3JuYW1lJ11cIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ+PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwibGFiZWwtaW5wdXRcIj5Ob20gOiA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+PGlucHV0IG5hbWU9XCJwYXRpZW50TmFtZVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJwYXRpZW50TmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbF09XCJhZGRQYXRpZW50Rm9ybS5jb250cm9sc1sncGF0aWVudE5hbWUnXVwiICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQvPjwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImxhYmVsLWlucHV0XCI+TnVtw6lybyBkZSBzw6ljdXJpdMOpIHNvY2lhbGUgOiA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+PGlucHV0IG5hbWU9XCJwYXRpZW50TnVtYmVyXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cInBhdGllbnROdW1iZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xdPVwiYWRkUGF0aWVudEZvcm0uY29udHJvbHNbJ3BhdGllbnROdW1iZXInXVwiICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQvPjwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImxhYmVsLWlucHV0XCI+U2V4ZSA6IDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgbmFtZT1cInBhdGllbnRTZXhcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwicGF0aWVudFNleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbF09XCJhZGRQYXRpZW50Rm9ybS5jb250cm9sc1sncGF0aWVudFNleCddXCIgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTVwiIHNlbGVjdGVkPkhvbW1lPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkZcIj5GZW1tZTwvb3B0aW9uPiAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJsYWJlbC1pbnB1dFwiPkFkcmVzc2UgOiA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Y29tcG9zYW50LW1hcHMgW2NvbXBvc2FudEFkZFBhdGllbnRdPVwidGhpc1wiPjwvY29tcG9zYW50LW1hcHM+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImxhYmVsLWlucHV0XCI+UnVlIDogPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCBuYW1lPVwicGF0aWVudFN0cmVldFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cInBhdGllbnRTdHJlZXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xdPVwiYWRkUGF0aWVudEZvcm0uY29udHJvbHNbJ3BhdGllbnRTdHJlZXQnXVwiICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQgI3BhdGllbnRTdHJlZXQvPjwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImxhYmVsLWlucHV0XCI+TnVtw6lybyBkZSBydWUgOiA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+PGlucHV0IG5hbWU9XCJwYXRpZW50U3RyZWV0TnVtYmVyXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cInBhdGllbnRTdHJlZXROdW1iZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xdPVwiYWRkUGF0aWVudEZvcm0uY29udHJvbHNbJ3BhdGllbnRTdHJlZXROdW1iZXInXVwiICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQgI3BhdGllbnRTdHJlZXROdW1iZXIvPjwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImxhYmVsLWlucHV0XCI+RXRhZ2UgOiA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+PGlucHV0IG5hbWU9XCJwYXRpZW50Rmxvb3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJwYXRpZW50Rmxvb3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xdPVwiYWRkUGF0aWVudEZvcm0uY29udHJvbHNbJ3BhdGllbnRGbG9vciddXCIvPjwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImxhYmVsLWlucHV0XCI+Q29kZSBwb3N0YWwgOiA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+PGlucHV0IG5hbWU9XCJwYXRpZW50UG9zdGFsQ29kZVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJwYXRpZW50UG9zdGFsQ29kZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbF09XCJhZGRQYXRpZW50Rm9ybS5jb250cm9sc1sncGF0aWVudFBvc3RhbENvZGUnXVwiICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQgI3BhdGllbnRQb3N0YWxDb2RlLz48L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJsYWJlbC1pbnB1dFwiPlZpbGxlIDogPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCBuYW1lPVwicGF0aWVudENpdHlcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwicGF0aWVudENpdHlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xdPVwiYWRkUGF0aWVudEZvcm0uY29udHJvbHNbJ3BhdGllbnRDaXR5J11cIiAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkICNwYXRpZW50Q2l0eS8+PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0ciBjbGFzcz1cImJvdHRvbS10YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPVwiQWpvdXRlciBQYXRpZW50XCIgY2xhc3M9XCJham91dGVyLXBhdGllbnRcIiB0eXBlPVwic3VibWl0XCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImFqb3V0ZXItcGF0aWVudFwiIHZhbHVlPVwiQW5udWxlclwiIChjbGljayk9XCJhbm51bGVyQWpvdXRlclBhdGllbnQoKVwiLz5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8L3RhYmxlPiAgICAgICAgICAgIFxuICAgICAgICA8L2Zvcm0+XG4gICAgPC9zZWN0aW9uPlxuYDtcbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlXHQ6IGh0bWxUZW1wbGF0ZVxufSlcbmV4cG9ydCBjbGFzcyBDb21wb3NhbnRBZGRQYXRpZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBAVmlld0NoaWxkKFwicGF0aWVudFN0cmVldFwiKSAgICAgICAgIHBhdGllbnRTdHJlZXQgICAgICAgOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoXCJwYXRpZW50U3RyZWV0TnVtYmVyXCIpICAgcGF0aWVudFN0cmVldE51bWJlciA6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZChcInBhdGllbnRQb3N0YWxDb2RlXCIpICAgICBwYXRpZW50UG9zdGFsQ29kZSAgIDogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKFwicGF0aWVudENpdHlcIikgICAgICAgICAgIHBhdGllbnRDaXR5ICAgICAgICAgOiBFbGVtZW50UmVmO1xuICAgIEBJbnB1dCgpIGNvbXBvc2FudFNlY3JldGFpcmUgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBDb21wb3NhbnRTZWNyZXRhaXJlO1xuICAgIGFkZFBhdGllbnRGb3JtICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBGb3JtR3JvdXA7XG4gICAgdGhpcyA9IHRoaXM7XG4gICAgaW5pdERvbmUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY21zOiBORi5TZXJ2aWNlQ2FiaW5ldE1lZGljYWwsIHByaXZhdGUgcm91dGVyIDogUm91dGVyLCBwcml2YXRlIGZiOiBGb3JtQnVpbGRlcikge1xuICAgICAgICB0aGlzLmFkZFBhdGllbnRGb3JtID0gZmIuZ3JvdXAoe1xuICAgICAgICAgICAgcGF0aWVudE5hbWUgICAgICAgICA6IFtcIlwiLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIHBhdGllbnRGb3JuYW1lICAgICAgOiBbXCJcIiwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBwYXRpZW50TnVtYmVyICAgICAgIDogW1wiXCIsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgcGF0aWVudFNleCAgICAgICAgICA6IHNleGVFbnVtLk0sXG4gICAgICAgICAgICBwYXRpZW50Q2l0eSAgICAgICAgIDogW1wiXCIsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgcGF0aWVudFBvc3RhbENvZGUgICA6IFtudWxsLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIHBhdGllbnRTdHJlZXQgICAgICAgOiBbXCJcIiwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBwYXRpZW50U3RyZWV0TnVtYmVyIDogW251bGwsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgcGF0aWVudEZsb29yICAgICAgICA6IFwiXCJcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXREb25lID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3VibWl0UGF0aWVudChldmVudDogRXZlbnQsIGY6IE5nRm9ybSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zb2xlLmxvZyhmKTtcbiAgICAgICAgaWYgKGYudmFsaWQpIHtcbiAgICAgICAgICAgIHRoaXMuY21zLkFqb3V0ZXJQYXRpZW50KGYpLnRoZW4oIChkYXRhUGF0aWVudCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vQWpvdXRlciBsZSBwYXRpZW50IGRhbnMgbGUgY2FiaW5ldFxuICAgICAgICAgICAgICAgIGxldCBwYXRpZW50IDogUGF0aWVudEludGVyZmFjZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbm9tICAgICAgICAgICAgICAgICAgICAgOiBkYXRhUGF0aWVudC5wYXRpZW50TmFtZSAgICAgICAgICB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBwcmVub20gICAgICAgICAgICAgICAgICA6IGRhdGFQYXRpZW50LnBhdGllbnRGb3JuYW1lICAgICAgIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIG51bWVyb1NlY3VyaXRlU29jaWFsZSAgIDogZGF0YVBhdGllbnQucGF0aWVudE51bWJlciAgICAgICAgfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgc2V4ZSAgICAgICAgICAgICAgICAgICAgOiBkYXRhUGF0aWVudC5wYXRpZW50U2V4ICAgICAgICAgICB8fCBzZXhlRW51bS5NLFxuICAgICAgICAgICAgICAgICAgICBhZHJlc3NlICAgICAgICAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpbGxlICAgICAgICAgICAgICAgOiBkYXRhUGF0aWVudC5wYXRpZW50Q2l0eSAgICAgICAgICB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZVBvc3RhbCAgICAgICAgICA6IGRhdGFQYXRpZW50LnBhdGllbnRQb3N0YWxDb2RlICAgIHx8IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBydWUgICAgICAgICAgICAgICAgIDogZGF0YVBhdGllbnQucGF0aWVudFN0cmVldCAgICAgICAgfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bWVybyAgICAgICAgICAgICAgOiBkYXRhUGF0aWVudC5wYXRpZW50U3RyZWV0TnVtYmVyICB8fCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXRhZ2UgICAgICAgICAgICAgICA6IGRhdGFQYXRpZW50LnBhdGllbnRGbG9vciAgICAgICAgIHx8IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3NlY3JldGFpcmVcIl0pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhdGllbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNldEFkcmVzc2UoYWRyZXNzZSA6IGFueSkge1xuICAgICAgICBpZiAoYWRyZXNzZSkge1xuICAgICAgICAgICAgdGhpcy5hZGRQYXRpZW50Rm9ybS5jb250cm9sc1tcInBhdGllbnRTdHJlZXRcIl0gICAgICAgLnNldFZhbHVlKGFkcmVzc2UucnVlICAgICAgIHx8IFwiXCIpO1xuICAgICAgICAgICAgdGhpcy5hZGRQYXRpZW50Rm9ybS5jb250cm9sc1tcInBhdGllbnRTdHJlZXROdW1iZXJcIl0gLnNldFZhbHVlKGFkcmVzc2UubnVtZXJvICAgIHx8IFwiXCIpO1xuICAgICAgICAgICAgdGhpcy5hZGRQYXRpZW50Rm9ybS5jb250cm9sc1tcInBhdGllbnRDaXR5XCJdICAgICAgICAgLnNldFZhbHVlKGFkcmVzc2UudmlsbGUgICAgIHx8IFwiXCIpO1xuICAgICAgICAgICAgdGhpcy5hZGRQYXRpZW50Rm9ybS5jb250cm9sc1tcInBhdGllbnRQb3N0YWxDb2RlXCJdICAgLnNldFZhbHVlKGFkcmVzc2UuY29kZVBvc3RhbHx8IFwiXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGFubnVsZXJBam91dGVyUGF0aWVudCgpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3NlY3JldGFpcmVcIl0pO1xuICAgIH1cbn1cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==
