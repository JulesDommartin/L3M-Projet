import {Component, OnInit, Input, ViewChild, ElementRef} from "@angular/core";
import { MapsAPILoader } from "angular2-google-maps/core";
import {AbstractComposantPatient} from "./Abstract.ComposantPatient";
import {ComposantEditPatient} from "./ComposantEditPatient";
import {PatientInterface} from "@Services/cabinetMedicalService";

const htmlTemplate = `
    <input name="adresse" placeholder="Ex: 4 rue du Bout Guesdon 14100 IFS" #searchAdress>
    <input type="button" value="Rechercher" (click)="search()"><br/>
    <div class="map">
    </div>
`;
@Component({
    selector	: "composant-maps",
    template	: htmlTemplate
})
export class ComposantMaps implements OnInit {
    @Input() composant                      : AbstractComposantPatient;
    adresse                                 : any = {};
    geocoder                                : google.maps.Geocoder;
    map                                     : google.maps.Map;
    infoWindow                              : google.maps.InfoWindow;
    marker                                  : google.maps.Marker;
    @ViewChild("searchAdress") searchAdress : ElementRef;
    constructor(private __loader: MapsAPILoader) {
    }
    ngOnInit() {
        this.__loader.load().then( () => {
            this.geocoder   = new google.maps.Geocoder();
            this.infoWindow = new google.maps.InfoWindow();
            this.map        = new google.maps.Map(document.querySelector(".map"), {
                zoom: 12
            });
            this.map.addListener("click", (event: any) => {
                this.geocoder.geocode( { "location": event.latLng}, (results, status) => {
                    if (status === google.maps.GeocoderStatus.OK) {
                        if (this.marker) {
                            this.marker.setMap(null);
                        }
                        this.marker = new google.maps.Marker({
                            position    : event.latLng,
                            map         : this.map
                        });
                        this.infoWindow.setContent(results[0].formatted_address);
                        this.infoWindow.open(this.map, this.marker);
                        this.setPatientInfos(results[0]);
                    } else {
                        console.log("Error - ", results, " & Status - ", status);
                    }
                });
            });
            this.geocoder.geocode( { "address": "Grenoble"}, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    let lat = results[0].geometry.viewport.getCenter().lat();
                    let lng = results[0].geometry.viewport.getCenter().lng();
                    this.map.setCenter({lat: lat, lng: lng});
                } else {
                    console.log("Error - ", results, " & Status - ", status);
                }
            });
            this.initPatientLocation();
        });
    }

    setPatientInfos(results: google.maps.GeocoderResult) {
        if (results.address_components) {
            for (let obj of results.address_components) {
                if (obj.types.indexOf("street_number") !== -1) {
                    this.adresse.numero = obj.long_name;
                }
                if (obj.types.indexOf("route") !== -1) {
                    this.adresse.rue = obj.long_name;
                }
                if (obj.types.indexOf("postal_code") !== -1) {
                    this.adresse.codePostal = obj.long_name;
                }
                if (obj.types.indexOf("locality") !== -1) {
                    this.adresse.ville = obj.long_name;
                }
            }
        }
        if (this.composant) {
            this.composant.setAdresse(this.adresse);
        }
    }

    public initPatientLocation() {
        if (this.composant instanceof ComposantEditPatient) {
            this.composant.setAdresse((<ComposantEditPatient>this.composant).patient.adresse);
            let patient : PatientInterface = (<ComposantEditPatient>this.composant).patient;
            let adresse : string =  patient.adresse.ville + " "
                + patient.adresse.rue + " "
                + patient.adresse.codePostal + " "
                + patient.adresse.numero;
            this.geocode(adresse);
        }
    }

    public search() {
        if (this.searchAdress.nativeElement.value) {
            let address : string = this.searchAdress.nativeElement.value;
            this.geocode(address);
        }
    }

    public geocode(address : string) {
        this.geocoder.geocode( { "address": address}, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                if (this.marker) {
                    this.marker.setMap(null);
                }
                this.marker = new google.maps.Marker({
                    position    : results[0].geometry.location,
                    map         : this.map
                });
                this.map.setCenter(results[0].geometry.location);
                this.infoWindow.setContent(results[0].formatted_address);
                this.infoWindow.open(this.map, this.marker);
                this.setPatientInfos(results[0]);
            } else {
                console.log("Error - ", results, " & Status - ", status);
            }
        });
    }

}

