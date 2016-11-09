import * as NF from "@Services/cabinetMedicalService";
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {PatientInterface} from "@Services/cabinetMedicalService";

const htmlTemplate = `
    <div *ngIf="initDone" class="patient-non-affecte">
        <span><b>Nom : </b> {{patient.nom}}</span>
        <span><b>Prénom : </b>{{patient.prenom}}</span>
        <span><b>Numéro de sécu : </b>{{patient.numeroSecuriteSociale}}</span>
    </div>
    <a [routerLink]="['/secretaire']">Retour</a>
`;
@Component({
    template	: htmlTemplate
})
export class ComposantOnlyPatient implements OnInit{
    numero  : string;
    patient : PatientInterface;
    initDone: boolean = false;
    constructor(public cms: NF.ServiceCabinetMedical, private route : ActivatedRoute) {}
    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.numero = params["numero"];
            console.log(params);
        });
        this.cms.getPatientById(this.numero).then((res) => {
            this.patient = res;
            console.log(res);
            this.initDone = true;
        });
    }
}
