import * as NF from "@Services/cabinetMedicalService";
import {Component, Input} from "@angular/core";
import {PatientInterface} from "@Services/cabinetMedicalService";
import {Router} from "@angular/router";

const htmlTemplate = `
    <div class="infirmier">
        <div class="identite-infirmier">
            <span>Infirmier numéro : <i>{{infirmier.id}}</i></span>
            <h4>{{infirmier.nom}}</h4>
            <span>{{infirmier.prenom}}</span>
        </div>
        <div class="photo-infirmier">
            <img src="../data/{{infirmier.photo}}"/>
        </div>
        <div class="patients-infirmier">
            <table *ngIf="infirmier.patients.length > 0" class="table-infirmier">
                <tr>
                    <th class="nom">Nom</th>
                    <th class="prenom">Prénom</th>
                    <th class="num-secu">Numéro de sécurité sociale</th>
                    <th class="options">Options</th>
                </tr>
                <tr class="patient-infirmier" 
                        (click)="onClick(patient)" 
                        *ngFor="let patient of infirmier.patients" 
                        [alx-draggable]="patient">
                    <td class="nom">{{patient.nom}}</td>
                    <td class="prenom">{{patient.prenom}}</td>
                    <td class="num-secu">{{patient.numeroSecuriteSociale}}</td>
                    <td class="options">
                        <span title="Voir les infos du patient" 
                                alt="Voir les infos du patient" 
                                (click)="viewPatient(patient.numeroSecuriteSociale)">
                            <fa [name]="'eye'"></fa>
                        </span>
                        <span title="Modifier les infos du patient" 
                                alt="Modifier les infos du patient" 
                                (click)="editPatient(patient.numeroSecuriteSociale)">
                            <fa [name]="'pencil'"></fa>
                        </span>
                    </td>
                </tr>
            </table>
        </div>
        <composant-maps-infirmier *ngIf="infirmier.patients.length > 0" [infirmier]="infirmier"></composant-maps-infirmier>
    </div>
`;
@Component({
    selector	: "composant-infirmier",
    template	: htmlTemplate,
    styleUrls   : ["node_modules/font-awesome/css/font-awesome.css"]
})
export class ComposantInfirmier {
    @Input() infirmier  : NF.InfirmierInterface;
    @Input() cabinet    : NF.CabinetInterface;

    constructor(private router : Router) {
    }

    onClick(patient: PatientInterface) {
        this.router.navigate(["/patient", patient.numeroSecuriteSociale]);
    }

    viewPatient(numero : string) {
        this.router.navigate(["/patient", numero]);
    }

    editPatient(numero : string) {
        this.router.navigate(["/editPatient",numero]);
    }

}


