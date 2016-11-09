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
                    template: htmlTemplate
                }), 
                __metadata('design:paramtypes', [NF.ServiceCabinetMedical])
            ], ComposantSecretaire);
            exports_1("ComposantSecretaire", ComposantSecretaire);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50U2VjcmV0YWlyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBT00sWUFBWTs7Ozs7Ozs7Ozs7WUFBWixZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0F3RnBCLENBQUM7WUFJRjtnQkFVSSxZQUFxQixHQUE2QjtvQkFBN0IsUUFBRyxHQUFILEdBQUcsQ0FBMEI7b0JBTGxELGFBQVEsR0FBZ0QsS0FBSyxDQUFDO29CQUV2RCxlQUFVLEdBQXVDLEtBQUssQ0FBQztvQkFDdkQsWUFBTyxHQUFzQyxFQUFFLENBQUM7b0JBQ3ZELFNBQUksR0FBRyxJQUFJLENBQUM7b0JBWUwsa0JBQWEsR0FBRyxDQUFDLElBQUk7d0JBQ3hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDOzRCQUN4RCxNQUFNLENBQUMsSUFBSSxDQUFDO3dCQUNoQixDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNKLE1BQU0sQ0FBQyxLQUFLLENBQUM7d0JBQ2pCLENBQUM7b0JBQ0wsQ0FBQyxDQUFDO2dCQWhCRixDQUFDO2dCQUNELFFBQVE7b0JBQ0osNkZBQTZGO29CQUM3RixJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBRSw0QkFBNEIsQ0FBRSxDQUFDLElBQUksQ0FBRSxDQUFDLE9BQTRCO3dCQUNoRixPQUFPLENBQUMsR0FBRyxDQUFFLGlCQUFpQixFQUFFLE9BQU8sQ0FBRSxDQUFDO3dCQUMxQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzt3QkFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7b0JBQ3pCLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTSxP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QUMsQ0FBQzt3QkFDMUIsQ0FBQyxDQUFDLENBQUM7b0JBQ1AsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN6QixDQUFDO2dCQUNMLENBQUM7Z0JBRU0sVUFBVSxDQUFDLE9BQWE7b0JBQzNCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQ1YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFZLE9BQU8sQ0FBQyxHQUFHLElBQVUsRUFBRSxDQUFDO3dCQUMxRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBTSxPQUFPLENBQUMsTUFBTSxJQUFPLEVBQUUsQ0FBQzt3QkFDMUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFjLE9BQU8sQ0FBQyxLQUFLLElBQVEsRUFBRSxDQUFDO3dCQUMxRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBUSxPQUFPLENBQUMsVUFBVSxJQUFHLEVBQUUsQ0FBQztvQkFDOUUsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQztZQXZGRztnQkFBQyxnQkFBUyxDQUFDLGVBQWUsQ0FBQzs7c0VBQUE7WUFDM0I7Z0JBQUMsZ0JBQVMsQ0FBQyxxQkFBcUIsQ0FBQzs7NEVBQUE7WUFDakM7Z0JBQUMsZ0JBQVMsQ0FBQyxtQkFBbUIsQ0FBQzs7MEVBQUE7WUFDL0I7Z0JBQUMsZ0JBQVMsQ0FBQyxhQUFhLENBQUM7O29FQUFBO1lBUDdCO2dCQUFDLGdCQUFTLENBQUM7b0JBQ1AsUUFBUSxFQUFHLFlBQVk7aUJBQzFCLENBQUM7b0RBVytCLHFCQUFxQjttQ0FYcEQ7WUFDRixxREF3RkMsQ0FBQSIsImZpbGUiOiJDb21wb25lbnRzL0NvbXBvc2FudFNlY3JldGFpcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBORiBmcm9tIFwiQFNlcnZpY2VzL2NhYmluZXRNZWRpY2FsU2VydmljZVwiO1xuaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtJbmZpcm1pZXJJbnRlcmZhY2V9IGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XG5pbXBvcnQge3NleGVFbnVtfSBmcm9tIFwiQFNlcnZpY2VzL2NhYmluZXRNZWRpY2FsU2VydmljZVwiO1xuaW1wb3J0IHtQYXRpZW50SW50ZXJmYWNlfSBmcm9tIFwiQFNlcnZpY2VzL2NhYmluZXRNZWRpY2FsU2VydmljZVwiO1xuaW1wb3J0IHtOZ0Zvcm19IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuXG5jb25zdCBodG1sVGVtcGxhdGUgPSBgXG4gICAgPHAgKm5nSWY9XCIhaW5pdERvbmVcIj5DSEFSR0VNRU5ULi4uPC9wPlxuICAgIDxzZWN0aW9uICpuZ0lmPVwiaW5pdERvbmUgJiYgIWFkZFBhdGllbnRcIiBjbGFzcz1cImNhYmluZXRcIj5cbiAgICAgICAgPGgyPk1vbiBiZWF1IGNhYmluZXQgbcOpZGljYWw8L2gyPlxuICAgICAgICA8YnIvPjxici8+XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cImFqb3V0ZXItcGF0aWVudFwiIHR5cGU9XCJidXR0b25cIiBuYW1lPVwiYWpvdXRlci1wYXRpZW50XCIgdmFsdWU9XCIgKyBBam91dGVyIHVuIHBhdGllbnRcIiAoY2xpY2spPVwiYWpvdXRlclBhdGllbnQoKVwiLz5cbiAgICAgICAgXG4gICAgICAgIDxoMj5MZXMgaW5maXJtaWVycyA6IDwvaDI+XG4gICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGluZmlybWllciBvZiBjYWJpbmV0LmluZmlybWllcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHgtZHJvcHpvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2FseC1hY2NlcHQtZmN0XT1cImFjY2VwdFBhdGllbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHgtZHJhZ3N0YXJ0LWNzcz1cImRyYWctc3RhcnQtaW5maXJtaWVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx4LWRyYWdob3Zlci1jc3M9XCJkcmFnLWhvdmVyLWluZmlybWllclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhbHgtb25kcm9wKT1cImFmZmVjdGVyUGF0aWVudCgkZXZlbnQsIGluZmlybWllcilcIj5cbiAgICAgICAgICAgIDxjb21wb3NhbnQtaW5maXJtaWVyIFtpbmZpcm1pZXJdPVwiaW5maXJtaWVyXCI+PC9jb21wb3NhbnQtaW5maXJtaWVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICA8aDI+TGVzIHBhdGllbnRzIG5vbiBhZmZlY3TDqXMgOiA8L2gyPlxuICAgICAgICBcbiAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgcGF0aWVudCBvZiBjYWJpbmV0LnBhdGllbnRzTm9uQWZmZWN0ZXNcIj5cbiAgICAgICAgICAgIDxjb21wb3NhbnQtcGF0aWVudCBbcGF0aWVudF09XCJwYXRpZW50XCIgW2FseC1kcmFnZ2FibGVdPVwicGF0aWVudFwiPjwvY29tcG9zYW50LXBhdGllbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICA8L3NlY3Rpb24+XG4gICAgPHNlY3Rpb24gKm5nSWY9XCJhZGRQYXRpZW50XCIgY2xhc3M9XCJhZGQtcGF0aWVudFwiPlxuICAgICAgICA8aDM+QWpvdXRlciB1biBub3V2ZWF1IHBhdGllbnQgOiA8L2gzPlxuICAgICAgICA8Zm9ybSAobmdTdWJtaXQpPVwic3VibWl0UGF0aWVudChuZXdQYXRpZW50Rm9ybSlcIiBcbiAgICAgICAgICAgICAgI25ld1BhdGllbnRGb3JtPVwibmdGb3JtXCIgXG4gICAgICAgICAgICAgIG5vdmFsaWRhdGU+XG4gICAgICAgICAgICAgIDx0YWJsZT5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImxhYmVsLWlucHV0XCI+UHJlbm9tIDogPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCBuYW1lPVwicGF0aWVudEZvcm5hbWVcIiBuZ01vZGVsIHJlcXVpcmVkPjwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImxhYmVsLWlucHV0XCI+Tm9tIDogPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCBuYW1lPVwicGF0aWVudE5hbWVcIiBuZ01vZGVsIHJlcXVpcmVkLz48L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJsYWJlbC1pbnB1dFwiPk51bcOpcm8gZGUgc8OpY3VyaXTDqSBzb2NpYWxlIDogPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCBuYW1lPVwicGF0aWVudE51bWJlclwiIG5nTW9kZWwgcmVxdWlyZWQvPjwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImxhYmVsLWlucHV0XCI+U2V4ZSA6IDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgbmFtZT1cInBhdGllbnRTZXhlXCIgbmdNb2RlbCByZXF1aXJlZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTVwiIHNlbGVjdGVkPkhvbW1lPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkZcIj5GZW1tZTwvb3B0aW9uPiAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJsYWJlbC1pbnB1dFwiPkFkcmVzc2UgOiA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Y29tcG9zYW50LW1hcHMgW2NvbXBvc2FudFNlY3JldGFpcmVdPVwidGhpc1wiPjwvY29tcG9zYW50LW1hcHM+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImxhYmVsLWlucHV0XCI+UnVlIDogPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCBuYW1lPVwicGF0aWVudFN0cmVldFwiIG5nTW9kZWwgcmVxdWlyZWQgI3BhdGllbnRTdHJlZXQvPjwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImxhYmVsLWlucHV0XCI+TnVtw6lybyBkZSBydWUgOiA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+PGlucHV0IG5hbWU9XCJwYXRpZW50U3RyZWV0TnVtYmVyXCIgbmdNb2RlbCByZXF1aXJlZCAjcGF0aWVudFN0cmVldE51bWJlci8+PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwibGFiZWwtaW5wdXRcIj5FdGFnZSA6IDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD48aW5wdXQgbmFtZT1cInBhdGllbnRGbG9vclwiIG5nTW9kZWwgcmVxdWlyZWQvPjwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImxhYmVsLWlucHV0XCI+Q29kZSBwb3N0YWwgOiA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+PGlucHV0IG5hbWU9XCJwYXRpZW50UG9zdGFsQ29kZVwiIG5nTW9kZWwgcmVxdWlyZWQgI3BhdGllbnRQb3N0YWxDb2RlLz48L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJsYWJlbC1pbnB1dFwiPlZpbGxlIDogPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCBuYW1lPVwicGF0aWVudENpdHlcIiBuZ01vZGVsIHJlcXVpcmVkICNwYXRpZW50Q2l0eS8+PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0ciBjbGFzcz1cImJvdHRvbS10YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPVwiQWpvdXRlciBQYXRpZW50XCIgY2xhc3M9XCJham91dGVyLXBhdGllbnRcIiB0eXBlPVwic3VibWl0XCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImFqb3V0ZXItcGF0aWVudFwiIHZhbHVlPVwiQW5udWxlclwiIChjbGljayk9XCJhbm51bGVyQWpvdXRlclBhdGllbnQoKVwiLz5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8L3RhYmxlPiAgICAgICAgICAgIFxuICAgICAgICA8L2Zvcm0+XG4gICAgPC9zZWN0aW9uPlxuYDtcbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlXHQ6IGh0bWxUZW1wbGF0ZVxufSlcbmV4cG9ydCBjbGFzcyBDb21wb3NhbnRTZWNyZXRhaXJlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBAVmlld0NoaWxkKFwicGF0aWVudFN0cmVldFwiKSAgICAgICAgIHBhdGllbnRTdHJlZXQgICAgICAgOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoXCJwYXRpZW50U3RyZWV0TnVtYmVyXCIpICAgcGF0aWVudFN0cmVldE51bWJlciA6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZChcInBhdGllbnRQb3N0YWxDb2RlXCIpICAgICBwYXRpZW50UG9zdGFsQ29kZSAgIDogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKFwicGF0aWVudENpdHlcIikgICAgICAgICAgIHBhdGllbnRDaXR5ICAgICAgICAgOiBFbGVtZW50UmVmO1xuICAgIGluaXREb25lICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGNhYmluZXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IE5GLkNhYmluZXRJbnRlcmZhY2U7XG4gICAgcHVibGljIGFkZFBhdGllbnQgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgYWRyZXNzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYW55ID0ge307XG4gICAgdGhpcyA9IHRoaXM7XG4gICAgY29uc3RydWN0b3JcdFx0KHB1YmxpYyBjbXM6IE5GLlNlcnZpY2VDYWJpbmV0TWVkaWNhbCkgeyAvLyBDZSBjb21wb3NhbnQgZMOpcGVuZCBkdSBzZXJ2aWNlIGRlIGNhYmluZXQgbcOpZGljYWxcbiAgICB9XG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJBcHBlbGV6IGxlIHNlcnZpY2UgcG91ciBmb3JtYXR0ZXIgZXQgb2J0ZW5pciBsZXMgZG9ubsOpZXMgZHUgY2FiaW5ldFxcblwiLCB0aGlzKTtcbiAgICAgICAgdGhpcy5jbXMuZ2V0RGF0YSggXCIvZGF0YS9jYWJpbmV0SW5maXJtaWVyLnhtbFwiICkudGhlbiggKGNhYmluZXQ6IE5GLkNhYmluZXRJbnRlcmZhY2UpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCBcIlxcdD0+IGNhYmluZXRKUzpcIiwgY2FiaW5ldCApO1xuICAgICAgICAgICAgdGhpcy5jYWJpbmV0ID0gY2FiaW5ldDtcbiAgICAgICAgICAgIHRoaXMuaW5pdERvbmUgPSB0cnVlO1xuICAgICAgICB9LCAoZXJyKSA9PiB7Y29uc29sZS5lcnJvcihcIkVycmV1ciBsb3JzIGR1IGNoYXJnZW1lbnQgZHUgY2FiaW5ldFwiLCBcIi9kYXRhL2NhYmluZXRJbmZpcm1pZXIueG1sXCIsIFwiXFxuXCIsIGVycik7fSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFjY2VwdFBhdGllbnQgPSAoZGF0YSkgPT4ge1xuICAgICAgICBpZiAoZGF0YS5ub20gJiYgZGF0YS5wcmVub20gJiYgZGF0YS5udW1lcm9TZWN1cml0ZVNvY2lhbGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHB1YmxpYyBhZmZlY3RlclBhdGllbnQocGF0aWVudDogUGF0aWVudEludGVyZmFjZSwgaW5maXJtaWVyOiBJbmZpcm1pZXJJbnRlcmZhY2UpIHtcbiAgICAgICAgdGhpcy5jbXMuYWZmZWN0ZXJQYXRpZW50KHBhdGllbnQubnVtZXJvU2VjdXJpdGVTb2NpYWxlLCBpbmZpcm1pZXIuaWQpO1xuICAgICAgICB0aGlzLmRlc2FmZmVjdGVyUGF0aWVudChwYXRpZW50LCB0aGlzLmNhYmluZXQuaW5maXJtaWVycyk7XG4gICAgICAgIGluZmlybWllci5wYXRpZW50cy5wdXNoKHBhdGllbnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZXNhZmZlY3RlclBhdGllbnQocGF0aWVudCwgaW5maXJtaWVyczogSW5maXJtaWVySW50ZXJmYWNlW10pIHtcbiAgICAgICAgZm9yIChsZXQgaW5mIG9mIGluZmlybWllcnMpIHtcbiAgICAgICAgICAgIGlmIChpbmYucGF0aWVudHMuaW5kZXhPZihwYXRpZW50KSAhPT0gLSAxKSB7XG4gICAgICAgICAgICAgICAgaW5mLnBhdGllbnRzLnNwbGljZShpbmYucGF0aWVudHMuaW5kZXhPZihwYXRpZW50KSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY2FiaW5ldC5wYXRpZW50c05vbkFmZmVjdGVzLmluZGV4T2YocGF0aWVudCkgIT09IC0xKVxuICAgICAgICAgICAgdGhpcy5jYWJpbmV0LnBhdGllbnRzTm9uQWZmZWN0ZXMuc3BsaWNlKHRoaXMuY2FiaW5ldC5wYXRpZW50c05vbkFmZmVjdGVzLmluZGV4T2YocGF0aWVudCksIDEpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhbm51bGVyQWpvdXRlclBhdGllbnQoKSB7XG4gICAgICAgIHRoaXMuYWRkUGF0aWVudCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBham91dGVyUGF0aWVudCgpIHtcbiAgICAgICAgdGhpcy5hZGRQYXRpZW50ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3VibWl0UGF0aWVudChmOiBOZ0Zvcm0pIHtcbiAgICAgICAgY29uc29sZS5sb2coZik7XG4gICAgICAgIGlmIChmLnZhbGlkKSB7XG4gICAgICAgICAgICB0aGlzLmNtcy5Bam91dGVyUGF0aWVudChmKS50aGVuKCAoZGF0YVBhdGllbnQpID0+IHtcbiAgICAgICAgICAgICAvL0Fqb3V0ZXIgbGUgcGF0aWVudCBkYW5zIGxlIGNhYmluZXRcbiAgICAgICAgICAgICAgICBsZXQgcGF0aWVudCA6IFBhdGllbnRJbnRlcmZhY2UgPSB7XG4gICAgICAgICAgICAgICAgICAgIG5vbSAgICAgICAgICAgICAgICAgICAgIDogZGF0YVBhdGllbnQucGF0aWVudE5hbWUgICAgICAgICAgfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgcHJlbm9tICAgICAgICAgICAgICAgICAgOiBkYXRhUGF0aWVudC5wYXRpZW50Rm9ybmFtZSAgICAgICB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBudW1lcm9TZWN1cml0ZVNvY2lhbGUgICA6IGRhdGFQYXRpZW50LnBhdGllbnROdW1iZXIgICAgICAgIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIHNleGUgICAgICAgICAgICAgICAgICAgIDogZGF0YVBhdGllbnQucGF0aWVudFNleCAgICAgICAgICAgfHwgc2V4ZUVudW0uTSxcbiAgICAgICAgICAgICAgICAgICAgYWRyZXNzZSAgICAgICAgICAgICAgICAgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWxsZSAgICAgICAgICAgICAgIDogZGF0YVBhdGllbnQucGF0aWVudENpdHkgICAgICAgICAgfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVQb3N0YWwgICAgICAgICAgOiBkYXRhUGF0aWVudC5wYXRpZW50UG9zdGFsQ29kZSAgICB8fCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgcnVlICAgICAgICAgICAgICAgICA6IGRhdGFQYXRpZW50LnBhdGllbnRTdHJlZXQgICAgICAgIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBudW1lcm8gICAgICAgICAgICAgIDogZGF0YVBhdGllbnQucGF0aWVudFN0cmVldE51bWJlciAgfHwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV0YWdlICAgICAgICAgICAgICAgOiBkYXRhUGF0aWVudC5wYXRpZW50Rmxvb3IgICAgICAgICB8fCBcIlwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMuY2FiaW5ldC5wYXRpZW50c05vbkFmZmVjdGVzLnB1c2gocGF0aWVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRQYXRpZW50ID0gZmFsc2U7XG4gICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YVBhdGllbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNldEFkcmVzc2UoYWRyZXNzZSA6IGFueSkge1xuICAgICAgICBpZiAoYWRyZXNzZSkge1xuICAgICAgICAgICAgdGhpcy5wYXRpZW50U3RyZWV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgICAgICAgICAgPSBhZHJlc3NlLnJ1ZSAgICAgICB8fCBcIlwiO1xuICAgICAgICAgICAgdGhpcy5wYXRpZW50U3RyZWV0TnVtYmVyLm5hdGl2ZUVsZW1lbnQudmFsdWUgICAgPSBhZHJlc3NlLm51bWVybyAgICB8fCBcIlwiO1xuICAgICAgICAgICAgdGhpcy5wYXRpZW50Q2l0eS5uYXRpdmVFbGVtZW50LnZhbHVlICAgICAgICAgICAgPSBhZHJlc3NlLnZpbGxlICAgICB8fCBcIlwiO1xuICAgICAgICAgICAgdGhpcy5wYXRpZW50UG9zdGFsQ29kZS5uYXRpdmVFbGVtZW50LnZhbHVlICAgICAgPSBhZHJlc3NlLmNvZGVQb3N0YWx8fCBcIlwiO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbiJdLCJzb3VyY2VSb290IjoiIn0=
