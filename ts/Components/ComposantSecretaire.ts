import * as NF from "@Services/cabinetMedicalService";
import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import {InfirmierInterface} from "@Services/cabinetMedicalService";
import {sexeEnum} from "@Services/cabinetMedicalService";
import {PatientInterface} from "@Services/cabinetMedicalService";
import {NgForm} from "@angular/forms";

const htmlTemplate = `
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
@Component({
    template	: htmlTemplate
})
export class ComposantSecretaire implements OnInit {
    @ViewChild("patientStreet")         patientStreet       : ElementRef;
    @ViewChild("patientStreetNumber")   patientStreetNumber : ElementRef;
    @ViewChild("patientPostalCode")     patientPostalCode   : ElementRef;
    @ViewChild("patientCity")           patientCity         : ElementRef;
    initDone                                    : boolean = false;
    public cabinet                              : NF.CabinetInterface;
    public addPatient                           : boolean = false;
    public adresse                              : any = {};
    this = this;
    constructor		(public cms: NF.ServiceCabinetMedical) { // Ce composant dépend du service de cabinet médical
    }
    ngOnInit() {
        //console.log("Appelez le service pour formatter et obtenir les données du cabinet\n", this);
        this.cms.getData( "/data/cabinetInfirmier.xml" ).then( (cabinet: NF.CabinetInterface) => {
            console.log( "\t=> cabinetJS:", cabinet );
            this.cabinet = cabinet;
            this.initDone = true;
        }, (err) => {console.error("Erreur lors du chargement du cabinet", "/data/cabinetInfirmier.xml", "\n", err);});
    }

    public acceptPatient = (data) => {
        if (data.nom && data.prenom && data.numeroSecuriteSociale) {
            return true;
        } else {
            return false;
        }
    };

    public affecterPatient(patient: PatientInterface, infirmier: InfirmierInterface) {
        this.cms.affecterPatient(patient.numeroSecuriteSociale, infirmier.id);
        this.desaffecterPatient(patient, this.cabinet.infirmiers);
        infirmier.patients.push(patient);
    }

    public desaffecterPatient(patient, infirmiers: InfirmierInterface[]) {
        for (let inf of infirmiers) {
            if (inf.patients.indexOf(patient) !== - 1) {
                inf.patients.splice(inf.patients.indexOf(patient), 1);
            }
        }
        if (this.cabinet.patientsNonAffectes.indexOf(patient) !== -1)
            this.cabinet.patientsNonAffectes.splice(this.cabinet.patientsNonAffectes.indexOf(patient), 1);
    }

    public annulerAjouterPatient() {
        this.addPatient = false;
    }

    public ajouterPatient() {
        this.addPatient = true;
    }

    public submitPatient(f: NgForm) {
        console.log(f);
        if (f.valid) {
            this.cms.AjouterPatient(f).then( (dataPatient) => {
             //Ajouter le patient dans le cabinet
                let patient : PatientInterface = {
                    nom                     : dataPatient.patientName          || "",
                    prenom                  : dataPatient.patientForname       || "",
                    numeroSecuriteSociale   : dataPatient.patientNumber        || "",
                    sexe                    : dataPatient.patientSex           || sexeEnum.M,
                    adresse                 : {
                        ville               : dataPatient.patientCity          || "",
                        codePostal          : dataPatient.patientPostalCode    || null,
                        rue                 : dataPatient.patientStreet        || "",
                        numero              : dataPatient.patientStreetNumber  || null,
                        etage               : dataPatient.patientFloor         || ""
                    }
                };
                this.cabinet.patientsNonAffectes.push(patient);
                this.addPatient = false;
             console.log(dataPatient);
            });
        } else {
            console.log("Error");
        }
    }

    public setAdresse(adresse : any) {
        if (adresse) {
            this.patientStreet.nativeElement.value          = adresse.rue       || "";
            this.patientStreetNumber.nativeElement.value    = adresse.numero    || "";
            this.patientCity.nativeElement.value            = adresse.ville     || "";
            this.patientPostalCode.nativeElement.value      = adresse.codePostal|| "";
        }
    }
}


