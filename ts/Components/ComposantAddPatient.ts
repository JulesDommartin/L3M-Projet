import {Component, OnInit, Input}        from "@angular/core";
import {ComposantSecretaire}                                    from "./ComposantSecretaire";
import * as NF                                                  from "@Services/cabinetMedicalService";
import {NgForm, FormBuilder, FormGroup, Validators}             from "@angular/forms";
import {PatientInterface}                                       from "@Services/cabinetMedicalService";
import {sexeEnum}                                               from "@Services/cabinetMedicalService";
import {Router}                                                 from "@angular/router";
import {AbstractComposantPatient} from "./Abstract.ComposantPatient";


@Component({
    templateUrl	: "ts/views/edit.patient.html"
})
export class ComposantAddPatient extends AbstractComposantPatient implements OnInit {
    @Input() composantSecretaire                            : ComposantSecretaire;
    editPatientForm                                         : FormGroup;
    title                                                   : string;
    this = this;
    initDone                                                : boolean = false;
    constructor(public cms: NF.ServiceCabinetMedical, router : Router, fb: FormBuilder) {
        super(cms, router, fb);
        this.editPatientForm = fb.group({
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
        this.title = "Ajouter un nouveau patient";
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
            this.editPatientForm.controls["patientStreet"]       .setValue(adresse.rue       || "");
            this.editPatientForm.controls["patientStreetNumber"] .setValue(adresse.numero    || "");
            this.editPatientForm.controls["patientCity"]         .setValue(adresse.ville     || "");
            this.editPatientForm.controls["patientPostalCode"]   .setValue(adresse.codePostal|| "");
        }
    }

    public annulerAjouterPatient() {
        this.router.navigate(["/secretaire"]);
    }
}

