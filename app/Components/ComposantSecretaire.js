System.register(["@Services/cabinetMedicalService", "@angular/core"], function(exports_1, context_1) {
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
    var NF, core_1, cabinetMedicalService_1;
    var htmlTemplate, ComposantSecretaire;
    return {
        setters:[
            function (NF_1) {
                NF = NF_1;
                cabinetMedicalService_1 = NF_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            htmlTemplate = `
    <h1 alx-dragdrop>IHM de la secrétaire</h1>
    <p *ngIf="!initDone">CHARGEMENT...</p>
    <section *ngIf="initDone && !addPatient" class="cabinet">
        <h2>Mon beau cabinet médical</h2>
        <br/><br/>
        <input class="ajouter-patient" type="button" name="ajouter-patient" value=" + Ajouter un patient" (click)="ajouterPatient()"/>
        
        <h2>Les infirmiers : </h2>
        <div *ngFor="let infirmier of cabinet.infirmiers"
                                alx-dropzone
                                [alx-accept-fct]="acceptPatient"
                                alx-dragstart-css="drag-start-infirmier"
                                alx-draghover-css="drag-hover-infirmier"
                                (alx-ondrop)="affecterPatient($event, infirmier)">
            <composant-infirmier [infirmier]="infirmier"></composant-infirmier>
        </div>
        
        
        <h2>Les patients non affectés : </h2>
        
        <div *ngFor="let patient of cabinet.patientsNonAffectes">
            <composant-patient [patient]="patient" [alx-draggable]="patient"></composant-patient>
        </div>
        
    </section>
    <section *ngIf="addPatient" class="add-patient">
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
                        <input name="adresse" required><br/>
                            <composant-maps [composantSecretaire]="this"></composant-maps>
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
            ComposantSecretaire = class ComposantSecretaire {
                constructor(cms) {
                    this.cms = cms;
                    this.initDone = false;
                    this.addPatient = false;
                    this.adresse = {};
                    this.this = this;
                    this.acceptPatient = (data) => {
                        if (data.nom && data.prenom && data.numeroSecuriteSociale) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    };
                }
                ngOnInit() {
                    //console.log("Appelez le service pour formatter et obtenir les données du cabinet\n", this);
                    this.cms.getData("/data/cabinetInfirmier.xml").then((cabinet) => {
                        console.log("\t=> cabinetJS:", cabinet);
                        this.cabinet = cabinet;
                        this.initDone = true;
                    }, (err) => { console.error("Erreur lors du chargement du cabinet", "/data/cabinetInfirmier.xml", "\n", err); });
                }
                affecterPatient(patient, infirmier) {
                    this.cms.affecterPatient(patient.numeroSecuriteSociale, infirmier.id);
                    this.desaffecterPatient(patient, this.cabinet.infirmiers);
                    infirmier.patients.push(patient);
                }
                desaffecterPatient(patient, infirmiers) {
                    for (let inf of infirmiers) {
                        if (inf.patients.indexOf(patient) !== -1) {
                            inf.patients.splice(inf.patients.indexOf(patient), 1);
                        }
                    }
                    if (this.cabinet.patientsNonAffectes.indexOf(patient) !== -1)
                        this.cabinet.patientsNonAffectes.splice(this.cabinet.patientsNonAffectes.indexOf(patient), 1);
                }
                annulerAjouterPatient() {
                    this.addPatient = false;
                }
                ajouterPatient() {
                    this.addPatient = true;
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
                            this.cabinet.patientsNonAffectes.push(patient);
                            this.addPatient = false;
                            console.log(dataPatient);
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
            };
            __decorate([
                core_1.ViewChild("patientStreet"), 
                __metadata('design:type', core_1.ElementRef)
            ], ComposantSecretaire.prototype, "patientStreet", void 0);
            __decorate([
                core_1.ViewChild("patientStreetNumber"), 
                __metadata('design:type', core_1.ElementRef)
            ], ComposantSecretaire.prototype, "patientStreetNumber", void 0);
            __decorate([
                core_1.ViewChild("patientPostalCode"), 
                __metadata('design:type', core_1.ElementRef)
            ], ComposantSecretaire.prototype, "patientPostalCode", void 0);
            __decorate([
                core_1.ViewChild("patientCity"), 
                __metadata('design:type', core_1.ElementRef)
            ], ComposantSecretaire.prototype, "patientCity", void 0);
            ComposantSecretaire = __decorate([
                core_1.Component({
                    selector: "composant-secretaire",
                    template: htmlTemplate,
                }), 
                __metadata('design:paramtypes', [NF.ServiceCabinetMedical])
            ], ComposantSecretaire);
            exports_1("ComposantSecretaire", ComposantSecretaire);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50U2VjcmV0YWlyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBT00sWUFBWTs7Ozs7Ozs7Ozs7WUFBWixZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTBGcEIsQ0FBQztZQUtGO2dCQVVJLFlBQXFCLEdBQTZCO29CQUE3QixRQUFHLEdBQUgsR0FBRyxDQUEwQjtvQkFMbEQsYUFBUSxHQUFnRCxLQUFLLENBQUM7b0JBRXZELGVBQVUsR0FBdUMsS0FBSyxDQUFDO29CQUN2RCxZQUFPLEdBQXNDLEVBQUUsQ0FBQztvQkFDdkQsU0FBSSxHQUFHLElBQUksQ0FBQztvQkFZTCxrQkFBYSxHQUFHLENBQUMsSUFBSTt3QkFDeEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7NEJBQ3hELE1BQU0sQ0FBQyxJQUFJLENBQUM7d0JBQ2hCLENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ0osTUFBTSxDQUFDLEtBQUssQ0FBQzt3QkFDakIsQ0FBQztvQkFDTCxDQUFDLENBQUM7Z0JBaEJGLENBQUM7Z0JBQ0QsUUFBUTtvQkFDSiw2RkFBNkY7b0JBQzdGLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFFLDRCQUE0QixDQUFFLENBQUMsSUFBSSxDQUFFLENBQUMsT0FBNEI7d0JBQ2hGLE9BQU8sQ0FBQyxHQUFHLENBQUUsaUJBQWlCLEVBQUUsT0FBTyxDQUFFLENBQUM7d0JBQzFDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO3dCQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztvQkFDekIsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFN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Q0FBQyxDQUFDO3dCQUMxQixDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3pCLENBQUM7Z0JBQ0wsQ0FBQztnQkFFTSxVQUFVLENBQUMsT0FBYTtvQkFDM0IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDVixJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQVksT0FBTyxDQUFDLEdBQUcsSUFBVSxFQUFFLENBQUM7d0JBQzFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFNLE9BQU8sQ0FBQyxNQUFNLElBQU8sRUFBRSxDQUFDO3dCQUMxRSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQWMsT0FBTyxDQUFDLEtBQUssSUFBUSxFQUFFLENBQUM7d0JBQzFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFRLE9BQU8sQ0FBQyxVQUFVLElBQUcsRUFBRSxDQUFDO29CQUM5RSxDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDO1lBdkZHO2dCQUFDLGdCQUFTLENBQUMsZUFBZSxDQUFDOztzRUFBQTtZQUMzQjtnQkFBQyxnQkFBUyxDQUFDLHFCQUFxQixDQUFDOzs0RUFBQTtZQUNqQztnQkFBQyxnQkFBUyxDQUFDLG1CQUFtQixDQUFDOzswRUFBQTtZQUMvQjtnQkFBQyxnQkFBUyxDQUFDLGFBQWEsQ0FBQzs7b0VBQUE7WUFSN0I7Z0JBQUMsZ0JBQVMsQ0FBQztvQkFDUCxRQUFRLEVBQUcsc0JBQXNCO29CQUNqQyxRQUFRLEVBQUcsWUFBWTtpQkFDMUIsQ0FBQztvREFXK0IscUJBQXFCO21DQVhwRDtZQUNGLHFEQXdGQyxDQUFBIiwiZmlsZSI6IkNvbXBvbmVudHMvQ29tcG9zYW50U2VjcmV0YWlyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIE5GIGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XG5pbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0luZmlybWllckludGVyZmFjZX0gZnJvbSBcIkBTZXJ2aWNlcy9jYWJpbmV0TWVkaWNhbFNlcnZpY2VcIjtcbmltcG9ydCB7c2V4ZUVudW19IGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XG5pbXBvcnQge1BhdGllbnRJbnRlcmZhY2V9IGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XG5pbXBvcnQge05nRm9ybX0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5cbmNvbnN0IGh0bWxUZW1wbGF0ZSA9IGBcbiAgICA8aDEgYWx4LWRyYWdkcm9wPklITSBkZSBsYSBzZWNyw6l0YWlyZTwvaDE+XG4gICAgPHAgKm5nSWY9XCIhaW5pdERvbmVcIj5DSEFSR0VNRU5ULi4uPC9wPlxuICAgIDxzZWN0aW9uICpuZ0lmPVwiaW5pdERvbmUgJiYgIWFkZFBhdGllbnRcIiBjbGFzcz1cImNhYmluZXRcIj5cbiAgICAgICAgPGgyPk1vbiBiZWF1IGNhYmluZXQgbcOpZGljYWw8L2gyPlxuICAgICAgICA8YnIvPjxici8+XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cImFqb3V0ZXItcGF0aWVudFwiIHR5cGU9XCJidXR0b25cIiBuYW1lPVwiYWpvdXRlci1wYXRpZW50XCIgdmFsdWU9XCIgKyBBam91dGVyIHVuIHBhdGllbnRcIiAoY2xpY2spPVwiYWpvdXRlclBhdGllbnQoKVwiLz5cbiAgICAgICAgXG4gICAgICAgIDxoMj5MZXMgaW5maXJtaWVycyA6IDwvaDI+XG4gICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGluZmlybWllciBvZiBjYWJpbmV0LmluZmlybWllcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHgtZHJvcHpvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2FseC1hY2NlcHQtZmN0XT1cImFjY2VwdFBhdGllbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHgtZHJhZ3N0YXJ0LWNzcz1cImRyYWctc3RhcnQtaW5maXJtaWVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx4LWRyYWdob3Zlci1jc3M9XCJkcmFnLWhvdmVyLWluZmlybWllclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhbHgtb25kcm9wKT1cImFmZmVjdGVyUGF0aWVudCgkZXZlbnQsIGluZmlybWllcilcIj5cbiAgICAgICAgICAgIDxjb21wb3NhbnQtaW5maXJtaWVyIFtpbmZpcm1pZXJdPVwiaW5maXJtaWVyXCI+PC9jb21wb3NhbnQtaW5maXJtaWVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICA8aDI+TGVzIHBhdGllbnRzIG5vbiBhZmZlY3TDqXMgOiA8L2gyPlxuICAgICAgICBcbiAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgcGF0aWVudCBvZiBjYWJpbmV0LnBhdGllbnRzTm9uQWZmZWN0ZXNcIj5cbiAgICAgICAgICAgIDxjb21wb3NhbnQtcGF0aWVudCBbcGF0aWVudF09XCJwYXRpZW50XCIgW2FseC1kcmFnZ2FibGVdPVwicGF0aWVudFwiPjwvY29tcG9zYW50LXBhdGllbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICA8L3NlY3Rpb24+XG4gICAgPHNlY3Rpb24gKm5nSWY9XCJhZGRQYXRpZW50XCIgY2xhc3M9XCJhZGQtcGF0aWVudFwiPlxuICAgICAgICA8aDM+QWpvdXRlciB1biBub3V2ZWF1IHBhdGllbnQgOiA8L2gzPlxuICAgICAgICA8Zm9ybSAobmdTdWJtaXQpPVwic3VibWl0UGF0aWVudChuZXdQYXRpZW50Rm9ybSlcIiBcbiAgICAgICAgICAgICAgI25ld1BhdGllbnRGb3JtPVwibmdGb3JtXCIgXG4gICAgICAgICAgICAgIG5vdmFsaWRhdGU+XG4gICAgICAgICAgICAgIDx0YWJsZT5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImxhYmVsLWlucHV0XCI+UHJlbm9tIDogPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCBuYW1lPVwicGF0aWVudEZvcm5hbWVcIiBuZ01vZGVsIHJlcXVpcmVkPjwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImxhYmVsLWlucHV0XCI+Tm9tIDogPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCBuYW1lPVwicGF0aWVudE5hbWVcIiBuZ01vZGVsIHJlcXVpcmVkLz48L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJsYWJlbC1pbnB1dFwiPk51bcOpcm8gZGUgc8OpY3VyaXTDqSBzb2NpYWxlIDogPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCBuYW1lPVwicGF0aWVudE51bWJlclwiIG5nTW9kZWwgcmVxdWlyZWQvPjwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImxhYmVsLWlucHV0XCI+U2V4ZSA6IDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgbmFtZT1cInBhdGllbnRTZXhlXCIgbmdNb2RlbCByZXF1aXJlZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTVwiIHNlbGVjdGVkPkhvbW1lPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkZcIj5GZW1tZTwvb3B0aW9uPiAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJsYWJlbC1pbnB1dFwiPkFkcmVzc2UgOiA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbmFtZT1cImFkcmVzc2VcIiByZXF1aXJlZD48YnIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjb21wb3NhbnQtbWFwcyBbY29tcG9zYW50U2VjcmV0YWlyZV09XCJ0aGlzXCI+PC9jb21wb3NhbnQtbWFwcz5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwibGFiZWwtaW5wdXRcIj5SdWUgOiA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+PGlucHV0IG5hbWU9XCJwYXRpZW50U3RyZWV0XCIgbmdNb2RlbCByZXF1aXJlZCAjcGF0aWVudFN0cmVldC8+PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwibGFiZWwtaW5wdXRcIj5OdW3DqXJvIGRlIHJ1ZSA6IDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD48aW5wdXQgbmFtZT1cInBhdGllbnRTdHJlZXROdW1iZXJcIiBuZ01vZGVsIHJlcXVpcmVkICNwYXRpZW50U3RyZWV0TnVtYmVyLz48L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJsYWJlbC1pbnB1dFwiPkV0YWdlIDogPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCBuYW1lPVwicGF0aWVudEZsb29yXCIgbmdNb2RlbCByZXF1aXJlZC8+PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwibGFiZWwtaW5wdXRcIj5Db2RlIHBvc3RhbCA6IDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD48aW5wdXQgbmFtZT1cInBhdGllbnRQb3N0YWxDb2RlXCIgbmdNb2RlbCByZXF1aXJlZCAjcGF0aWVudFBvc3RhbENvZGUvPjwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImxhYmVsLWlucHV0XCI+VmlsbGUgOiA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+PGlucHV0IG5hbWU9XCJwYXRpZW50Q2l0eVwiIG5nTW9kZWwgcmVxdWlyZWQgI3BhdGllbnRDaXR5Lz48L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyIGNsYXNzPVwiYm90dG9tLXRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD48L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9XCJBam91dGVyIFBhdGllbnRcIiBjbGFzcz1cImFqb3V0ZXItcGF0aWVudFwiIHR5cGU9XCJzdWJtaXRcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYWpvdXRlci1wYXRpZW50XCIgdmFsdWU9XCJBbm51bGVyXCIgKGNsaWNrKT1cImFubnVsZXJBam91dGVyUGF0aWVudCgpXCIvPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDwvdGFibGU+ICAgICAgICAgICAgXG4gICAgICAgIDwvZm9ybT5cbiAgICA8L3NlY3Rpb24+XG5gO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3JcdDogXCJjb21wb3NhbnQtc2VjcmV0YWlyZVwiLFxuICAgIHRlbXBsYXRlXHQ6IGh0bWxUZW1wbGF0ZSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tcG9zYW50U2VjcmV0YWlyZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQFZpZXdDaGlsZChcInBhdGllbnRTdHJlZXRcIikgICAgICAgICBwYXRpZW50U3RyZWV0ICAgICAgIDogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKFwicGF0aWVudFN0cmVldE51bWJlclwiKSAgIHBhdGllbnRTdHJlZXROdW1iZXIgOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoXCJwYXRpZW50UG9zdGFsQ29kZVwiKSAgICAgcGF0aWVudFBvc3RhbENvZGUgICA6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZChcInBhdGllbnRDaXR5XCIpICAgICAgICAgICBwYXRpZW50Q2l0eSAgICAgICAgIDogRWxlbWVudFJlZjtcbiAgICBpbml0RG9uZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBjYWJpbmV0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBORi5DYWJpbmV0SW50ZXJmYWNlO1xuICAgIHB1YmxpYyBhZGRQYXRpZW50ICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGFkcmVzc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGFueSA9IHt9O1xuICAgIHRoaXMgPSB0aGlzO1xuICAgIGNvbnN0cnVjdG9yXHRcdChwdWJsaWMgY21zOiBORi5TZXJ2aWNlQ2FiaW5ldE1lZGljYWwpIHsgLy8gQ2UgY29tcG9zYW50IGTDqXBlbmQgZHUgc2VydmljZSBkZSBjYWJpbmV0IG3DqWRpY2FsXG4gICAgfVxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiQXBwZWxleiBsZSBzZXJ2aWNlIHBvdXIgZm9ybWF0dGVyIGV0IG9idGVuaXIgbGVzIGRvbm7DqWVzIGR1IGNhYmluZXRcXG5cIiwgdGhpcyk7XG4gICAgICAgIHRoaXMuY21zLmdldERhdGEoIFwiL2RhdGEvY2FiaW5ldEluZmlybWllci54bWxcIiApLnRoZW4oIChjYWJpbmV0OiBORi5DYWJpbmV0SW50ZXJmYWNlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyggXCJcXHQ9PiBjYWJpbmV0SlM6XCIsIGNhYmluZXQgKTtcbiAgICAgICAgICAgIHRoaXMuY2FiaW5ldCA9IGNhYmluZXQ7XG4gICAgICAgICAgICB0aGlzLmluaXREb25lID0gdHJ1ZTtcbiAgICAgICAgfSwgKGVycikgPT4ge2NvbnNvbGUuZXJyb3IoXCJFcnJldXIgbG9ycyBkdSBjaGFyZ2VtZW50IGR1IGNhYmluZXRcIiwgXCIvZGF0YS9jYWJpbmV0SW5maXJtaWVyLnhtbFwiLCBcIlxcblwiLCBlcnIpO30pO1xuICAgIH1cblxuICAgIHB1YmxpYyBhY2NlcHRQYXRpZW50ID0gKGRhdGEpID0+IHtcbiAgICAgICAgaWYgKGRhdGEubm9tICYmIGRhdGEucHJlbm9tICYmIGRhdGEubnVtZXJvU2VjdXJpdGVTb2NpYWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBwdWJsaWMgYWZmZWN0ZXJQYXRpZW50KHBhdGllbnQ6IFBhdGllbnRJbnRlcmZhY2UsIGluZmlybWllcjogSW5maXJtaWVySW50ZXJmYWNlKSB7XG4gICAgICAgIHRoaXMuY21zLmFmZmVjdGVyUGF0aWVudChwYXRpZW50Lm51bWVyb1NlY3VyaXRlU29jaWFsZSwgaW5maXJtaWVyLmlkKTtcbiAgICAgICAgdGhpcy5kZXNhZmZlY3RlclBhdGllbnQocGF0aWVudCwgdGhpcy5jYWJpbmV0LmluZmlybWllcnMpO1xuICAgICAgICBpbmZpcm1pZXIucGF0aWVudHMucHVzaChwYXRpZW50KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVzYWZmZWN0ZXJQYXRpZW50KHBhdGllbnQsIGluZmlybWllcnM6IEluZmlybWllckludGVyZmFjZVtdKSB7XG4gICAgICAgIGZvciAobGV0IGluZiBvZiBpbmZpcm1pZXJzKSB7XG4gICAgICAgICAgICBpZiAoaW5mLnBhdGllbnRzLmluZGV4T2YocGF0aWVudCkgIT09IC0gMSkge1xuICAgICAgICAgICAgICAgIGluZi5wYXRpZW50cy5zcGxpY2UoaW5mLnBhdGllbnRzLmluZGV4T2YocGF0aWVudCksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNhYmluZXQucGF0aWVudHNOb25BZmZlY3Rlcy5pbmRleE9mKHBhdGllbnQpICE9PSAtMSlcbiAgICAgICAgICAgIHRoaXMuY2FiaW5ldC5wYXRpZW50c05vbkFmZmVjdGVzLnNwbGljZSh0aGlzLmNhYmluZXQucGF0aWVudHNOb25BZmZlY3Rlcy5pbmRleE9mKHBhdGllbnQpLCAxKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYW5udWxlckFqb3V0ZXJQYXRpZW50KCkge1xuICAgICAgICB0aGlzLmFkZFBhdGllbnQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWpvdXRlclBhdGllbnQoKSB7XG4gICAgICAgIHRoaXMuYWRkUGF0aWVudCA9IHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIHN1Ym1pdFBhdGllbnQoZjogTmdGb3JtKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGYpO1xuICAgICAgICBpZiAoZi52YWxpZCkge1xuICAgICAgICAgICAgdGhpcy5jbXMuQWpvdXRlclBhdGllbnQoZikudGhlbiggKGRhdGFQYXRpZW50KSA9PiB7XG4gICAgICAgICAgICAgLy9Bam91dGVyIGxlIHBhdGllbnQgZGFucyBsZSBjYWJpbmV0XG4gICAgICAgICAgICAgICAgbGV0IHBhdGllbnQgOiBQYXRpZW50SW50ZXJmYWNlID0ge1xuICAgICAgICAgICAgICAgICAgICBub20gICAgICAgICAgICAgICAgICAgICA6IGRhdGFQYXRpZW50LnBhdGllbnROYW1lICAgICAgICAgIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIHByZW5vbSAgICAgICAgICAgICAgICAgIDogZGF0YVBhdGllbnQucGF0aWVudEZvcm5hbWUgICAgICAgfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgbnVtZXJvU2VjdXJpdGVTb2NpYWxlICAgOiBkYXRhUGF0aWVudC5wYXRpZW50TnVtYmVyICAgICAgICB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBzZXhlICAgICAgICAgICAgICAgICAgICA6IGRhdGFQYXRpZW50LnBhdGllbnRTZXggICAgICAgICAgIHx8IHNleGVFbnVtLk0sXG4gICAgICAgICAgICAgICAgICAgIGFkcmVzc2UgICAgICAgICAgICAgICAgIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlsbGUgICAgICAgICAgICAgICA6IGRhdGFQYXRpZW50LnBhdGllbnRDaXR5ICAgICAgICAgIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlUG9zdGFsICAgICAgICAgIDogZGF0YVBhdGllbnQucGF0aWVudFBvc3RhbENvZGUgICAgfHwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1ZSAgICAgICAgICAgICAgICAgOiBkYXRhUGF0aWVudC5wYXRpZW50U3RyZWV0ICAgICAgICB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtZXJvICAgICAgICAgICAgICA6IGRhdGFQYXRpZW50LnBhdGllbnRTdHJlZXROdW1iZXIgIHx8IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBldGFnZSAgICAgICAgICAgICAgIDogZGF0YVBhdGllbnQucGF0aWVudEZsb29yICAgICAgICAgfHwgXCJcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhYmluZXQucGF0aWVudHNOb25BZmZlY3Rlcy5wdXNoKHBhdGllbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkUGF0aWVudCA9IGZhbHNlO1xuICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFQYXRpZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvclwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRBZHJlc3NlKGFkcmVzc2UgOiBhbnkpIHtcbiAgICAgICAgaWYgKGFkcmVzc2UpIHtcbiAgICAgICAgICAgIHRoaXMucGF0aWVudFN0cmVldC5uYXRpdmVFbGVtZW50LnZhbHVlICAgICAgICAgID0gYWRyZXNzZS5ydWUgICAgICAgfHwgXCJcIjtcbiAgICAgICAgICAgIHRoaXMucGF0aWVudFN0cmVldE51bWJlci5uYXRpdmVFbGVtZW50LnZhbHVlICAgID0gYWRyZXNzZS5udW1lcm8gICAgfHwgXCJcIjtcbiAgICAgICAgICAgIHRoaXMucGF0aWVudENpdHkubmF0aXZlRWxlbWVudC52YWx1ZSAgICAgICAgICAgID0gYWRyZXNzZS52aWxsZSAgICAgfHwgXCJcIjtcbiAgICAgICAgICAgIHRoaXMucGF0aWVudFBvc3RhbENvZGUubmF0aXZlRWxlbWVudC52YWx1ZSAgICAgID0gYWRyZXNzZS5jb2RlUG9zdGFsfHwgXCJcIjtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG4iXSwic291cmNlUm9vdCI6IiJ9
