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
                    let adresseCabinet = this.cms.cabinetAdresse.numero + " "
                        + this.cms.cabinetAdresse.rue + " "
                        + this.cms.cabinetAdresse.ville + " "
                        + this.cms.cabinetAdresse.codePostal;
                    this.cms.Promesse.then(() => {
                        this.geocoder.geocode({ "address": adresseCabinet }, (results, status) => {
                            if (status === google.maps.GeocoderStatus.OK) {
                                this.positions.push({ "location": results[0].geometry.location });
                                this.infirmier.patients.forEach((val) => {
                                    this.positions.push({ "location": val.adresse.latlng });
                                });
                                this.displayMapDirection();
                            }
                            else {
                                console.error(status);
                            }
                        });
                    });
                    //this.execPromise(promises, 0);
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
                        return minutes_string + "mn";
                    }
                    else {
                        return hours_string + "h " + minutes_string + "mn";
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50TWFwc0luZmlybWllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBSU0sWUFBWTs7Ozs7Ozs7Ozs7OztZQUFaLFlBQVksR0FBRzs7Ozs7Ozs7O0NBU3BCLENBQUM7WUFLRjtnQkFXSSxZQUFvQixRQUF1QixFQUFVLEdBQTJCO29CQUE1RCxhQUFRLEdBQVIsUUFBUSxDQUFlO29CQUFVLFFBQUcsR0FBSCxHQUFHLENBQXdCO29CQUpoRixjQUFTLEdBQTBDLEVBQUUsQ0FBQztvQkFDdEQsV0FBTSxHQUFnRCxFQUFFLENBQUM7b0JBQ3pELFNBQUksR0FBK0MsRUFBRSxDQUFDO29CQUN0RCxhQUFRLEdBQTJDLEVBQUUsQ0FBQztnQkFDNkIsQ0FBQztnQkFFcEYsUUFBUTtvQkFDSixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBRTt3QkFDdkIsSUFBSSxDQUFDLGdCQUFnQixHQUFLLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO3dCQUM5RCxJQUFJLENBQUMsUUFBUSxHQUFhLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDckQsSUFBSSxDQUFDLEdBQUcsR0FBa0IsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7NEJBQ3pHLElBQUksRUFBRSxFQUFFO3lCQUNYLENBQUMsQ0FBQzt3QkFDSCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7d0JBQ25FLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO29C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LEdBQUcsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUFBLENBQUM7b0JBRXpHLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNkLE1BQU0sQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO29CQUNqQyxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLE1BQU0sQ0FBQyxZQUFZLEdBQUcsSUFBSSxHQUFHLGNBQWMsR0FBRyxJQUFJLENBQUM7b0JBQ3ZELENBQUM7Z0JBQ0wsQ0FBQztnQkFFTSxJQUFJLENBQUUsUUFBaUI7b0JBQzFCLE1BQU0sQ0FBQyxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLENBQUM7WUFFTCxDQUFDO1lBckpHO2dCQUFDLFlBQUssRUFBRTs7cUVBQUE7WUFMWjtnQkFBQyxnQkFBUyxDQUFDO29CQUNQLFFBQVEsRUFBRywwQkFBMEI7b0JBQ3JDLFFBQVEsRUFBRyxZQUFZO2lCQUMxQixDQUFDOztzQ0FBQTtZQUNGLDJEQXNKQyxDQUFBIiwiZmlsZSI6IkNvbXBvbmVudHMvQ29tcG9zYW50TWFwc0luZmlybWllci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIElucHV0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTWFwc0FQSUxvYWRlciB9IGZyb20gXCJhbmd1bGFyMi1nb29nbGUtbWFwcy9jb3JlXCI7XG5pbXBvcnQge0luZmlybWllckludGVyZmFjZSwgU2VydmljZUNhYmluZXRNZWRpY2FsfSBmcm9tIFwiQFNlcnZpY2VzL2NhYmluZXRNZWRpY2FsU2VydmljZVwiO1xuXG5jb25zdCBodG1sVGVtcGxhdGUgPSBgXG4gICAgPGRpdiBjbGFzcz1cImNvbXBvc2FudC1tYXAtaW5maXJtaWVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtYXAtaW5maXJtaWVyIG1hcC1pbmZpcm1pZXIte3tpbmZpcm1pZXIuaWR9fVwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1hcC1pbmZvXCI+XG4gICAgICAgICAgICA8cD48Yj5UZW1wcyA6IHt7dGltZX19PC9iPjwvcD5cbiAgICAgICAgICAgIDxwPjxiPkRpc3RhbmNlIDoge3tkaXN0YW5jZX19IGttPC9iPjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5gO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3JcdDogXCJjb21wb3NhbnQtbWFwcy1pbmZpcm1pZXJcIixcbiAgICB0ZW1wbGF0ZVx0OiBodG1sVGVtcGxhdGVcbn0pXG5leHBvcnQgY2xhc3MgQ29tcG9zYW50TWFwc0luZmlybWllciBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgaW5maXJtaWVyICAgICAgICAgICAgICAgICAgICAgIDogSW5maXJtaWVySW50ZXJmYWNlO1xuICAgIGdlb2NvZGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGdvb2dsZS5tYXBzLkdlb2NvZGVyO1xuICAgIG1hcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGdvb2dsZS5tYXBzLk1hcDtcbiAgICBtYXJrZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBnb29nbGUubWFwcy5NYXJrZXI7XG4gICAgZGlyZWN0aW9uU2VydmljZSAgICAgICAgICAgICAgICAgICAgICAgIDogZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1NlcnZpY2U7XG4gICAgZGlyZWN0aW9uRGlzcGxheSAgICAgICAgICAgICAgICAgICAgICAgIDogZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1JlbmRlcmVyO1xuICAgIHBvc2l0aW9ucyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGFueSBbXSA9IFtdO1xuICAgIGNvbG9ycyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHN0cmluZyBbXSA9IFtdO1xuICAgIHRpbWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHN0cmluZyA9IFwiXCI7XG4gICAgZGlzdGFuY2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogc3RyaW5nID0gXCJcIjtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9fbG9hZGVyOiBNYXBzQVBJTG9hZGVyLCBwcml2YXRlIGNtcyA6IFNlcnZpY2VDYWJpbmV0TWVkaWNhbCkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLl9fbG9hZGVyLmxvYWQoKS50aGVuKCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvblNlcnZpY2UgICA9IG5ldyBnb29nbGUubWFwcy5EaXJlY3Rpb25zU2VydmljZSgpO1xuICAgICAgICAgICAgdGhpcy5nZW9jb2RlciAgICAgICAgICAgPSBuZXcgZ29vZ2xlLm1hcHMuR2VvY29kZXIoKTtcbiAgICAgICAgICAgIHRoaXMubWFwICAgICAgICAgICAgICAgID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1hcC1pbmZpcm1pZXItXCIgKyB0aGlzLmluZmlybWllci5pZCksIHtcbiAgICAgICAgICAgICAgICB6b29tOiAxMlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmdldFRyaXAoKTtcbiAgICAgICAgICAgIHRoaXMuY29sb3JzID0gW1wicmVkXCIsIFwiZ3JlZW5cIiwgXCJibHVlXCIsIFwieWVsbG93XCIsIFwicHVycGxlXCIsIFwiZ3JleVwiXTtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUmVsb2FkQnV0dG9uKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRUcmlwKCkge1xuICAgICAgICB0aGlzLnBvc2l0aW9ucyA9IFtdO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbkRpc3BsYXkgPSBuZXcgZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1JlbmRlcmVyKCk7XG4gICAgICAgIGxldCBhZHJlc3NlQ2FiaW5ldCA9IHRoaXMuY21zLmNhYmluZXRBZHJlc3NlLm51bWVybyArIFwiIFwiXG4gICAgICAgICAgICArIHRoaXMuY21zLmNhYmluZXRBZHJlc3NlLnJ1ZSArIFwiIFwiXG4gICAgICAgICAgICArIHRoaXMuY21zLmNhYmluZXRBZHJlc3NlLnZpbGxlICsgXCIgXCJcbiAgICAgICAgICAgICsgdGhpcy5jbXMuY2FiaW5ldEFkcmVzc2UuY29kZVBvc3RhbDtcbiAgICAgICAgdGhpcy5jbXMuUHJvbWVzc2UudGhlbiggKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZW9jb2Rlci5nZW9jb2RlKHtcImFkZHJlc3NcIjogYWRyZXNzZUNhYmluZXR9LFxuICAgICAgICAgICAgICAgIChyZXN1bHRzIDogZ29vZ2xlLm1hcHMuR2VvY29kZXJSZXN1bHRbXSwgc3RhdHVzIDogZ29vZ2xlLm1hcHMuR2VvY29kZXJTdGF0dXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gZ29vZ2xlLm1hcHMuR2VvY29kZXJTdGF0dXMuT0spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zLnB1c2goe1wibG9jYXRpb25cIiA6IHJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb259KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5maXJtaWVyLnBhdGllbnRzLmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zLnB1c2goe1wibG9jYXRpb25cIiA6IHZhbC5hZHJlc3NlLmxhdGxuZ30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlNYXBEaXJlY3Rpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3Ioc3RhdHVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgICAvL3RoaXMuZXhlY1Byb21pc2UocHJvbWlzZXMsIDApO1xuICAgIH1cblxuICAgIHNldE1hcmtlckZvck9uZVBhdGllbnQocmVzdWx0IDogZ29vZ2xlLm1hcHMuR2VvY29kZXJSZXN1bHQpIHtcbiAgICAgICAgdGhpcy5tYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgICAgICAgIHBvc2l0aW9uICAgIDogcmVzdWx0Lmdlb21ldHJ5LmxvY2F0aW9uLFxuICAgICAgICAgICAgbWFwICAgICAgICAgOiB0aGlzLm1hcFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5tYXAuc2V0Q2VudGVyKHJlc3VsdC5nZW9tZXRyeS5sb2NhdGlvbik7XG4gICAgfVxuXG4gICAgZGlzcGxheU1hcERpcmVjdGlvbigpIHtcbiAgICAgICAgbGV0IGRpcmVjdGlvblJlcXVlc3QgPSB7XG4gICAgICAgICAgICBvcmlnaW4gICAgICAgICAgICAgIDogdGhpcy5wb3NpdGlvbnNbMF0ubG9jYXRpb24sXG4gICAgICAgICAgICBkZXN0aW5hdGlvbiAgICAgICAgIDogdGhpcy5wb3NpdGlvbnNbMF0ubG9jYXRpb24sXG4gICAgICAgICAgICB0cmF2ZWxNb2RlICAgICAgICAgIDogZ29vZ2xlLm1hcHMuVHJhdmVsTW9kZS5EUklWSU5HLFxuICAgICAgICAgICAgd2F5cG9pbnRzICAgICAgICAgICA6IHRoaXMucG9zaXRpb25zLFxuICAgICAgICAgICAgb3B0aW1pemVXYXlwb2ludHMgICA6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25TZXJ2aWNlLnJvdXRlKGRpcmVjdGlvblJlcXVlc3QsIChyZXN1bHRzLCBzdGF0dXMpID0+IHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNTdGF0dXMuT0spIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbkRpc3BsYXkuc2V0TWFwKHRoaXMubWFwKTtcbiAgICAgICAgICAgICAgICBsZXQgcmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5jb2xvcnMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbkRpc3BsYXkuc2V0T3B0aW9ucyh7XG4gICAgICAgICAgICAgICAgICAgIHBvbHlsaW5lT3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IHRoaXMuY29sb3JzW3JhbmRvbV1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uRGlzcGxheS5zZXREaXJlY3Rpb25zKHJlc3VsdHMpO1xuICAgICAgICAgICAgICAgIGxldCB0b3RhbFRyYXZlbFRpbWUgOiBudW1iZXIgPSAwO1xuICAgICAgICAgICAgICAgIGxldCB0b3RhbERpc3RhbmNlICAgOiBudW1iZXIgPSAwO1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucm91dGVzWzBdLmxlZ3MuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgdG90YWxUcmF2ZWxUaW1lICArPSB2YWwuZHVyYXRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgdG90YWxEaXN0YW5jZSAgICArPSB2YWwuZGlzdGFuY2UudmFsdWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lICAgICAgID0gdGhpcy50b0hITU1TUyh0b3RhbFRyYXZlbFRpbWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzdGFuY2UgICA9IHRoaXMudG9LTSh0b3RhbERpc3RhbmNlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdGF0dXMgOiBcIiArIHN0YXR1cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbG9hZCgpIHtcbiAgICAgICAgdGhpcy5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFwLWluZmlybWllci1cIiArIHRoaXMuaW5maXJtaWVyLmlkKSwge1xuICAgICAgICAgICAgem9vbTogMTJcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY3JlYXRlUmVsb2FkQnV0dG9uKCk7XG4gICAgICAgIHRoaXMuZ2V0VHJpcCgpO1xuICAgIH1cblxuICAgIGNyZWF0ZVJlbG9hZEJ1dHRvbigpIHtcblxuICAgICAgICB2YXIgY29udHJvbFVJID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgY29udHJvbFVJLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI2ZmZlwiO1xuICAgICAgICBjb250cm9sVUkuc3R5bGUuYm9yZGVyID0gXCIycHggc29saWQgI2ZmZlwiO1xuICAgICAgICBjb250cm9sVUkuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCIzcHhcIjtcbiAgICAgICAgY29udHJvbFVJLnN0eWxlLmJveFNoYWRvdyA9IFwiMCAycHggNnB4IHJnYmEoMCwwLDAsLjMpXCI7XG4gICAgICAgIGNvbnRyb2xVSS5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICAgICAgY29udHJvbFVJLnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiMjJweFwiO1xuICAgICAgICBjb250cm9sVUkuc3R5bGUudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICAgICAgY29udHJvbFVJLnRpdGxlID0gXCJDbGlxdWV6IHBvdXIgcmVjaGFyZ2VyXCI7XG5cbiAgICAgICAgdmFyIGNvbnRyb2xUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgY29udHJvbFRleHQuc3R5bGUuY29sb3IgPSBcInJnYigyNSwyNSwyNSlcIjtcbiAgICAgICAgY29udHJvbFRleHQuc3R5bGUuZm9udEZhbWlseSA9IFwiUm9ib3RvLEFyaWFsLHNhbnMtc2VyaWZcIjtcbiAgICAgICAgY29udHJvbFRleHQuc3R5bGUuZm9udFNpemUgPSBcIjE2cHhcIjtcbiAgICAgICAgY29udHJvbFRleHQuc3R5bGUubGluZUhlaWdodCA9IFwiMzhweFwiO1xuICAgICAgICBjb250cm9sVGV4dC5zdHlsZS5wYWRkaW5nTGVmdCA9IFwiNXB4XCI7XG4gICAgICAgIGNvbnRyb2xUZXh0LnN0eWxlLnBhZGRpbmdSaWdodCA9IFwiNXB4XCI7XG4gICAgICAgIGNvbnRyb2xUZXh0LmlubmVySFRNTCA9IFwiUmVjaGFyZ2VyXCI7XG4gICAgICAgIGNvbnRyb2xVSS5hcHBlbmRDaGlsZChjb250cm9sVGV4dCk7XG5cbiAgICAgICAgY29udHJvbFVJLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbG9hZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1hcC5jb250cm9sc1tnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb24uVE9QX1JJR0hUXS5wdXNoKGNvbnRyb2xVSSk7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgdG9ISE1NU1MgKHNlY29uZHMgOiBudW1iZXIpIDogc3RyaW5nIHtcbiAgICAgICAgbGV0IGhvdXJzICAgPSBNYXRoLmZsb29yKHNlY29uZHMgLyAzNjAwKTtcbiAgICAgICAgbGV0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKChzZWNvbmRzIC0gKGhvdXJzICogMzYwMCkpIC8gNjApO1xuXG4gICAgICAgIGxldCBob3Vyc19zdHJpbmcgPSBcIlwiO1xuICAgICAgICBsZXQgbWludXRlc19zdHJpbmcgPSBcIlwiO1xuXG4gICAgICAgIGlmIChob3VycyAgIDwgMTApIHtob3Vyc19zdHJpbmcgICA9IFwiMFwiK2hvdXJzLnRvU3RyaW5nKCk7fSAgICBlbHNlIHtob3Vyc19zdHJpbmcgICA9IGhvdXJzLnRvU3RyaW5nKCk7fVxuICAgICAgICBpZiAobWludXRlcyA8IDEwKSB7bWludXRlc19zdHJpbmcgPSBcIjBcIittaW51dGVzLnRvU3RyaW5nKCk7fSAgZWxzZSB7bWludXRlc19zdHJpbmcgPSBtaW51dGVzLnRvU3RyaW5nKCk7fVxuXG4gICAgICAgIGlmIChob3VycyA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG1pbnV0ZXNfc3RyaW5nICsgXCJtblwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGhvdXJzX3N0cmluZyArIFwiaCBcIiArIG1pbnV0ZXNfc3RyaW5nICsgXCJtblwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHRvS00gKGRpc3RhbmNlIDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiAoZGlzdGFuY2UvMTAwMCkudG9GaXhlZCgxKTtcbiAgICB9XG5cbn1cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==
