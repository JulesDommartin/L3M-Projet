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
                    });
                }
                getTrip() {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50TWFwc0luZmlybWllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBSU0sWUFBWTs7Ozs7Ozs7Ozs7OztZQUFaLFlBQVksR0FBRzs7O0NBR3BCLENBQUM7WUFLRjtnQkFTSSxZQUFvQixRQUF1QixFQUFVLEdBQTJCO29CQUE1RCxhQUFRLEdBQVIsUUFBUSxDQUFlO29CQUFVLFFBQUcsR0FBSCxHQUFHLENBQXdCO29CQUZoRixjQUFTLEdBQTBDLEVBQUUsQ0FBQztvQkFDdEQsV0FBTSxHQUFnRCxFQUFFLENBQUM7Z0JBQzBCLENBQUM7Z0JBRXBGLFFBQVE7b0JBQ0osSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUU7d0JBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsR0FBSyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzt3QkFDOUQsSUFBSSxDQUFDLFFBQVEsR0FBYSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDbkQsSUFBSSxDQUFDLEdBQUcsR0FBa0IsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7NEJBQ3pHLElBQUksRUFBRSxFQUFFO3lCQUNYLENBQUMsQ0FBQzt3QkFDSCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQ3ZFLENBQUMsQ0FBQyxDQUFDO2dC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Q0FBQyxDQUFDOzRCQUM3QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDdkMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDNUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQztnQ0FDN0IsZUFBZSxFQUFFO29DQUNiLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztpQ0FDbkM7NkJBQ0osQ0FBQyxDQUFDOzRCQUNILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ2pELENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLENBQUM7d0JBQ3RDLENBQUM7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztZQUVMLENBQUM7WUE5R0c7Z0JBQUMsWUFBSyxFQUFFOztxRUFBQTtZQUxaO2dCQUFDLGdCQUFTLENBQUM7b0JBQ1AsUUFBUSxFQUFHLDBCQUEwQjtvQkFDckMsUUFBUSxFQUFHLFlBQVk7aUJBQzFCLENBQUM7O3NDQUFBO1lBQ0YsMkRBK0dDLENBQUEiLCJmaWxlIjoiQ29tcG9uZW50cy9Db21wb3NhbnRNYXBzSW5maXJtaWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgSW5wdXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBNYXBzQVBJTG9hZGVyIH0gZnJvbSBcImFuZ3VsYXIyLWdvb2dsZS1tYXBzL2NvcmVcIjtcbmltcG9ydCB7SW5maXJtaWVySW50ZXJmYWNlLCBTZXJ2aWNlQ2FiaW5ldE1lZGljYWx9IGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XG5cbmNvbnN0IGh0bWxUZW1wbGF0ZSA9IGBcbiAgICA8ZGl2IGNsYXNzPVwibWFwLWluZmlybWllciBtYXAtaW5maXJtaWVyLXt7aW5maXJtaWVyLmlkfX1cIj5cbiAgICA8L2Rpdj5cbmA7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3Rvclx0OiBcImNvbXBvc2FudC1tYXBzLWluZmlybWllclwiLFxuICAgIHRlbXBsYXRlXHQ6IGh0bWxUZW1wbGF0ZVxufSlcbmV4cG9ydCBjbGFzcyBDb21wb3NhbnRNYXBzSW5maXJtaWVyIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBpbmZpcm1pZXIgICAgICAgICAgICAgICAgICAgICAgOiBJbmZpcm1pZXJJbnRlcmZhY2U7XG4gICAgZ2VvY29kZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZ29vZ2xlLm1hcHMuR2VvY29kZXI7XG4gICAgbWFwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZ29vZ2xlLm1hcHMuTWFwO1xuICAgIG1hcmtlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGdvb2dsZS5tYXBzLk1hcmtlcjtcbiAgICBkaXJlY3Rpb25TZXJ2aWNlICAgICAgICAgICAgICAgICAgICAgICAgOiBnb29nbGUubWFwcy5EaXJlY3Rpb25zU2VydmljZTtcbiAgICBkaXJlY3Rpb25EaXNwbGF5ICAgICAgICAgICAgICAgICAgICAgICAgOiBnb29nbGUubWFwcy5EaXJlY3Rpb25zUmVuZGVyZXI7XG4gICAgcG9zaXRpb25zICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYW55IFtdID0gW107XG4gICAgY29sb3JzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogc3RyaW5nIFtdID0gW107XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfX2xvYWRlcjogTWFwc0FQSUxvYWRlciwgcHJpdmF0ZSBjbXMgOiBTZXJ2aWNlQ2FiaW5ldE1lZGljYWwpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5fX2xvYWRlci5sb2FkKCkudGhlbiggKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25TZXJ2aWNlICAgPSBuZXcgZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1NlcnZpY2UoKTtcbiAgICAgICAgICAgIHRoaXMuZ2VvY29kZXIgICAgICAgICAgID0gbmV3IGdvb2dsZS5tYXBzLkdlb2NvZGVyKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIi5tYXAtaW5maXJtaWVyLVwiICsgdGhpcy5pbmZpcm1pZXIuaWQpO1xuICAgICAgICAgICAgdGhpcy5tYXAgICAgICAgICAgICAgICAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFwLWluZmlybWllci1cIiArIHRoaXMuaW5maXJtaWVyLmlkKSwge1xuICAgICAgICAgICAgICAgIHpvb206IDEyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZ2V0VHJpcCgpO1xuICAgICAgICAgICAgdGhpcy5jb2xvcnMgPSBbXCJyZWRcIiwgXCJncmVlblwiLCBcImJsdWVcIiwgXCJ5ZWxsb3dcIiwgXCJwdXJwbGVcIiwgXCJncmV5XCJdO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VHJpcCgpIHtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25EaXNwbGF5ID0gbmV3IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNSZW5kZXJlcigpO1xuICAgICAgICBsZXQgcHJvbWlzZXMgOiBQcm9taXNlPGdvb2dsZS5tYXBzLkdlb2NvZGVyUmVzdWx0W10+W10gPSBbXTtcbiAgICAgICAgbGV0IGFkcmVzc2VDYWJpbmV0ID0gdGhpcy5jbXMuY2FiaW5ldEFkcmVzc2UubnVtZXJvICsgXCIgXCJcbiAgICAgICAgICAgICsgdGhpcy5jbXMuY2FiaW5ldEFkcmVzc2UucnVlICsgXCIgXCJcbiAgICAgICAgICAgICsgdGhpcy5jbXMuY2FiaW5ldEFkcmVzc2UudmlsbGUgKyBcIiBcIlxuICAgICAgICAgICAgKyB0aGlzLmNtcy5jYWJpbmV0QWRyZXNzZS5jb2RlUG9zdGFsO1xuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2VvY29kZXIuZ2VvY29kZSh7XCJhZGRyZXNzXCI6IGFkcmVzc2VDYWJpbmV0fSxcbiAgICAgICAgICAgICAgICAocmVzdWx0cyA6IGdvb2dsZS5tYXBzLkdlb2NvZGVyUmVzdWx0W10sIHN0YXR1cyA6IGdvb2dsZS5tYXBzLkdlb2NvZGVyU3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IGdvb2dsZS5tYXBzLkdlb2NvZGVyU3RhdHVzLk9LKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdHMpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHN0YXR1cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgICAgcHJvbWlzZXMucHVzaChwcm9taXNlKTtcbiAgICAgICAgZm9yIChsZXQgcGF0aWVudCBvZiB0aGlzLmluZmlybWllci5wYXRpZW50cykge1xuICAgICAgICAgICAgbGV0IGFkcmVzc2UgOiBzdHJpbmcgPSAgcGF0aWVudC5hZHJlc3NlLnZpbGxlICsgXCIgXCJcbiAgICAgICAgICAgICAgICArIHBhdGllbnQuYWRyZXNzZS5ydWUgKyBcIiBcIlxuICAgICAgICAgICAgICAgICsgcGF0aWVudC5hZHJlc3NlLmNvZGVQb3N0YWwgKyBcIiBcIlxuICAgICAgICAgICAgICAgICsgcGF0aWVudC5hZHJlc3NlLm51bWVybztcbiAgICAgICAgICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2VvY29kZXIuZ2VvY29kZSh7XCJhZGRyZXNzXCI6IGFkcmVzc2V9LFxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0cyA6IGdvb2dsZS5tYXBzLkdlb2NvZGVyUmVzdWx0W10sIHN0YXR1cyA6IGdvb2dsZS5tYXBzLkdlb2NvZGVyU3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSBnb29nbGUubWFwcy5HZW9jb2RlclN0YXR1cy5PSykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChzdGF0dXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChwcm9taXNlKTtcbiAgICAgICAgfVxuICAgICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbiggKHJlcyA6IEFycmF5PGdvb2dsZS5tYXBzLkdlb2NvZGVyUmVzdWx0W10+KSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXVjdW4gcGF0aWVudFwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgb2JqIG9mIHJlcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9ucy5wdXNoKHtcImxvY2F0aW9uXCIgOiBvYmpbMF0uZ2VvbWV0cnkubG9jYXRpb259KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5TWFwRGlyZWN0aW9uKCk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goIChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldE1hcmtlckZvck9uZVBhdGllbnQocmVzdWx0IDogZ29vZ2xlLm1hcHMuR2VvY29kZXJSZXN1bHQpIHtcbiAgICAgICAgdGhpcy5tYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgICAgICAgIHBvc2l0aW9uICAgIDogcmVzdWx0Lmdlb21ldHJ5LmxvY2F0aW9uLFxuICAgICAgICAgICAgbWFwICAgICAgICAgOiB0aGlzLm1hcFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5tYXAuc2V0Q2VudGVyKHJlc3VsdC5nZW9tZXRyeS5sb2NhdGlvbik7XG4gICAgfVxuXG4gICAgZGlzcGxheU1hcERpcmVjdGlvbigpIHtcbiAgICAgICAgbGV0IGRpcmVjdGlvblJlcXVlc3QgPSB7XG4gICAgICAgICAgICBvcmlnaW4gICAgICAgICAgICAgIDogdGhpcy5wb3NpdGlvbnNbMF0ubG9jYXRpb24sXG4gICAgICAgICAgICBkZXN0aW5hdGlvbiAgICAgICAgIDogdGhpcy5wb3NpdGlvbnNbMF0ubG9jYXRpb24sXG4gICAgICAgICAgICB0cmF2ZWxNb2RlICAgICAgICAgIDogZ29vZ2xlLm1hcHMuVHJhdmVsTW9kZS5EUklWSU5HLFxuICAgICAgICAgICAgd2F5cG9pbnRzICAgICAgICAgICA6IHRoaXMucG9zaXRpb25zLFxuICAgICAgICAgICAgb3B0aW1pemVXYXlwb2ludHMgICA6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25TZXJ2aWNlLnJvdXRlKGRpcmVjdGlvblJlcXVlc3QsIChyZXN1bHRzLCBzdGF0dXMpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdHMpO1xuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1N0YXR1cy5PSykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uRGlzcGxheS5zZXRNYXAodGhpcy5tYXApO1xuICAgICAgICAgICAgICAgIGxldCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmNvbG9ycy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uRGlzcGxheS5zZXRPcHRpb25zKHtcbiAgICAgICAgICAgICAgICAgICAgcG9seWxpbmVPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VDb2xvcjogdGhpcy5jb2xvcnNbcmFuZG9tXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25EaXNwbGF5LnNldERpcmVjdGlvbnMocmVzdWx0cyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3RhdHVzIDogXCIgKyBzdGF0dXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==
