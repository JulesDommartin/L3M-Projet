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
        <img class="photo-infirmier" src="../data/{{infirmier.photo}}"/>
        <div class="patients-infirmier">
            <table *ngIf="infirmier.patients.length > 0" class="table-infirmier">
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Numéro de sécu</th>
                    <th>Options</th>
                </tr>
                <tr class="patient-infirmier" 
                        (click)="onClick(patient)" 
                        *ngFor="let patient of infirmier.patients" 
                        [alx-draggable]="patient">
                    <td>{{patient.nom}}</td>
                    <td>{{patient.prenom}}</td>
                    <td>{{patient.numeroSecuriteSociale}}</td>
                    <td>
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
    </div>
`;
@Component({
    selector	: "composant-infirmier",
    template	: htmlTemplate,
    styleUrls   : ["node_modules/font-awesome/css/font-awesome.css"]
})
export class ComposantInfirmier {
    @Input() infirmier  : NF.InfirmierInterface;

    constructor(private router : Router) {}

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


