import {Component, OnInit, Input} from "@angular/core";
import { MapsAPILoader } from "angular2-google-maps/core";
import {InfirmierInterface, ServiceCabinetMedical} from "@Services/cabinetMedicalService";

const htmlTemplate = `
    <div class="map-infirmier map-infirmier-{{infirmier.id}}">
    </div>
`;
@Component({
    selector	: "composant-maps-infirmier",
    template	: htmlTemplate
})
export class ComposantMapsInfirmier implements OnInit {
    @Input() infirmier                      : InfirmierInterface;
    geocoder                                : google.maps.Geocoder;
    map                                     : google.maps.Map;
    marker                                  : google.maps.Marker;
    directionService                        : google.maps.DirectionsService;
    directionDisplay                        : google.maps.DirectionsRenderer;
    positions                               : any [] = [];
    colors                                  : string [] = [];
    constructor(private __loader: MapsAPILoader, private cms : ServiceCabinetMedical) {}

    ngOnInit() {
        this.__loader.load().then( () => {
            this.directionService   = new google.maps.DirectionsService();
            this.geocoder           = new google.maps.Geocoder();
            console.log(".map-infirmier-" + this.infirmier.id);
            this.map                = new google.maps.Map(document.querySelector(".map-infirmier-" + this.infirmier.id), {
                zoom: 12
            });
            this.getTrip();
            this.colors = ["red", "green", "blue", "yellow", "purple", "grey"];
        });
    }

    public getTrip() {
        this.directionDisplay = new google.maps.DirectionsRenderer();
        let promises : Promise<google.maps.GeocoderResult[]>[] = [];
        let adresseCabinet = this.cms.cabinetAdresse.numero + " "
            + this.cms.cabinetAdresse.rue + " "
            + this.cms.cabinetAdresse.ville + " "
            + this.cms.cabinetAdresse.codePostal;
        let promise = new Promise((resolve, reject) => {
            this.geocoder.geocode({"address": adresseCabinet},
                (results : google.maps.GeocoderResult[], status : google.maps.GeocoderStatus) => {
                    if (status === google.maps.GeocoderStatus.OK) {
                        resolve(results);
                    } else {
                        reject(status);
                    }
                }
            );
        });
        promises.push(promise);
        for (let patient of this.infirmier.patients) {
            let adresse : string =  patient.adresse.ville + " "
                + patient.adresse.rue + " "
                + patient.adresse.codePostal + " "
                + patient.adresse.numero;
            let promise = new Promise((resolve, reject) => {
                this.geocoder.geocode({"address": adresse},
                    (results : google.maps.GeocoderResult[], status : google.maps.GeocoderStatus) => {
                        if (status === google.maps.GeocoderStatus.OK) {
                            resolve(results);
                        } else {
                            reject(status);
                        }
                    }
                );
            });
            promises.push(promise);
        }
        Promise.all(promises).then( (res : Array<google.maps.GeocoderResult[]>) => {
            if (res.length === 1) {
                console.log("Aucun patient");
            } else {
                for (let obj of res) {
                    this.positions.push({"location" : obj[0].geometry.location});
                }
                this.displayMapDirection();
            }


        })
        .catch( (err) => {
            console.log(err);
        });
    }

    setMarkerForOnePatient(result : google.maps.GeocoderResult) {
        this.marker = new google.maps.Marker({
            position    : result.geometry.location,
            map         : this.map
        });
        this.map.setCenter(result.geometry.location);
    }

    displayMapDirection() {
        let directionRequest = {
            origin              : this.positions[0].location,
            destination         : this.positions[0].location,
            travelMode          : google.maps.TravelMode.DRIVING,
            waypoints           : this.positions,
            optimizeWaypoints   : true
        };
        this.directionService.route(directionRequest, (results, status) => {
            console.log(results);
            if (status === google.maps.DirectionsStatus.OK) {
                this.directionDisplay.setMap(this.map);
                let random = Math.floor(Math.random() * this.colors.length);
                this.directionDisplay.setOptions({
                    polylineOptions: {
                        strokeColor: this.colors[random]
                    }
                });
                this.directionDisplay.setDirections(results);
            } else {
                console.log("Status : " + status);
            }
        });
    }

}

