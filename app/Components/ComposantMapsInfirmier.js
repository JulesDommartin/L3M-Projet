System.register(["@angular/core", "angular2-google-maps/core", "@Services/cabinetMedicalService"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, core_2, cabinetMedicalService_1;
    var htmlTemplate, ComposantMapsInfirmier;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (cabinetMedicalService_1_1) {
                cabinetMedicalService_1 = cabinetMedicalService_1_1;
            }],
        execute: function() {
            htmlTemplate = `
    <div class="composant-map-infirmier">
        <div class="map-infirmier map-infirmier-{{infirmier.id}}">
        </div>
        <div class="map-info">
            <p><b>Temps : {{time}}</b></p>
            <p><b>Distance : {{distance}} km</b></p>
        </div>
    </div>
`;
            ComposantMapsInfirmier = class ComposantMapsInfirmier {
                constructor(__loader, cms) {
                    this.__loader = __loader;
                    this.cms = cms;
                    this.positions = [];
                    this.colors = [];
                    this.time = "";
                    this.distance = "";
                }
                ngOnInit() {
                    this.__loader.load().then(() => {
                        this.directionService = new google.maps.DirectionsService();
                        this.geocoder = new google.maps.Geocoder();
                        this.map = new google.maps.Map(document.querySelector(".map-infirmier-" + this.infirmier.id), {
                            zoom: 12
                        });
                        this.getTrip();
                        this.colors = ["red", "green", "blue", "yellow", "purple", "grey"];
                        this.createReloadButton();
                    });
                }
                getTrip() {
                    this.positions = [];
                    this.directionDisplay = new google.maps.DirectionsRenderer();
                    let promises = [];
                    let adresseCabinet = this.cms.cabinetAdresse.numero + " "
                        + this.cms.cabinetAdresse.rue + " "
                        + this.cms.cabinetAdresse.ville + " "
                        + this.cms.cabinetAdresse.codePostal;
                    let promise = new Promise((resolve, reject) => {
                        this.geocoder.geocode({ "address": adresseCabinet }, (results, status) => {
                            if (status === google.maps.GeocoderStatus.OK) {
                                resolve(results);
                            }
                            else {
                                reject(status);
                            }
                        });
                    });
                    promises.push(promise);
                    for (let patient of this.infirmier.patients) {
                        let adresse = patient.adresse.ville + " "
                            + patient.adresse.rue + " "
                            + patient.adresse.codePostal + " "
                            + patient.adresse.numero;
                        let promise = new Promise((resolve, reject) => {
                            this.geocoder.geocode({ "address": adresse }, (results, status) => {
                                if (status === google.maps.GeocoderStatus.OK) {
                                    resolve(results);
                                }
                                else {
                                    reject(status);
                                }
                            });
                        });
                        promises.push(promise);
                    }
                    Promise.all(promises).then((res) => {
                        if (res.length === 1) {
                            console.log("Aucun patient");
                        }
                        else {
                            for (let obj of res) {
                                this.positions.push({ "location": obj[0].geometry.location });
                            }
                            this.displayMapDirection();
                        }
                    })
                        .catch((err) => {
                        console.log(err);
                    });
                }
                setMarkerForOnePatient(result) {
                    this.marker = new google.maps.Marker({
                        position: result.geometry.location,
                        map: this.map
                    });
                    this.map.setCenter(result.geometry.location);
                }
                displayMapDirection() {
                    let directionRequest = {
                        origin: this.positions[0].location,
                        destination: this.positions[0].location,
                        travelMode: google.maps.TravelMode.DRIVING,
                        waypoints: this.positions,
                        optimizeWaypoints: true
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
                            let totalTravelTime = 0;
                            let totalDistance = 0;
                            results.routes[0].legs.forEach((val) => {
                                totalTravelTime += val.duration.value;
                                totalDistance += val.distance.value;
                            });
                            this.time = this.toHHMMSS(totalTravelTime);
                            this.distance = this.toKM(totalDistance);
                        }
                        else {
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
                toHHMMSS(seconds) {
                    let hours = Math.floor(seconds / 3600);
                    let minutes = Math.floor((seconds - (hours * 3600)) / 60);
                    let hours_string = "";
                    let minutes_string = "";
                    if (hours < 10) {
                        hours_string = "0" + hours.toString();
                    }
                    else {
                        hours_string = hours.toString();
                    }
                    if (minutes < 10) {
                        minutes_string = "0" + minutes.toString();
                    }
                    else {
                        minutes_string = minutes.toString();
                    }
                    if (hours === 0) {
                        return minutes_string + "m";
                    }
                    else {
                        return hours_string + "h " + minutes_string + "m";
                    }
                }
                toKM(distance) {
                    return (distance / 1000).toFixed(1);
                }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], ComposantMapsInfirmier.prototype, "infirmier", void 0);
            ComposantMapsInfirmier = __decorate([
                core_1.Component({
                    selector: "composant-maps-infirmier",
                    template: htmlTemplate
                }), 
                __metadata('design:paramtypes', [core_2.MapsAPILoader, cabinetMedicalService_1.ServiceCabinetMedical])
            ], ComposantMapsInfirmier);
            exports_1("ComposantMapsInfirmier", ComposantMapsInfirmier);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50TWFwc0luZmlybWllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBSU0sWUFBWTs7Ozs7Ozs7Ozs7OztZQUFaLFlBQVksR0FBRzs7Ozs7Ozs7O0NBU3BCLENBQUM7WUFLRjtnQkFXSSxZQUFvQixRQUF1QixFQUFVLEdBQTJCO29CQUE1RCxhQUFRLEdBQVIsUUFBUSxDQUFlO29CQUFVLFFBQUcsR0FBSCxHQUFHLENBQXdCO29CQUpoRixjQUFTLEdBQTBDLEVBQUUsQ0FBQztvQkFDdEQsV0FBTSxHQUFnRCxFQUFFLENBQUM7b0JBQ3pELFNBQUksR0FBK0MsRUFBRSxDQUFDO29CQUN0RCxhQUFRLEdBQTJDLEVBQUUsQ0FBQztnQkFDNkIsQ0FBQztnQkFFcEYsUUFBUTtvQkFDSixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBRTt3QkFDdkIsSUFBSSxDQUFDLGdCQUFnQixHQUFLLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO3dCQUM5RCxJQUFJLENBQUMsUUFBUSxHQUFhLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDckQsSUFBSSxDQUFDLEdBQUcsR0FBa0IsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7NEJBQ3pHLElBQUksRUFBRSxFQUFFO3lCQUNYLENBQUMsQ0FBQzt3QkFDSCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7d0JBQ25FLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO29CQUM5QixDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUVNLE9BQU87b0JBQ1YsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztvQkFDN0QsSUFBSSxRQUFRLEdBQTZDLEVBQUUsQ0FBQztvQkFDNUQsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLEdBQUc7MEJBQ25ELElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsR0FBRyxHQUFHOzBCQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEdBQUcsR0FBRzswQkFDbkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDO29CQUN6QyxJQUFJLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNO3dCQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFDLFNBQVMsRUFBRSxjQUFjLEVBQUMsRUFDN0MsQ0FBQyxPQUFzQyxFQUFFLE1BQW1DOzRCQUN4RSxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQ0FDM0MsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUNyQixDQUFDOzRCQUFDLElBQUksQ0FBQyxDQUFDO2dDQUNKLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDbkIsQ0FBQzt3QkFDTCxDQUFDLENBQ0osQ0FBQztvQkFDTixDQUFDLENBQUMsQ0FBQztvQkFDSCxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN2QixHQUFHLENBQUMsQ0FBQyxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7d0JBQzFDLElBQUksT0FBTyxHQUFhLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEdBQUc7OEJBQzdDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUc7OEJBQ3pCLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLEdBQUc7OEJBQ2hDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO3dCQUM3QixJQUFJLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNOzRCQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUMsRUFDdEMsQ0FBQyxPQUFzQyxFQUFFLE1BQW1DO2dDQUN4RSxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQ0FDM0MsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dDQUNyQixDQUFDO2dDQUFDLElBQUksQ0FBQyxDQUFDO29DQUNKLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQ0FDbkIsQ0FBQzs0QkFDTCxDQUFDLENBQ0osQ0FBQzt3QkFDTixDQUFDLENBQUMsQ0FBQzt3QkFDSCxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUMzQixDQUFDO29CQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFFLENBQUMsR0FBeUM7d0JBQ2xFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQzt3QkFDakMsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDSixHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dDQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFDLFVBQVUsRUFBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBQyxDQUFDLENBQUM7NEJBQ2pFLENBQUM7NEJBQ0QsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7d0JBQy9CLENBQUM7b0JBR0wsQ0FBQyxDQUFDO3lCQUNELEtBQUssQ0FBRSxDQUFDLEdBQUc7d0JBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDckIsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFFRCxzQkFBc0IsQ0FBQyxNQUFtQztvQkFDdEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO3dCQUNqQyxRQUFRLEVBQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRO3dCQUN0QyxHQUFHLEVBQVcsSUFBSSxDQUFDLEdBQUc7cUJBQ3pCLENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNqRCxDQUFDO2dCQUVELG1CQUFtQjtvQkFDZixJQUFJLGdCQUFnQixHQUFHO3dCQUNuQixNQUFNLEVBQWdCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUTt3QkFDaEQsV0FBVyxFQUFXLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUTt3QkFDaEQsVUFBVSxFQUFZLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU87d0JBQ3BELFNBQVMsRUFBYSxJQUFJLENBQUMsU0FBUzt3QkFDcEMsaUJBQWlCLEVBQUssSUFBSTtxQkFDN0IsQ0FBQztvQkFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU07d0JBQzFELEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQzdDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUN2QyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUM1RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDO2dDQUM3QixlQUFlLEVBQUU7b0NBQ2IsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO2lDQUNuQzs2QkFDSixDQUFDLENBQUM7NEJBQ0gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDN0MsSUFBSSxlQUFlLEdBQVksQ0FBQyxDQUFDOzRCQUNqQyxJQUFJLGFBQWEsR0FBYyxDQUFDLENBQUM7NEJBQ2pDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUc7Z0NBQ2hDLGVBQWUsSUFBSyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztnQ0FDdkMsYUFBYSxJQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDOzRCQUMxQyxDQUFDLENBQUMsQ0FBQzs0QkFDSCxJQUFJLENBQUMsSUFBSSxHQUFTLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7NEJBQ2pELElBQUksQ0FBQyxRQUFRLEdBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzt3QkFDL0MsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsQ0FBQzt3QkFDdEMsQ0FBQztvQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUVELE1BQU07b0JBQ0YsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTt3QkFDMUYsSUFBSSxFQUFFLEVBQUU7cUJBQ1gsQ0FBQyxDQUFDO29CQUNILElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO29CQUMxQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ25CLENBQUM7Z0JBRUQsa0JBQWtCO29CQUVkLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzlDLFNBQVMsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQztvQkFDekMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCLENBQUM7b0JBQzFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztvQkFDckMsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsMEJBQTBCLENBQUM7b0JBQ3ZELFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztvQkFDbkMsU0FBUyxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO29CQUN0QyxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7b0JBQ3JDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsd0JBQXdCLENBQUM7b0JBRTNDLElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2hELFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQztvQkFDMUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcseUJBQXlCLENBQUM7b0JBQ3pELFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztvQkFDcEMsV0FBVyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO29CQUN0QyxXQUFXLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7b0JBQ3RDLFdBQVcsQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztvQkFDdkMsV0FBVyxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7b0JBQ3BDLFNBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBRW5DLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7d0JBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDbEIsQ0FBQyxDQUFDLENBQUM7b0JBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUU3RSxDQUFDO2dCQUVNLFFBQVEsQ0FBRSxPQUFnQjtvQkFDN0IsSUFBSSxLQUFLLEdBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUM7b0JBQ3pDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztvQkFFMUQsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO29CQUN0QixJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUM7b0JBRXhCLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUFBLFlBQVksR0FBSyxHQUFHLEdBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUFBLENBQUM7b0JBQUksSUFBSSxDQUFDLENBQUM7d0JBQUEsWUFBWSxHQUFLLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFBQSxDQUFDO29CQUN2RyxFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFBQSxjQUFjLEdBQUcsR0FBRyxHQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFBQSxDQUFDO29CQUFFLElBQUksQ0FBQyxDQUFDO3dCQUFBLGNBQWMsR0FBRyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQUEsQ0FBQztvQkFFekcsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2QsTUFBTSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUM7b0JBQ2hDLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osTUFBTSxDQUFDLFlBQVksR0FBRyxJQUFJLEdBQUcsY0FBYyxHQUFHLEdBQUcsQ0FBQztvQkFDdEQsQ0FBQztnQkFDTCxDQUFDO2dCQUVNLElBQUksQ0FBRSxRQUFpQjtvQkFDMUIsTUFBTSxDQUFDLENBQUMsUUFBUSxHQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsQ0FBQztZQUVMLENBQUM7WUFuTEc7Z0JBQUMsWUFBSyxFQUFFOztxRUFBQTtZQUxaO2dCQUFDLGdCQUFTLENBQUM7b0JBQ1AsUUFBUSxFQUFHLDBCQUEwQjtvQkFDckMsUUFBUSxFQUFHLFlBQVk7aUJBQzFCLENBQUM7O3NDQUFBO1lBQ0YsMkRBb0xDLENBQUEiLCJmaWxlIjoiQ29tcG9uZW50cy9Db21wb3NhbnRNYXBzSW5maXJtaWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgSW5wdXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBNYXBzQVBJTG9hZGVyIH0gZnJvbSBcImFuZ3VsYXIyLWdvb2dsZS1tYXBzL2NvcmVcIjtcbmltcG9ydCB7SW5maXJtaWVySW50ZXJmYWNlLCBTZXJ2aWNlQ2FiaW5ldE1lZGljYWx9IGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XG5cbmNvbnN0IGh0bWxUZW1wbGF0ZSA9IGBcbiAgICA8ZGl2IGNsYXNzPVwiY29tcG9zYW50LW1hcC1pbmZpcm1pZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1hcC1pbmZpcm1pZXIgbWFwLWluZmlybWllci17e2luZmlybWllci5pZH19XCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWFwLWluZm9cIj5cbiAgICAgICAgICAgIDxwPjxiPlRlbXBzIDoge3t0aW1lfX08L2I+PC9wPlxuICAgICAgICAgICAgPHA+PGI+RGlzdGFuY2UgOiB7e2Rpc3RhbmNlfX0ga208L2I+PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbmA7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3Rvclx0OiBcImNvbXBvc2FudC1tYXBzLWluZmlybWllclwiLFxuICAgIHRlbXBsYXRlXHQ6IGh0bWxUZW1wbGF0ZVxufSlcbmV4cG9ydCBjbGFzcyBDb21wb3NhbnRNYXBzSW5maXJtaWVyIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBpbmZpcm1pZXIgICAgICAgICAgICAgICAgICAgICAgOiBJbmZpcm1pZXJJbnRlcmZhY2U7XG4gICAgZ2VvY29kZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZ29vZ2xlLm1hcHMuR2VvY29kZXI7XG4gICAgbWFwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZ29vZ2xlLm1hcHMuTWFwO1xuICAgIG1hcmtlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGdvb2dsZS5tYXBzLk1hcmtlcjtcbiAgICBkaXJlY3Rpb25TZXJ2aWNlICAgICAgICAgICAgICAgICAgICAgICAgOiBnb29nbGUubWFwcy5EaXJlY3Rpb25zU2VydmljZTtcbiAgICBkaXJlY3Rpb25EaXNwbGF5ICAgICAgICAgICAgICAgICAgICAgICAgOiBnb29nbGUubWFwcy5EaXJlY3Rpb25zUmVuZGVyZXI7XG4gICAgcG9zaXRpb25zICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYW55IFtdID0gW107XG4gICAgY29sb3JzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogc3RyaW5nIFtdID0gW107XG4gICAgdGltZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogc3RyaW5nID0gXCJcIjtcbiAgICBkaXN0YW5jZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBzdHJpbmcgPSBcIlwiO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX19sb2FkZXI6IE1hcHNBUElMb2FkZXIsIHByaXZhdGUgY21zIDogU2VydmljZUNhYmluZXRNZWRpY2FsKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuX19sb2FkZXIubG9hZCgpLnRoZW4oICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uU2VydmljZSAgID0gbmV3IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNTZXJ2aWNlKCk7XG4gICAgICAgICAgICB0aGlzLmdlb2NvZGVyICAgICAgICAgICA9IG5ldyBnb29nbGUubWFwcy5HZW9jb2RlcigpO1xuICAgICAgICAgICAgdGhpcy5tYXAgICAgICAgICAgICAgICAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFwLWluZmlybWllci1cIiArIHRoaXMuaW5maXJtaWVyLmlkKSwge1xuICAgICAgICAgICAgICAgIHpvb206IDEyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZ2V0VHJpcCgpO1xuICAgICAgICAgICAgdGhpcy5jb2xvcnMgPSBbXCJyZWRcIiwgXCJncmVlblwiLCBcImJsdWVcIiwgXCJ5ZWxsb3dcIiwgXCJwdXJwbGVcIiwgXCJncmV5XCJdO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVSZWxvYWRCdXR0b24oKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFRyaXAoKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb25zID0gW107XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uRGlzcGxheSA9IG5ldyBnb29nbGUubWFwcy5EaXJlY3Rpb25zUmVuZGVyZXIoKTtcbiAgICAgICAgbGV0IHByb21pc2VzIDogUHJvbWlzZTxnb29nbGUubWFwcy5HZW9jb2RlclJlc3VsdFtdPltdID0gW107XG4gICAgICAgIGxldCBhZHJlc3NlQ2FiaW5ldCA9IHRoaXMuY21zLmNhYmluZXRBZHJlc3NlLm51bWVybyArIFwiIFwiXG4gICAgICAgICAgICArIHRoaXMuY21zLmNhYmluZXRBZHJlc3NlLnJ1ZSArIFwiIFwiXG4gICAgICAgICAgICArIHRoaXMuY21zLmNhYmluZXRBZHJlc3NlLnZpbGxlICsgXCIgXCJcbiAgICAgICAgICAgICsgdGhpcy5jbXMuY2FiaW5ldEFkcmVzc2UuY29kZVBvc3RhbDtcbiAgICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmdlb2NvZGVyLmdlb2NvZGUoe1wiYWRkcmVzc1wiOiBhZHJlc3NlQ2FiaW5ldH0sXG4gICAgICAgICAgICAgICAgKHJlc3VsdHMgOiBnb29nbGUubWFwcy5HZW9jb2RlclJlc3VsdFtdLCBzdGF0dXMgOiBnb29nbGUubWFwcy5HZW9jb2RlclN0YXR1cykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSBnb29nbGUubWFwcy5HZW9jb2RlclN0YXR1cy5PSykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChzdGF0dXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHByb21pc2VzLnB1c2gocHJvbWlzZSk7XG4gICAgICAgIGZvciAobGV0IHBhdGllbnQgb2YgdGhpcy5pbmZpcm1pZXIucGF0aWVudHMpIHtcbiAgICAgICAgICAgIGxldCBhZHJlc3NlIDogc3RyaW5nID0gIHBhdGllbnQuYWRyZXNzZS52aWxsZSArIFwiIFwiXG4gICAgICAgICAgICAgICAgKyBwYXRpZW50LmFkcmVzc2UucnVlICsgXCIgXCJcbiAgICAgICAgICAgICAgICArIHBhdGllbnQuYWRyZXNzZS5jb2RlUG9zdGFsICsgXCIgXCJcbiAgICAgICAgICAgICAgICArIHBhdGllbnQuYWRyZXNzZS5udW1lcm87XG4gICAgICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdlb2NvZGVyLmdlb2NvZGUoe1wiYWRkcmVzc1wiOiBhZHJlc3NlfSxcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdHMgOiBnb29nbGUubWFwcy5HZW9jb2RlclJlc3VsdFtdLCBzdGF0dXMgOiBnb29nbGUubWFwcy5HZW9jb2RlclN0YXR1cykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gZ29vZ2xlLm1hcHMuR2VvY29kZXJTdGF0dXMuT0spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3Qoc3RhdHVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2gocHJvbWlzZSk7XG4gICAgICAgIH1cbiAgICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oIChyZXMgOiBBcnJheTxnb29nbGUubWFwcy5HZW9jb2RlclJlc3VsdFtdPikgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkF1Y3VuIHBhdGllbnRcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IG9iaiBvZiByZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnMucHVzaCh7XCJsb2NhdGlvblwiIDogb2JqWzBdLmdlb21ldHJ5LmxvY2F0aW9ufSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheU1hcERpcmVjdGlvbigpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKCAoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRNYXJrZXJGb3JPbmVQYXRpZW50KHJlc3VsdCA6IGdvb2dsZS5tYXBzLkdlb2NvZGVyUmVzdWx0KSB7XG4gICAgICAgIHRoaXMubWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4gICAgICAgICAgICBwb3NpdGlvbiAgICA6IHJlc3VsdC5nZW9tZXRyeS5sb2NhdGlvbixcbiAgICAgICAgICAgIG1hcCAgICAgICAgIDogdGhpcy5tYXBcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubWFwLnNldENlbnRlcihyZXN1bHQuZ2VvbWV0cnkubG9jYXRpb24pO1xuICAgIH1cblxuICAgIGRpc3BsYXlNYXBEaXJlY3Rpb24oKSB7XG4gICAgICAgIGxldCBkaXJlY3Rpb25SZXF1ZXN0ID0ge1xuICAgICAgICAgICAgb3JpZ2luICAgICAgICAgICAgICA6IHRoaXMucG9zaXRpb25zWzBdLmxvY2F0aW9uLFxuICAgICAgICAgICAgZGVzdGluYXRpb24gICAgICAgICA6IHRoaXMucG9zaXRpb25zWzBdLmxvY2F0aW9uLFxuICAgICAgICAgICAgdHJhdmVsTW9kZSAgICAgICAgICA6IGdvb2dsZS5tYXBzLlRyYXZlbE1vZGUuRFJJVklORyxcbiAgICAgICAgICAgIHdheXBvaW50cyAgICAgICAgICAgOiB0aGlzLnBvc2l0aW9ucyxcbiAgICAgICAgICAgIG9wdGltaXplV2F5cG9pbnRzICAgOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uU2VydmljZS5yb3V0ZShkaXJlY3Rpb25SZXF1ZXN0LCAocmVzdWx0cywgc3RhdHVzKSA9PiB7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSBnb29nbGUubWFwcy5EaXJlY3Rpb25zU3RhdHVzLk9LKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25EaXNwbGF5LnNldE1hcCh0aGlzLm1hcCk7XG4gICAgICAgICAgICAgICAgbGV0IHJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuY29sb3JzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25EaXNwbGF5LnNldE9wdGlvbnMoe1xuICAgICAgICAgICAgICAgICAgICBwb2x5bGluZU9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiB0aGlzLmNvbG9yc1tyYW5kb21dXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbkRpc3BsYXkuc2V0RGlyZWN0aW9ucyhyZXN1bHRzKTtcbiAgICAgICAgICAgICAgICBsZXQgdG90YWxUcmF2ZWxUaW1lIDogbnVtYmVyID0gMDtcbiAgICAgICAgICAgICAgICBsZXQgdG90YWxEaXN0YW5jZSAgIDogbnVtYmVyID0gMDtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnJvdXRlc1swXS5sZWdzLmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgIHRvdGFsVHJhdmVsVGltZSAgKz0gdmFsLmR1cmF0aW9uLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgIHRvdGFsRGlzdGFuY2UgICAgKz0gdmFsLmRpc3RhbmNlLnZhbHVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMudGltZSAgICAgICA9IHRoaXMudG9ISE1NU1ModG90YWxUcmF2ZWxUaW1lKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3RhbmNlICAgPSB0aGlzLnRvS00odG90YWxEaXN0YW5jZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3RhdHVzIDogXCIgKyBzdGF0dXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWxvYWQoKSB7XG4gICAgICAgIHRoaXMubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1hcC1pbmZpcm1pZXItXCIgKyB0aGlzLmluZmlybWllci5pZCksIHtcbiAgICAgICAgICAgIHpvb206IDEyXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNyZWF0ZVJlbG9hZEJ1dHRvbigpO1xuICAgICAgICB0aGlzLmdldFRyaXAoKTtcbiAgICB9XG5cbiAgICBjcmVhdGVSZWxvYWRCdXR0b24oKSB7XG5cbiAgICAgICAgdmFyIGNvbnRyb2xVSSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNvbnRyb2xVSS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNmZmZcIjtcbiAgICAgICAgY29udHJvbFVJLnN0eWxlLmJvcmRlciA9IFwiMnB4IHNvbGlkICNmZmZcIjtcbiAgICAgICAgY29udHJvbFVJLnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiM3B4XCI7XG4gICAgICAgIGNvbnRyb2xVSS5zdHlsZS5ib3hTaGFkb3cgPSBcIjAgMnB4IDZweCByZ2JhKDAsMCwwLC4zKVwiO1xuICAgICAgICBjb250cm9sVUkuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgICAgIGNvbnRyb2xVSS5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjIycHhcIjtcbiAgICAgICAgY29udHJvbFVJLnN0eWxlLnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgICAgIGNvbnRyb2xVSS50aXRsZSA9IFwiQ2xpcXVleiBwb3VyIHJlY2hhcmdlclwiO1xuXG4gICAgICAgIHZhciBjb250cm9sVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNvbnRyb2xUZXh0LnN0eWxlLmNvbG9yID0gXCJyZ2IoMjUsMjUsMjUpXCI7XG4gICAgICAgIGNvbnRyb2xUZXh0LnN0eWxlLmZvbnRGYW1pbHkgPSBcIlJvYm90byxBcmlhbCxzYW5zLXNlcmlmXCI7XG4gICAgICAgIGNvbnRyb2xUZXh0LnN0eWxlLmZvbnRTaXplID0gXCIxNnB4XCI7XG4gICAgICAgIGNvbnRyb2xUZXh0LnN0eWxlLmxpbmVIZWlnaHQgPSBcIjM4cHhcIjtcbiAgICAgICAgY29udHJvbFRleHQuc3R5bGUucGFkZGluZ0xlZnQgPSBcIjVweFwiO1xuICAgICAgICBjb250cm9sVGV4dC5zdHlsZS5wYWRkaW5nUmlnaHQgPSBcIjVweFwiO1xuICAgICAgICBjb250cm9sVGV4dC5pbm5lckhUTUwgPSBcIlJlY2hhcmdlclwiO1xuICAgICAgICBjb250cm9sVUkuYXBwZW5kQ2hpbGQoY29udHJvbFRleHQpO1xuXG4gICAgICAgIGNvbnRyb2xVSS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWxvYWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tYXAuY29udHJvbHNbZ29vZ2xlLm1hcHMuQ29udHJvbFBvc2l0aW9uLlRPUF9SSUdIVF0ucHVzaChjb250cm9sVUkpO1xuXG4gICAgfVxuXG4gICAgcHVibGljIHRvSEhNTVNTIChzZWNvbmRzIDogbnVtYmVyKSA6IHN0cmluZyB7XG4gICAgICAgIGxldCBob3VycyAgID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gMzYwMCk7XG4gICAgICAgIGxldCBtaW51dGVzID0gTWF0aC5mbG9vcigoc2Vjb25kcyAtIChob3VycyAqIDM2MDApKSAvIDYwKTtcblxuICAgICAgICBsZXQgaG91cnNfc3RyaW5nID0gXCJcIjtcbiAgICAgICAgbGV0IG1pbnV0ZXNfc3RyaW5nID0gXCJcIjtcblxuICAgICAgICBpZiAoaG91cnMgICA8IDEwKSB7aG91cnNfc3RyaW5nICAgPSBcIjBcIitob3Vycy50b1N0cmluZygpO30gICAgZWxzZSB7aG91cnNfc3RyaW5nICAgPSBob3Vycy50b1N0cmluZygpO31cbiAgICAgICAgaWYgKG1pbnV0ZXMgPCAxMCkge21pbnV0ZXNfc3RyaW5nID0gXCIwXCIrbWludXRlcy50b1N0cmluZygpO30gIGVsc2Uge21pbnV0ZXNfc3RyaW5nID0gbWludXRlcy50b1N0cmluZygpO31cblxuICAgICAgICBpZiAoaG91cnMgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBtaW51dGVzX3N0cmluZyArIFwibVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGhvdXJzX3N0cmluZyArIFwiaCBcIiArIG1pbnV0ZXNfc3RyaW5nICsgXCJtXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdG9LTSAoZGlzdGFuY2UgOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIChkaXN0YW5jZS8xMDAwKS50b0ZpeGVkKDEpO1xuICAgIH1cblxufVxuXG4iXSwic291cmNlUm9vdCI6IiJ9
