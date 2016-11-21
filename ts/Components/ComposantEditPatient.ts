import {Component, OnInit}                          from "@angular/core";
import * as NF                                      from "@Services/cabinetMedicalService";
import {NgForm, FormBuilder}                        from "@angular/forms";
import {sexeEnum}                                   from "@Services/cabinetMedicalService";
import {Router, Params, ActivatedRoute}             from "@angular/router";
import {PatientInterface}                           from "@Services/cabinetMedicalService";
import {AbstractComposantPatient}                   from "./Abstract.ComposantPatient";
import {MapsAPILoader} from "angular2-google-maps/core";

@Component({
    templateUrl	: "ts/Views/edit.patient.html",
    styleUrls   : ["node_modules/font-awesome/css/font-awesome.css"]
})
export class ComposantEditPatient extends AbstractComposantPatient implements OnInit {
    title       : string;
    patient     : PatientInterface;
    numero      : string;
    cabinet     : NF.CabinetInterface;
    constructor(public cms          : NF.ServiceCabinetMedical,
                router              : Router,
                fb                  : FormBuilder,
                private route       : ActivatedRoute,
                private __loader    : MapsAPILoader) {
        super(cms, router, fb);
        this.title = "Modifier un patient";
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.numero     = params["numero"];
        });
        this.cms.getPatientById(this.numero).then((res) => {
            this.patient = res;
            console.log(res);
            /*this.__loader.load().then(() => {
                this.geocoder   = new google.maps.Geocoder();
                this.infoWindow = new google.maps.InfoWindow();
                this.map        = new google.maps.Map(document.querySelector(".map"), {
                    zoom: 12
                });
                let patientAdresse : string = this.patient.adresse.ville + " "
                    + this.patient.adresse.numero + " "
                    + this.patient.adresse.rue + " "
                    + this.patient.adresse.codePostal;
                console.log(patientAdresse);
                this.geocoder.geocode( { "address": patientAdresse}, (results, status) => {
                    if (status === google.maps.GeocoderStatus.OK) {
                        this.marker = new google.maps.Marker({
                            position    : results[0].geometry.location,
                            map         : this.map
                        });
                        this.map.setCenter(results[0].geometry.location);
                        this.infoWindow.setContent(results[0].formatted_address);
                        this.infoWindow.open(this.map, this.marker);
                        this.setAdresse(this.patient.adresse);
                    } else {
                        console.log("Error - ", results, " & Status - ", status);
                    }
                });
            });*/
            this.loadPatientInfos();
        });
    }

    loadPatientInfos() {
        this.editPatientForm.controls["patientName"]    .setValue(this.patient.nom);
        this.editPatientForm.controls["patientForname"] .setValue(this.patient.prenom);
        this.editPatientForm.controls["patientNumber"]  .setValue(this.patient.numeroSecuriteSociale);
        this.editPatientForm.controls["patientSex"]     .setValue(this.patient.sexe);
    }

    public submitPatient(event: Event, f: NgForm) {
        event.preventDefault();
        console.log(f);
        if (f.valid) {
            this.cms.AjouterPatient(f).then((dataPatient) => {
                //Ajouter le patient dans le cabinet
                let patient: PatientInterface = {
                    nom:                    dataPatient.patientName         || "",
                    prenom:                 dataPatient.patientForname      || "",
                    numeroSecuriteSociale:  dataPatient.patientNumber       || "",
                    sexe:                   dataPatient.patientSex          || sexeEnum.M,
                    adresse: {
                        ville:              dataPatient.patientCity         || "",
                        codePostal:         dataPatient.patientPostalCode   || null,
                        rue:                dataPatient.patientStreet       || "",
                        numero:             dataPatient.patientStreetNumber || null,
                        etage:              dataPatient.patientFloor        || ""
                    }
                };
                let infId = null;
                this.cms.cabinet.infirmiers.forEach((inf) => {
                    if (inf.patients.filter((val) => {
                        return val.numeroSecuriteSociale === patient.numeroSecuriteSociale;
                        }).length === 1) {
                        infId = inf.id;
                    }
                });
                if (infId) {
                    this.cms.affecterPatient(
                        this.patient.numeroSecuriteSociale,
                        infId
                    )
                    .then( () => {
                        console.log(this.cms.cabinet.infirmiers.filter( (inf) => {
                            return inf.id === infId;
                        }));
                        this.cms.cabinet.infirmiers.filter( (inf) => {
                            return inf.id === infId;
                        })[0].patients.push(patient);
                        this.router.navigate(["/secretaire"]);
                        console.log("Patient modifié");
                    })
                    .catch( (err) => {
                        console.log("Erreur : " + err);
                    });
                }
            });
        } else {
            console.log("Error");
        }
    }
}


