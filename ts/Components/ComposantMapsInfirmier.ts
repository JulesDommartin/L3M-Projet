import {Component, OnInit, Input} from "@angular/core";
import { MapsAPILoader } from "angular2-google-maps/core";
import {InfirmierInterface} from "@Services/cabinetMedicalService";

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
    constructor(private __loader: MapsAPILoader) {}

    ngOnInit() {
        this.__loader.load().then( () => {
            this.directionService   = new google.maps.DirectionsService();
            this.geocoder           = new google.maps.Geocoder();
            console.log(".map-infirmier-" + this.infirmier.id);
            this.map                = new google.maps.Map(document.querySelector(".map-infirmier-" + this.infirmier.id), {
                zoom: 12
            });
            this.getTrip();
        });
    }

    public getTrip() {
        this.directionDisplay = new google.maps.DirectionsRenderer();
        let promises : Promise<google.maps.GeocoderResult[]>[] = [];
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
            /*let directionRequest : google.maps.DirectionsRequest;
            directionRequest.origin             = this.positions[0].location;
            directionRequest.destination        = this.positions[this.positions.length - 1].location;
            directionRequest.travelMode         = google.maps.TravelMode.DRIVING;
            directionRequest.waypoints          = this.positions;
            directionRequest.optimizeWaypoints  = true;*/
            if (res.length === 0) {
                console.log("Aucun patient");
            } else if (res.length === 1) {
                console.log("Un seul patient");
                this.setMarkerForOnePatient(res[0][0]);
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
            destination         : this.positions[this.positions.length - 1].location,
            travelMode          : google.maps.TravelMode.DRIVING,
            waypoints           : this.positions,
            optimizeWaypoints   : true
        };
        this.directionService.route(directionRequest, (results, status) => {
            console.log(results);
            if (status === google.maps.DirectionsStatus.OK) {
                this.directionDisplay.setMap(this.map);
                this.directionDisplay.setDirections(results);
            } else {
                console.log("Status : " + status);
            }
        });
    }

}

