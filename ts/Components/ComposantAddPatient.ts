import {Component, OnInit, Input, ElementRef, ViewChild}   from "@angular/core";
import {ComposantSecretaire}                    from "./ComposantSecretaire";
import * as NF                                  from "@Services/cabinetMedicalService";
import {NgForm}                                 from "@angular/forms";
import {PatientInterface}                       from "@Services/cabinetMedicalService";
import {sexeEnum}                               from "@Services/cabinetMedicalService";
import {Router}                                 from "@angular/router";


const htmlTemplate = `
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
@Component({
    template	: htmlTemplate
})
export class ComposantAddPatient implements OnInit {
    @ViewChild("patientStreet")         patientStreet       : ElementRef;
    @ViewChild("patientStreetNumber")   patientStreetNumber : ElementRef;
    @ViewChild("patientPostalCode")     patientPostalCode   : ElementRef;
    @ViewChild("patientCity")           patientCity         : ElementRef;
    @Input() composantSecretaire                            : ComposantSecretaire;
    this = this;
    initDone                                    : boolean = false;
    constructor(public cms: NF.ServiceCabinetMedical, private router : Router) {

    }
    ngOnInit(): void {
        this.initDone = true;
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
                this.router.navigate(["/secretaire"]);
                console.log(patient);
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

    public annulerAjouterPatient() {
        this.router.navigate(["/secretaire"]);
    }
}

