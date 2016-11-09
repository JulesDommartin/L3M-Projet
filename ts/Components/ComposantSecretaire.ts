import * as NF from "@Services/cabinetMedicalService";
import {Component, OnInit} from "@angular/core";
import {InfirmierInterface} from "@Services/cabinetMedicalService";
import {PatientInterface} from "@Services/cabinetMedicalService";
import {Router} from "@angular/router";

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
`;
@Component({
    template	: htmlTemplate
})
export class ComposantSecretaire implements OnInit {
    initDone                                    : boolean = false;
    public cabinet                              : NF.CabinetInterface;
    public addPatient                           : boolean = false;
    public adresse                              : any = {};
    this = this;
    constructor		(public cms: NF.ServiceCabinetMedical, private router : Router) { // Ce composant dépend du service de cabinet médical
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

    public ajouterPatient() {
        this.router.navigate(["/addPatient"]);
    }


}


