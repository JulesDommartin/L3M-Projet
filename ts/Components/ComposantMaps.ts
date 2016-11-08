import {Component, OnInit, Input} from "@angular/core";
import { MapsAPILoader } from "angular2-google-maps/core";
import {ComposantSecretaire} from "./ComposantSecretaire";

const htmlTemplate = `
    <div class="map">
    </div>
`;
@Component({
    selector	: "composant-maps",
    template	: htmlTemplate
})
export class ComposantMaps implements OnInit {
    @Input() composantSecretaire    : ComposantSecretaire;
    adresse                         : any = {};
    geocoder                        : google.maps.Geocoder;
    map                             : google.maps.Map;
    infoWindow                      : google.maps.InfoWindow;
    marker                          : google.maps.Marker;
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
                console.log(event);
                this.geocoder.geocode( { "location": event.latLng}, (results, status) => {
                    if (status === google.maps.GeocoderStatus.OK) {
                        console.log(results);
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
                    console.log(results);
                    let lat = results[0].geometry.viewport.getCenter().lat();
                    let lng = results[0].geometry.viewport.getCenter().lng();
                    this.map.setCenter({lat: lat, lng: lng});
                } else {
                    console.log("Error - ", results, " & Status - ", status);
                }
            });
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
                if (obj.types.indexOf("locality") !== -1 || obj.types.indexOf("political") !== -1) {
                    this.adresse.ville = obj.long_name;
                }
            }
        }
        this.composantSecretaire.setAdresse(this.adresse);
    }

}

