import {Component, OnInit, Input} from "@angular/core";
import { MapsAPILoader } from "angular2-google-maps/core";
import {InfirmierInterface, ServiceCabinetMedical} from "@Services/cabinetMedicalService";

const htmlTemplate = `
    <div class="composant-map-infirmier">
        <div class="map-infirmier map-infirmier-{{infirmier.id}}">
        </div>
        <div class="map-info">
            <p><b>Temps : {{time}}</b></p>
            <p><b>Distance : {{distance}} km</b></p>
        </div>
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
    time                                    : string = "";
    distance                                : string = "";
    constructor(private __loader: MapsAPILoader, private cms : ServiceCabinetMedical) {}

    ngOnInit() {
        this.__loader.load().then( () => {
            this.directionService   = new google.maps.DirectionsService();
            this.geocoder           = new google.maps.Geocoder();
            this.map                = new google.maps.Map(document.querySelector(".map-infirmier-" + this.infirmier.id), {
                zoom: 12
            });
            this.getTrip();
            this.colors = ["red", "green", "blue", "yellow", "purple", "grey"];
            this.createReloadButton();
        });
    }

    public getTrip() {
        this.positions = [];
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
            if (status === google.maps.DirectionsStatus.OK) {
                this.directionDisplay.setMap(this.map);
                let random = Math.floor(Math.random() * this.colors.length);
                this.directionDisplay.setOptions({
                    polylineOptions: {
                        strokeColor: this.colors[random]
                    }
                });
                this.directionDisplay.setDirections(results);
                let totalTravelTime : number = 0;
                let totalDistance   : number = 0;
                results.routes[0].legs.forEach((val) => {
                   totalTravelTime  += val.duration.value;
                   totalDistance    += val.distance.value;
                });
                this.time       = this.toHHMMSS(totalTravelTime);
                this.distance   = this.toKM(totalDistance);
            } else {
                console.log("Status : " + status);
            }
        });
    }

    reload() {
        this.map = new google.maps.Map(document.querySelector(".map-infirmier-" + this.infirmier.id), {
            zoom: 12
        });
        this.createReloadButton();
        this.getTrip();
    }

    createReloadButton() {

        var controlUI = document.createElement("div");
        controlUI.style.backgroundColor = "#fff";
        controlUI.style.border = "2px solid #fff";
        controlUI.style.borderRadius = "3px";
        controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
        controlUI.style.cursor = "pointer";
        controlUI.style.marginBottom = "22px";
        controlUI.style.textAlign = "center";
        controlUI.title = "Cliquez pour recharger";

        var controlText = document.createElement("div");
        controlText.style.color = "rgb(25,25,25)";
        controlText.style.fontFamily = "Roboto,Arial,sans-serif";
        controlText.style.fontSize = "16px";
        controlText.style.lineHeight = "38px";
        controlText.style.paddingLeft = "5px";
        controlText.style.paddingRight = "5px";
        controlText.innerHTML = "Recharger";
        controlUI.appendChild(controlText);

        controlUI.addEventListener("click", () => {
            this.reload();
        });

        this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlUI);

    }

    public toHHMMSS (seconds : number) : string {
        let hours   = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds - (hours * 3600)) / 60);

        let hours_string = "";
        let minutes_string = "";

        if (hours   < 10) {hours_string   = "0"+hours.toString();}    else {hours_string   = hours.toString();}
        if (minutes < 10) {minutes_string = "0"+minutes.toString();}  else {minutes_string = minutes.toString();}

        if (hours === 0) {
            return minutes_string + "m";
        } else {
            return hours_string + "h " + minutes_string + "m";
        }
    }

    public toKM (distance : number) {
        return (distance/1000).toFixed(1);
    }

}

