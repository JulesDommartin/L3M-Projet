import * as NF from "@Services/cabinetMedicalService";
import {Component, Input} from "@angular/core";

const htmlTemplate = `
    <div class="patient-non-affecte">
        <span><b>Nom : </b> {{patient.nom}}</span>
        <span><b>Prénom : </b>{{patient.prenom}}</span>
        <span><b>Numéro de sécu : </b>{{patient.numeroSecuriteSociale}}</span>
    </div>
`;
@Component({
    selector	: "composant-patient",
    template	: htmlTemplate
})
export class ComposantPatient {
    @Input() patient : NF.PatientInterface;
}


