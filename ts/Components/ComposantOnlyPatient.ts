import * as NF from "@Services/cabinetMedicalService";
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {PatientInterface} from "@Services/cabinetMedicalService";
import {MapsAPILoader} from "angular2-google-maps/core";

const htmlTemplate = `
    <div class="patient-only">
    <table *ngIf="patient">
        <tr>
            <td><b>Nom : </b></td>
            <td>{{patient.nom || ""}}</td>
        </tr>
        <tr>
            <td><b>Prénom : </b></td>
            <td>{{patient.prenom || ""}}</td>
        </tr>
        <tr>
            <td><b>Numéro de sécu : </b></td>
            <td>{{patient.numeroSecuriteSociale || ""}}</td>
        </tr>
        <tr>
            <td><b>Sexe :</b></td>
            <td>{{getLitteralPatientSexe()}}</td>
        </tr>
        <tr>
            <td><b>Naissance :</b></td>
            <td>{{patient.naissance || ""}}</td>
        </tr>
        <tr>
            <td><b>Adresse :</b></td>
            <td></td>
        </tr>
    </table>
    <div class="map"></div>
         
        <br/>
        <br/>
    </div>
    <div class="div-bouton-retour">
        <a class="bouton-retour" [routerLink]="['/secretaire']">Retour</a>
    </div>
`;
@Component({
    template	: htmlTemplate
})
export class ComposantOnlyPatient implements OnInit {
    numero      : string;
    patient     : PatientInterface;
    geocoder    : google.maps.Geocoder;
    map         : google.maps.Map;
    marker      : google.maps.Marker;
    infoWindow  : google.maps.InfoWindow;
    constructor(public cms: NF.ServiceCabinetMedical, private route : ActivatedRoute, private __loader: MapsAPILoader) {}
    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.numero = params["numero"];
        });
        this.cms.getPatientById(this.numero).then((res) => {
            this.patient = res;
            this.__loader.load().then(() => {
                this.geocoder   = new google.maps.Geocoder();
                this.infoWindow = new google.maps.InfoWindow();
                this.map        = new google.maps.Map(document.querySelector(".map"), {
                    zoom: 12
                });
                let patientAdresse : string = this.patient.adresse.ville + " "
                    + this.patient.adresse.numero + " "
                    + this.patient.adresse.rue + " "
                    + this.patient.adresse.codePostal;
                this.geocoder.geocode( { "address": patientAdresse}, (results, status) => {
                    if (status === google.maps.GeocoderStatus.OK) {
                        this.marker = new google.maps.Marker({
                            position    : results[0].geometry.location,
                            map         : this.map
                        });
                        this.map.setCenter(results[0].geometry.location);
                        this.infoWindow.setContent(results[0].formatted_address);
                        this.infoWindow.open(this.map, this.marker);
                    } else {
                        console.log("Error - ", results, " & Status - ", status);
                    }
                });
            });
        });
    }

    getLitteralPatientSexe() {
        if (this.patient) {
            if (this.patient.sexe === 0) {
                return "Homme";
            } else if (this.patient.sexe === 1) {
                return "Femme";
            } else {
                return "?";
            }
        }
    }
}
