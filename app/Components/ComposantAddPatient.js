System.register(["@angular/core", "./ComposantSecretaire", "@Services/cabinetMedicalService", "@angular/router"], function(exports_1, context_1) {
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
    var core_1, ComposantSecretaire_1, NF, cabinetMedicalService_1, router_1;
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
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            htmlTemplate = `
        <section class="add-patient">
        <h3>Ajouter un nouveau patient : </h3>
        <form (ngSubmit)="submitPatient(newPatientForm)" 
              #newPatientForm="ngForm" 
              novalidate>
              <table>
                <tr>
                    <td class="label-input">Prenom : </td>
                    <td><input name="patientForname" ngModel required></td>
                </tr>
                <tr>
                    <td class="label-input">Nom : </td>
                    <td><input name="patientName" ngModel required/></td>
                </tr>
                <tr>
                    <td class="label-input">Numéro de sécurité sociale : </td>
                    <td><input name="patientNumber" ngModel required/></td>
                </tr>
                <tr>
                    <td class="label-input">Sexe : </td>
                    <td>
                        <select name="patientSexe" ngModel required>
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
                    <td><input name="patientStreet" ngModel required #patientStreet/></td>
                </tr>
                <tr>
                    <td class="label-input">Numéro de rue : </td>
                    <td><input name="patientStreetNumber" ngModel required #patientStreetNumber/></td>
                </tr>
                <tr>
                    <td class="label-input">Etage : </td>
                    <td><input name="patientFloor" ngModel required/></td>
                </tr>
                <tr>
                    <td class="label-input">Code postal : </td>
                    <td><input name="patientPostalCode" ngModel required #patientPostalCode/></td>
                </tr>
                <tr>
                    <td class="label-input">Ville : </td>
                    <td><input name="patientCity" ngModel required #patientCity/></td>
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
                constructor(cms, router) {
                    this.cms = cms;
                    this.router = router;
                    this.this = this;
                    this.initDone = false;
                }
                ngOnInit() {
                    this.initDone = true;
                }
                submitPatient(f) {
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
                        this.patientStreet.nativeElement.value = adresse.rue || "";
                        this.patientStreetNumber.nativeElement.value = adresse.numero || "";
                        this.patientCity.nativeElement.value = adresse.ville || "";
                        this.patientPostalCode.nativeElement.value = adresse.codePostal || "";
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
                __metadata('design:paramtypes', [NF.ServiceCabinetMedical, router_1.Router])
            ], ComposantAddPatient);
            exports_1("ComposantAddPatient", ComposantAddPatient);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50QWRkUGF0aWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBU00sWUFBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFBWixZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FnRXBCLENBQUM7WUFJRjtnQkFRSSxZQUFtQixHQUE2QixFQUFVLE1BQWU7b0JBQXRELFFBQUcsR0FBSCxHQUFHLENBQTBCO29CQUFVLFdBQU0sR0FBTixNQUFNLENBQVM7b0JBRnpFLFNBQUksR0FBRyxJQUFJLENBQUM7b0JBQ1osYUFBUSxHQUFnRCxLQUFLLENBQUM7Z0JBRzlELENBQUM7Z0JBQ0QsUUFBUTtvQkFDSixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDekIsQ0FBQztnQkFFTSxhQUFhLENBQUMsQ0FBUztvQkFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDZixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDVixJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUUsQ0FBQyxXQUFXOzRCQUN6QyxvQ0FBb0M7NEJBQ3BDLElBQUksT0FBTyxHQUFzQjtnQ0FDN0IsR0FBRyxFQUF1QixXQUFXLENBQUMsV0FBVyxJQUFhLEVBQUU7Z0NBQ2hFLE1BQU0sRUFBb0IsV0FBVyxDQUFDLGNBQWMsSUFBVSxFQUFFO2dDQUNoRSxxQkFBcUIsRUFBSyxXQUFXLENBQUMsYUFBYSxJQUFXLEVBQUU7Z0NBQ2hFLElBQUksRUFBc0IsV0FBVyxDQUFDLFVBQVUsSUFBYyxnQ0FBUSxDQUFDLENBQUM7Z0NBQ3hFLE9BQU8sRUFBbUI7b0NBQ3RCLEtBQUssRUFBaUIsV0FBVyxDQUFDLFdBQVcsSUFBYSxFQUFFO29DQUM1RCxVQUFVLEVBQVksV0FBVyxDQUFDLGlCQUFpQixJQUFPLElBQUk7b0NBQzlELEdBQUcsRUFBbUIsV0FBVyxDQUFDLGFBQWEsSUFBVyxFQUFFO29DQUM1RCxNQUFNLEVBQWdCLFdBQVcsQ0FBQyxtQkFBbUIsSUFBSyxJQUFJO29DQUM5RCxLQUFLLEVBQWlCLFdBQVcsQ0FBQyxZQUFZLElBQVksRUFBRTtpQ0FDL0Q7NkJBQ0osQ0FBQzs0QkFDRixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7NEJBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3pCLENBQUMsQ0FBQyxDQUFDO29CQUNQLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDekIsQ0FBQztnQkFDTCxDQUFDO2dCQUVNLFVBQVUsQ0FBQyxPQUFhO29CQUMzQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3dCQUNWLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBWSxPQUFPLENBQUMsR0FBRyxJQUFVLEVBQUUsQ0FBQzt3QkFDMUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQU0sT0FBTyxDQUFDLE1BQU0sSUFBTyxFQUFFLENBQUM7d0JBQzFFLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBYyxPQUFPLENBQUMsS0FBSyxJQUFRLEVBQUUsQ0FBQzt3QkFDMUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQVEsT0FBTyxDQUFDLFVBQVUsSUFBRyxFQUFFLENBQUM7b0JBQzlFLENBQUM7Z0JBQ0wsQ0FBQztnQkFFTSxxQkFBcUI7b0JBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDMUMsQ0FBQztZQUNMLENBQUM7WUFwREc7Z0JBQUMsZ0JBQVMsQ0FBQyxlQUFlLENBQUM7O3NFQUFBO1lBQzNCO2dCQUFDLGdCQUFTLENBQUMscUJBQXFCLENBQUM7OzRFQUFBO1lBQ2pDO2dCQUFDLGdCQUFTLENBQUMsbUJBQW1CLENBQUM7OzBFQUFBO1lBQy9CO2dCQUFDLGdCQUFTLENBQUMsYUFBYSxDQUFDOztvRUFBQTtZQUN6QjtnQkFBQyxZQUFLLEVBQUU7OzRFQUFBO1lBUlo7Z0JBQUMsZ0JBQVMsQ0FBQztvQkFDUCxRQUFRLEVBQUcsWUFBWTtpQkFDMUIsQ0FBQztvREFTNkIscUJBQXFCO21DQVRsRDtZQUNGLHFEQXFEQyxDQUFBIiwiZmlsZSI6IkNvbXBvbmVudHMvQ29tcG9zYW50QWRkUGF0aWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIElucHV0LCBFbGVtZW50UmVmLCBWaWV3Q2hpbGR9ICAgZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Q29tcG9zYW50U2VjcmV0YWlyZX0gICAgICAgICAgICAgICAgICAgIGZyb20gXCIuL0NvbXBvc2FudFNlY3JldGFpcmVcIjtcbmltcG9ydCAqIGFzIE5GICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XG5pbXBvcnQge05nRm9ybX0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7UGF0aWVudEludGVyZmFjZX0gICAgICAgICAgICAgICAgICAgICAgIGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XG5pbXBvcnQge3NleGVFbnVtfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tIFwiQFNlcnZpY2VzL2NhYmluZXRNZWRpY2FsU2VydmljZVwiO1xuaW1wb3J0IHtSb3V0ZXJ9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuXG5cbmNvbnN0IGh0bWxUZW1wbGF0ZSA9IGBcbiAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJhZGQtcGF0aWVudFwiPlxuICAgICAgICA8aDM+QWpvdXRlciB1biBub3V2ZWF1IHBhdGllbnQgOiA8L2gzPlxuICAgICAgICA8Zm9ybSAobmdTdWJtaXQpPVwic3VibWl0UGF0aWVudChuZXdQYXRpZW50Rm9ybSlcIiBcbiAgICAgICAgICAgICAgI25ld1BhdGllbnRGb3JtPVwibmdGb3JtXCIgXG4gICAgICAgICAgICAgIG5vdmFsaWRhdGU+XG4gICAgICAgICAgICAgIDx0YWJsZT5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImxhYmVsLWlucHV0XCI+UHJlbm9tIDogPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCBuYW1lPVwicGF0aWVudEZvcm5hbWVcIiBuZ01vZGVsIHJlcXVpcmVkPjwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImxhYmVsLWlucHV0XCI+Tm9tIDogPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCBuYW1lPVwicGF0aWVudE5hbWVcIiBuZ01vZGVsIHJlcXVpcmVkLz48L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJsYWJlbC1pbnB1dFwiPk51bcOpcm8gZGUgc8OpY3VyaXTDqSBzb2NpYWxlIDogPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCBuYW1lPVwicGF0aWVudE51bWJlclwiIG5nTW9kZWwgcmVxdWlyZWQvPjwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImxhYmVsLWlucHV0XCI+U2V4ZSA6IDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgbmFtZT1cInBhdGllbnRTZXhlXCIgbmdNb2RlbCByZXF1aXJlZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTVwiIHNlbGVjdGVkPkhvbW1lPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkZcIj5GZW1tZTwvb3B0aW9uPiAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJsYWJlbC1pbnB1dFwiPkFkcmVzc2UgOiA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Y29tcG9zYW50LW1hcHMgW2NvbXBvc2FudEFkZFBhdGllbnRdPVwidGhpc1wiPjwvY29tcG9zYW50LW1hcHM+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImxhYmVsLWlucHV0XCI+UnVlIDogPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCBuYW1lPVwicGF0aWVudFN0cmVldFwiIG5nTW9kZWwgcmVxdWlyZWQgI3BhdGllbnRTdHJlZXQvPjwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImxhYmVsLWlucHV0XCI+TnVtw6lybyBkZSBydWUgOiA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+PGlucHV0IG5hbWU9XCJwYXRpZW50U3RyZWV0TnVtYmVyXCIgbmdNb2RlbCByZXF1aXJlZCAjcGF0aWVudFN0cmVldE51bWJlci8+PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwibGFiZWwtaW5wdXRcIj5FdGFnZSA6IDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD48aW5wdXQgbmFtZT1cInBhdGllbnRGbG9vclwiIG5nTW9kZWwgcmVxdWlyZWQvPjwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImxhYmVsLWlucHV0XCI+Q29kZSBwb3N0YWwgOiA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+PGlucHV0IG5hbWU9XCJwYXRpZW50UG9zdGFsQ29kZVwiIG5nTW9kZWwgcmVxdWlyZWQgI3BhdGllbnRQb3N0YWxDb2RlLz48L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJsYWJlbC1pbnB1dFwiPlZpbGxlIDogPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCBuYW1lPVwicGF0aWVudENpdHlcIiBuZ01vZGVsIHJlcXVpcmVkICNwYXRpZW50Q2l0eS8+PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0ciBjbGFzcz1cImJvdHRvbS10YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPVwiQWpvdXRlciBQYXRpZW50XCIgY2xhc3M9XCJham91dGVyLXBhdGllbnRcIiB0eXBlPVwic3VibWl0XCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImFqb3V0ZXItcGF0aWVudFwiIHZhbHVlPVwiQW5udWxlclwiIChjbGljayk9XCJhbm51bGVyQWpvdXRlclBhdGllbnQoKVwiLz5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8L3RhYmxlPiAgICAgICAgICAgIFxuICAgICAgICA8L2Zvcm0+XG4gICAgPC9zZWN0aW9uPlxuYDtcbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlXHQ6IGh0bWxUZW1wbGF0ZVxufSlcbmV4cG9ydCBjbGFzcyBDb21wb3NhbnRBZGRQYXRpZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBAVmlld0NoaWxkKFwicGF0aWVudFN0cmVldFwiKSAgICAgICAgIHBhdGllbnRTdHJlZXQgICAgICAgOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoXCJwYXRpZW50U3RyZWV0TnVtYmVyXCIpICAgcGF0aWVudFN0cmVldE51bWJlciA6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZChcInBhdGllbnRQb3N0YWxDb2RlXCIpICAgICBwYXRpZW50UG9zdGFsQ29kZSAgIDogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKFwicGF0aWVudENpdHlcIikgICAgICAgICAgIHBhdGllbnRDaXR5ICAgICAgICAgOiBFbGVtZW50UmVmO1xuICAgIEBJbnB1dCgpIGNvbXBvc2FudFNlY3JldGFpcmUgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBDb21wb3NhbnRTZWNyZXRhaXJlO1xuICAgIHRoaXMgPSB0aGlzO1xuICAgIGluaXREb25lICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBib29sZWFuID0gZmFsc2U7XG4gICAgY29uc3RydWN0b3IocHVibGljIGNtczogTkYuU2VydmljZUNhYmluZXRNZWRpY2FsLCBwcml2YXRlIHJvdXRlciA6IFJvdXRlcikge1xuXG4gICAgfVxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXREb25lID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3VibWl0UGF0aWVudChmOiBOZ0Zvcm0pIHtcbiAgICAgICAgY29uc29sZS5sb2coZik7XG4gICAgICAgIGlmIChmLnZhbGlkKSB7XG4gICAgICAgICAgICB0aGlzLmNtcy5Bam91dGVyUGF0aWVudChmKS50aGVuKCAoZGF0YVBhdGllbnQpID0+IHtcbiAgICAgICAgICAgICAgICAvL0Fqb3V0ZXIgbGUgcGF0aWVudCBkYW5zIGxlIGNhYmluZXRcbiAgICAgICAgICAgICAgICBsZXQgcGF0aWVudCA6IFBhdGllbnRJbnRlcmZhY2UgPSB7XG4gICAgICAgICAgICAgICAgICAgIG5vbSAgICAgICAgICAgICAgICAgICAgIDogZGF0YVBhdGllbnQucGF0aWVudE5hbWUgICAgICAgICAgfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgcHJlbm9tICAgICAgICAgICAgICAgICAgOiBkYXRhUGF0aWVudC5wYXRpZW50Rm9ybmFtZSAgICAgICB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBudW1lcm9TZWN1cml0ZVNvY2lhbGUgICA6IGRhdGFQYXRpZW50LnBhdGllbnROdW1iZXIgICAgICAgIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIHNleGUgICAgICAgICAgICAgICAgICAgIDogZGF0YVBhdGllbnQucGF0aWVudFNleCAgICAgICAgICAgfHwgc2V4ZUVudW0uTSxcbiAgICAgICAgICAgICAgICAgICAgYWRyZXNzZSAgICAgICAgICAgICAgICAgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWxsZSAgICAgICAgICAgICAgIDogZGF0YVBhdGllbnQucGF0aWVudENpdHkgICAgICAgICAgfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVQb3N0YWwgICAgICAgICAgOiBkYXRhUGF0aWVudC5wYXRpZW50UG9zdGFsQ29kZSAgICB8fCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgcnVlICAgICAgICAgICAgICAgICA6IGRhdGFQYXRpZW50LnBhdGllbnRTdHJlZXQgICAgICAgIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBudW1lcm8gICAgICAgICAgICAgIDogZGF0YVBhdGllbnQucGF0aWVudFN0cmVldE51bWJlciAgfHwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV0YWdlICAgICAgICAgICAgICAgOiBkYXRhUGF0aWVudC5wYXRpZW50Rmxvb3IgICAgICAgICB8fCBcIlwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9zZWNyZXRhaXJlXCJdKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwYXRpZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvclwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRBZHJlc3NlKGFkcmVzc2UgOiBhbnkpIHtcbiAgICAgICAgaWYgKGFkcmVzc2UpIHtcbiAgICAgICAgICAgIHRoaXMucGF0aWVudFN0cmVldC5uYXRpdmVFbGVtZW50LnZhbHVlICAgICAgICAgID0gYWRyZXNzZS5ydWUgICAgICAgfHwgXCJcIjtcbiAgICAgICAgICAgIHRoaXMucGF0aWVudFN0cmVldE51bWJlci5uYXRpdmVFbGVtZW50LnZhbHVlICAgID0gYWRyZXNzZS5udW1lcm8gICAgfHwgXCJcIjtcbiAgICAgICAgICAgIHRoaXMucGF0aWVudENpdHkubmF0aXZlRWxlbWVudC52YWx1ZSAgICAgICAgICAgID0gYWRyZXNzZS52aWxsZSAgICAgfHwgXCJcIjtcbiAgICAgICAgICAgIHRoaXMucGF0aWVudFBvc3RhbENvZGUubmF0aXZlRWxlbWVudC52YWx1ZSAgICAgID0gYWRyZXNzZS5jb2RlUG9zdGFsfHwgXCJcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhbm51bGVyQWpvdXRlclBhdGllbnQoKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9zZWNyZXRhaXJlXCJdKTtcbiAgICB9XG59XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=
