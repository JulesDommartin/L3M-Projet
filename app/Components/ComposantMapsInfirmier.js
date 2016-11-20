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
    <div class="map-infirmier map-infirmier-{{infirmier.id}}">
    </div>
`;
            ComposantMapsInfirmier = class ComposantMapsInfirmier {
                constructor(__loader, cms) {
                    this.__loader = __loader;
                    this.cms = cms;
                    this.positions = [];
                    this.colors = [];
                }
                ngOnInit() {
                    this.__loader.load().then(() => {
                        this.directionService = new google.maps.DirectionsService();
                        this.geocoder = new google.maps.Geocoder();
                        console.log(".map-infirmier-" + this.infirmier.id);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50TWFwc0luZmlybWllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBSU0sWUFBWTs7Ozs7Ozs7Ozs7OztZQUFaLFlBQVksR0FBRzs7O0NBR3BCLENBQUM7WUFLRjtnQkFVSSxZQUFvQixRQUF1QixFQUFVLEdBQTJCO29CQUE1RCxhQUFRLEdBQVIsUUFBUSxDQUFlO29CQUFVLFFBQUcsR0FBSCxHQUFHLENBQXdCO29CQUZoRixjQUFTLEdBQTBDLEVBQUUsQ0FBQztvQkFDdEQsV0FBTSxHQUFnRCxFQUFFLENBQUM7Z0JBQzBCLENBQUM7Z0JBRXBGLFFBQVE7b0JBQ0osSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUU7d0JBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsR0FBSyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzt3QkFDOUQsSUFBSSxDQUFDLFFBQVEsR0FBYSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDbkQsSUFBSSxDQUFDLEdBQUcsR0FBa0IsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7NEJBQ3pHLElBQUksRUFBRSxFQUFFO3lCQUNYLENBQUMsQ0FBQzt3QkFDSCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7d0JBQ25FLElBQUksQ0FBQyxrQkFBa0Is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TSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUU3RSxDQUFDO1lBRUwsQ0FBQztZQXZKRztnQkFBQyxZQUFLLEVBQUU7O3FFQUFBO1lBTFo7Z0JBQUMsZ0JBQVMsQ0FBQztvQkFDUCxRQUFRLEVBQUcsMEJBQTBCO29CQUNyQyxRQUFRLEVBQUcsWUFBWTtpQkFDMUIsQ0FBQzs7c0NBQUE7WUFDRiwyREF3SkMsQ0FBQSIsImZpbGUiOiJDb21wb25lbnRzL0NvbXBvc2FudE1hcHNJbmZpcm1pZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBJbnB1dH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE1hcHNBUElMb2FkZXIgfSBmcm9tIFwiYW5ndWxhcjItZ29vZ2xlLW1hcHMvY29yZVwiO1xuaW1wb3J0IHtJbmZpcm1pZXJJbnRlcmZhY2UsIFNlcnZpY2VDYWJpbmV0TWVkaWNhbH0gZnJvbSBcIkBTZXJ2aWNlcy9jYWJpbmV0TWVkaWNhbFNlcnZpY2VcIjtcblxuY29uc3QgaHRtbFRlbXBsYXRlID0gYFxuICAgIDxkaXYgY2xhc3M9XCJtYXAtaW5maXJtaWVyIG1hcC1pbmZpcm1pZXIte3tpbmZpcm1pZXIuaWR9fVwiPlxuICAgIDwvZGl2PlxuYDtcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yXHQ6IFwiY29tcG9zYW50LW1hcHMtaW5maXJtaWVyXCIsXG4gICAgdGVtcGxhdGVcdDogaHRtbFRlbXBsYXRlXG59KVxuZXhwb3J0IGNsYXNzIENvbXBvc2FudE1hcHNJbmZpcm1pZXIgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIGluZmlybWllciAgICAgICAgICAgICAgICAgICAgICA6IEluZmlybWllckludGVyZmFjZTtcbiAgICBnZW9jb2RlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBnb29nbGUubWFwcy5HZW9jb2RlcjtcbiAgICBtYXAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBnb29nbGUubWFwcy5NYXA7XG4gICAgbWFya2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZ29vZ2xlLm1hcHMuTWFya2VyO1xuICAgIGRpcmVjdGlvblNlcnZpY2UgICAgICAgICAgICAgICAgICAgICAgICA6IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNTZXJ2aWNlO1xuICAgIGRpcmVjdGlvbkRpc3BsYXkgICAgICAgICAgICAgICAgICAgICAgICA6IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNSZW5kZXJlcjtcbiAgICByZWxvYWRlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb247XG4gICAgcG9zaXRpb25zICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYW55IFtdID0gW107XG4gICAgY29sb3JzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogc3RyaW5nIFtdID0gW107XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfX2xvYWRlcjogTWFwc0FQSUxvYWRlciwgcHJpdmF0ZSBjbXMgOiBTZXJ2aWNlQ2FiaW5ldE1lZGljYWwpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5fX2xvYWRlci5sb2FkKCkudGhlbiggKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25TZXJ2aWNlICAgPSBuZXcgZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1NlcnZpY2UoKTtcbiAgICAgICAgICAgIHRoaXMuZ2VvY29kZXIgICAgICAgICAgID0gbmV3IGdvb2dsZS5tYXBzLkdlb2NvZGVyKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIi5tYXAtaW5maXJtaWVyLVwiICsgdGhpcy5pbmZpcm1pZXIuaWQpO1xuICAgICAgICAgICAgdGhpcy5tYXAgICAgICAgICAgICAgICAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFwLWluZmlybWllci1cIiArIHRoaXMuaW5maXJtaWVyLmlkKSwge1xuICAgICAgICAgICAgICAgIHpvb206IDEyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZ2V0VHJpcCgpO1xuICAgICAgICAgICAgdGhpcy5jb2xvcnMgPSBbXCJyZWRcIiwgXCJncmVlblwiLCBcImJsdWVcIiwgXCJ5ZWxsb3dcIiwgXCJwdXJwbGVcIiwgXCJncmV5XCJdO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVSZWxvYWRCdXR0b24oKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFRyaXAoKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb25zID0gW107XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uRGlzcGxheSA9IG5ldyBnb29nbGUubWFwcy5EaXJlY3Rpb25zUmVuZGVyZXIoKTtcbiAgICAgICAgbGV0IHByb21pc2VzIDogUHJvbWlzZTxnb29nbGUubWFwcy5HZW9jb2RlclJlc3VsdFtdPltdID0gW107XG4gICAgICAgIGxldCBhZHJlc3NlQ2FiaW5ldCA9IHRoaXMuY21zLmNhYmluZXRBZHJlc3NlLm51bWVybyArIFwiIFwiXG4gICAgICAgICAgICArIHRoaXMuY21zLmNhYmluZXRBZHJlc3NlLnJ1ZSArIFwiIFwiXG4gICAgICAgICAgICArIHRoaXMuY21zLmNhYmluZXRBZHJlc3NlLnZpbGxlICsgXCIgXCJcbiAgICAgICAgICAgICsgdGhpcy5jbXMuY2FiaW5ldEFkcmVzc2UuY29kZVBvc3RhbDtcbiAgICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmdlb2NvZGVyLmdlb2NvZGUoe1wiYWRkcmVzc1wiOiBhZHJlc3NlQ2FiaW5ldH0sXG4gICAgICAgICAgICAgICAgKHJlc3VsdHMgOiBnb29nbGUubWFwcy5HZW9jb2RlclJlc3VsdFtdLCBzdGF0dXMgOiBnb29nbGUubWFwcy5HZW9jb2RlclN0YXR1cykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSBnb29nbGUubWFwcy5HZW9jb2RlclN0YXR1cy5PSykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChzdGF0dXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHByb21pc2VzLnB1c2gocHJvbWlzZSk7XG4gICAgICAgIGZvciAobGV0IHBhdGllbnQgb2YgdGhpcy5pbmZpcm1pZXIucGF0aWVudHMpIHtcbiAgICAgICAgICAgIGxldCBhZHJlc3NlIDogc3RyaW5nID0gIHBhdGllbnQuYWRyZXNzZS52aWxsZSArIFwiIFwiXG4gICAgICAgICAgICAgICAgKyBwYXRpZW50LmFkcmVzc2UucnVlICsgXCIgXCJcbiAgICAgICAgICAgICAgICArIHBhdGllbnQuYWRyZXNzZS5jb2RlUG9zdGFsICsgXCIgXCJcbiAgICAgICAgICAgICAgICArIHBhdGllbnQuYWRyZXNzZS5udW1lcm87XG4gICAgICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdlb2NvZGVyLmdlb2NvZGUoe1wiYWRkcmVzc1wiOiBhZHJlc3NlfSxcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdHMgOiBnb29nbGUubWFwcy5HZW9jb2RlclJlc3VsdFtdLCBzdGF0dXMgOiBnb29nbGUubWFwcy5HZW9jb2RlclN0YXR1cykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gZ29vZ2xlLm1hcHMuR2VvY29kZXJTdGF0dXMuT0spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3Qoc3RhdHVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2gocHJvbWlzZSk7XG4gICAgICAgIH1cbiAgICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oIChyZXMgOiBBcnJheTxnb29nbGUubWFwcy5HZW9jb2RlclJlc3VsdFtdPikgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkF1Y3VuIHBhdGllbnRcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IG9iaiBvZiByZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnMucHVzaCh7XCJsb2NhdGlvblwiIDogb2JqWzBdLmdlb21ldHJ5LmxvY2F0aW9ufSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheU1hcERpcmVjdGlvbigpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKCAoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRNYXJrZXJGb3JPbmVQYXRpZW50KHJlc3VsdCA6IGdvb2dsZS5tYXBzLkdlb2NvZGVyUmVzdWx0KSB7XG4gICAgICAgIHRoaXMubWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4gICAgICAgICAgICBwb3NpdGlvbiAgICA6IHJlc3VsdC5nZW9tZXRyeS5sb2NhdGlvbixcbiAgICAgICAgICAgIG1hcCAgICAgICAgIDogdGhpcy5tYXBcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubWFwLnNldENlbnRlcihyZXN1bHQuZ2VvbWV0cnkubG9jYXRpb24pO1xuICAgIH1cblxuICAgIGRpc3BsYXlNYXBEaXJlY3Rpb24oKSB7XG4gICAgICAgIGxldCBkaXJlY3Rpb25SZXF1ZXN0ID0ge1xuICAgICAgICAgICAgb3JpZ2luICAgICAgICAgICAgICA6IHRoaXMucG9zaXRpb25zWzBdLmxvY2F0aW9uLFxuICAgICAgICAgICAgZGVzdGluYXRpb24gICAgICAgICA6IHRoaXMucG9zaXRpb25zWzBdLmxvY2F0aW9uLFxuICAgICAgICAgICAgdHJhdmVsTW9kZSAgICAgICAgICA6IGdvb2dsZS5tYXBzLlRyYXZlbE1vZGUuRFJJVklORyxcbiAgICAgICAgICAgIHdheXBvaW50cyAgICAgICAgICAgOiB0aGlzLnBvc2l0aW9ucyxcbiAgICAgICAgICAgIG9wdGltaXplV2F5cG9pbnRzICAgOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uU2VydmljZS5yb3V0ZShkaXJlY3Rpb25SZXF1ZXN0LCAocmVzdWx0cywgc3RhdHVzKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHRzKTtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNTdGF0dXMuT0spIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbkRpc3BsYXkuc2V0TWFwKHRoaXMubWFwKTtcbiAgICAgICAgICAgICAgICBsZXQgcmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5jb2xvcnMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbkRpc3BsYXkuc2V0T3B0aW9ucyh7XG4gICAgICAgICAgICAgICAgICAgIHBvbHlsaW5lT3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IHRoaXMuY29sb3JzW3JhbmRvbV1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uRGlzcGxheS5zZXREaXJlY3Rpb25zKHJlc3VsdHMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN0YXR1cyA6IFwiICsgc3RhdHVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVsb2FkKCkge1xuICAgICAgICB0aGlzLm1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYXAtaW5maXJtaWVyLVwiICsgdGhpcy5pbmZpcm1pZXIuaWQpLCB7XG4gICAgICAgICAgICB6b29tOiAxMlxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jcmVhdGVSZWxvYWRCdXR0b24oKTtcbiAgICAgICAgdGhpcy5nZXRUcmlwKCk7XG4gICAgfVxuXG4gICAgY3JlYXRlUmVsb2FkQnV0dG9uKCkge1xuXG4gICAgICAgIHZhciBjb250cm9sVUkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjb250cm9sVUkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjZmZmXCI7XG4gICAgICAgIGNvbnRyb2xVSS5zdHlsZS5ib3JkZXIgPSBcIjJweCBzb2xpZCAjZmZmXCI7XG4gICAgICAgIGNvbnRyb2xVSS5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjNweFwiO1xuICAgICAgICBjb250cm9sVUkuc3R5bGUuYm94U2hhZG93ID0gXCIwIDJweCA2cHggcmdiYSgwLDAsMCwuMylcIjtcbiAgICAgICAgY29udHJvbFVJLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgICAgICBjb250cm9sVUkuc3R5bGUubWFyZ2luQm90dG9tID0gXCIyMnB4XCI7XG4gICAgICAgIGNvbnRyb2xVSS5zdHlsZS50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgICAgICBjb250cm9sVUkudGl0bGUgPSBcIkNsaXF1ZXogcG91ciByZWNoYXJnZXJcIjtcblxuICAgICAgICB2YXIgY29udHJvbFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjb250cm9sVGV4dC5zdHlsZS5jb2xvciA9IFwicmdiKDI1LDI1LDI1KVwiO1xuICAgICAgICBjb250cm9sVGV4dC5zdHlsZS5mb250RmFtaWx5ID0gXCJSb2JvdG8sQXJpYWwsc2Fucy1zZXJpZlwiO1xuICAgICAgICBjb250cm9sVGV4dC5zdHlsZS5mb250U2l6ZSA9IFwiMTZweFwiO1xuICAgICAgICBjb250cm9sVGV4dC5zdHlsZS5saW5lSGVpZ2h0ID0gXCIzOHB4XCI7XG4gICAgICAgIGNvbnRyb2xUZXh0LnN0eWxlLnBhZGRpbmdMZWZ0ID0gXCI1cHhcIjtcbiAgICAgICAgY29udHJvbFRleHQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gXCI1cHhcIjtcbiAgICAgICAgY29udHJvbFRleHQuaW5uZXJIVE1MID0gXCJSZWNoYXJnZXJcIjtcbiAgICAgICAgY29udHJvbFVJLmFwcGVuZENoaWxkKGNvbnRyb2xUZXh0KTtcblxuICAgICAgICBjb250cm9sVUkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVsb2FkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubWFwLmNvbnRyb2xzW2dvb2dsZS5tYXBzLkNvbnRyb2xQb3NpdGlvbi5UT1BfUklHSFRdLnB1c2goY29udHJvbFVJKTtcblxuICAgIH1cblxufVxuXG4iXSwic291cmNlUm9vdCI6IiJ9
