import {Component, OnInit, Input, ElementRef, ViewChild}        from "@angular/core";
import {ComposantSecretaire}                                    from "./ComposantSecretaire";
import * as NF                                                  from "@Services/cabinetMedicalService";
import {NgForm, FormBuilder, FormGroup, Validators}             from "@angular/forms";
import {PatientInterface}                                       from "@Services/cabinetMedicalService";
import {sexeEnum}                                               from "@Services/cabinetMedicalService";
import {Router}                                                 from "@angular/router";


const htmlTemplate = `
        <section class="add-patient">
        <h3>Ajouter un nouveau patient : </h3>
        <form (ngSubmit)="submitPatient($event,addPatientForm)" 
              [formGroup]="addPatientForm" 
              novalidate>
              <table>
                <tr>
                    <td class="label-input">Prenom : </td>
                    <td><input name="patientForname" 
                                formControlName="patientForname"
                                [formControl]="addPatientForm.controls['patientForname']" 
                                required></td>
                </tr>
                <tr>
                    <td class="label-input">Nom : </td>
                    <td><input name="patientName" 
                                formControlName="patientName"
                                [formControl]="addPatientForm.controls['patientName']"  
                                required/></td>
                </tr>
                <tr>
                    <td class="label-input">Numéro de sécurité sociale : </td>
                    <td><input name="patientNumber" 
                                formControlName="patientNumber"
                                [formControl]="addPatientForm.controls['patientNumber']"  
                                required/></td>
                </tr>
                <tr>
                    <td class="label-input">Sexe : </td>
                    <td>
                        <select name="patientSex" 
                                formControlName="patientSex"
                                [formControl]="addPatientForm.controls['patientSex']"  
                                required>
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
                    <td><input name="patientStreet"
                                formControlName="patientStreet"
                                [formControl]="addPatientForm.controls['patientStreet']"  
                                required #patientStreet/></td>
                </tr>
                <tr>
                    <td class="label-input">Numéro de rue : </td>
                    <td><input name="patientStreetNumber" 
                                formControlName="patientStreetNumber"
                                [formControl]="addPatientForm.controls['patientStreetNumber']"  
                                required #patientStreetNumber/></td>
                </tr>
                <tr>
                    <td class="label-input">Etage : </td>
                    <td><input name="patientFloor"
                                formControlName="patientFloor"
                                [formControl]="addPatientForm.controls['patientFloor']"/></td>
                </tr>
                <tr>
                    <td class="label-input">Code postal : </td>
                    <td><input name="patientPostalCode" 
                                formControlName="patientPostalCode"
                                [formControl]="addPatientForm.controls['patientPostalCode']"  
                                required #patientPostalCode/></td>
                </tr>
                <tr>
                    <td class="label-input">Ville : </td>
                    <td><input name="patientCity" 
                                formControlName="patientCity"
                                [formControl]="addPatientForm.controls['patientCity']"  
                                required #patientCity/></td>
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
    addPatientForm                                          : FormGroup;
    this = this;
    initDone                                    : boolean = false;
    constructor(public cms: NF.ServiceCabinetMedical, private router : Router, private fb: FormBuilder) {
        this.addPatientForm = fb.group({
            patientName         : ["", Validators.required],
            patientForname      : ["", Validators.required],
            patientNumber       : ["", Validators.required],
            patientSex          : sexeEnum.M,
            patientCity         : ["", Validators.required],
            patientPostalCode   : [null, Validators.required],
            patientStreet       : ["", Validators.required],
            patientStreetNumber : [null, Validators.required],
            patientFloor        : ""
        });
    }
    ngOnInit(): void {
        this.initDone = true;
    }

    public submitPatient(event: Event, f: NgForm) {
        event.preventDefault();
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
            this.addPatientForm.controls["patientStreet"]       .setValue(adresse.rue       || "");
            this.addPatientForm.controls["patientStreetNumber"] .setValue(adresse.numero    || "");
            this.addPatientForm.controls["patientCity"]         .setValue(adresse.ville     || "");
            this.addPatientForm.controls["patientPostalCode"]   .setValue(adresse.codePostal|| "");
        }
    }

    public annulerAjouterPatient() {
        this.router.navigate(["/secretaire"]);
    }
}

