import {Component, OnInit, Input}        from "@angular/core";
import {ComposantSecretaire}                                    from "./ComposantSecretaire";
import * as NF                                                  from "@Services/cabinetMedicalService";
import {NgForm, FormBuilder, FormGroup, Validators}             from "@angular/forms";
import {sexeEnum}                                               from "@Services/cabinetMedicalService";
import {Router}                                                 from "@angular/router";
import {AbstractComposantPatient} from "./Abstract.ComposantPatient";


@Component({
    templateUrl	: "ts/Views/edit.patient.html"
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
        if (f.valid) {
            this.cms.AjouterPatient(f).then( (dataPatient) => {
                console.log("Patient ajouté : ", dataPatient);
            });
        } else {
            this.cms._service.error("Erreur", "Certains champs ne sont pas remplis comme il faut");
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

