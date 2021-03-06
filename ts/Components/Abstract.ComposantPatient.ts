import {Component, OnInit, ElementRef, ViewChild}        from "@angular/core";
import * as NF                                                  from "@Services/cabinetMedicalService";
import {NgForm, FormBuilder, FormGroup, Validators}             from "@angular/forms";
import {sexeEnum}                                               from "@Services/cabinetMedicalService";
import {Router}                                                 from "@angular/router";


@Component({
    templateUrl	: "ts/views/edit.patient.html"
})
export abstract class AbstractComposantPatient implements OnInit {
    @ViewChild("patientStreet")         patientStreet       : ElementRef;
    @ViewChild("patientStreetNumber")   patientStreetNumber : ElementRef;
    @ViewChild("patientPostalCode")     patientPostalCode   : ElementRef;
    @ViewChild("patientCity")           patientCity         : ElementRef;
    editPatientForm                                         : FormGroup;
    title                                                   : string;
    public options                                          : any = {
        position: ["bottom", "right"],
        timeOut: 5000,
    };
    this = this;
    initDone                                                : boolean = false;
    constructor(public cms: NF.ServiceCabinetMedical, protected router : Router, protected fb: FormBuilder) {
        this.editPatientForm = fb.group({
            patientName         : ["", Validators.required],
            patientForname      : ["", Validators.required],
            patientNumber       : ["", Validators.required],
            patientSex          : sexeEnum.M,
            patientCity         : ["", Validators.required],
            patientPostalCode   : [null, Validators.required],
            patientStreet       : ["", Validators.required],
            patientStreetNumber : null,
            patientFloor        : ""
        });
    }
    ngOnInit(): void {
        this.initDone = true;
    }

    public abstract submitPatient(event: Event, f: NgForm);

    public setAdresse(adresse : any) {
        console.log(adresse);
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

    protected onDestroy(event: Event) {
        if (event.type === "success") {
            this.router.navigate(["/secretaire"]);
        }
    }
}

