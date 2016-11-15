System.register(["@angular/core", "angular2-google-maps/core"], function(exports_1, context_1) {
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
    var core_1, core_2;
    var htmlTemplate, ComposantMapsInfirmier;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            htmlTemplate = `
    <div class="map-infirmier map-infirmier-{{infirmier.id}}">
    </div>
`;
            ComposantMapsInfirmier = class ComposantMapsInfirmier {
                constructor(__loader) {
                    this.__loader = __loader;
                    this.positions = [];
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
                    });
                }
                getTrip() {
                    this.directionDisplay = new google.maps.DirectionsRenderer();
                    let promises = [];
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
                        /*let directionRequest : google.maps.DirectionsRequest;
                        directionRequest.origin             = this.positions[0].location;
                        directionRequest.destination        = this.positions[this.positions.length - 1].location;
                        directionRequest.travelMode         = google.maps.TravelMode.DRIVING;
                        directionRequest.waypoints          = this.positions;
                        directionRequest.optimizeWaypoints  = true;*/
                        if (res.length === 0) {
                            console.log("Aucun patient");
                        }
                        else if (res.length === 1) {
                            console.log("Un seul patient");
                            this.setMarkerForOnePatient(res[0][0]);
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
                        destination: this.positions[this.positions.length - 1].location,
                        travelMode: google.maps.TravelMode.DRIVING,
                        waypoints: this.positions,
                        optimizeWaypoints: true
                    };
                    this.directionService.route(directionRequest, (results, status) => {
                        console.log(results);
                        if (status === google.maps.DirectionsStatus.OK) {
                            this.directionDisplay.setMap(this.map);
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
                __metadata('design:paramtypes', [core_2.MapsAPILoader])
            ], ComposantMapsInfirmier);
            exports_1("ComposantMapsInfirmier", ComposantMapsInfirmier);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50TWFwc0luZmlybWllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBSU0sWUFBWTs7Ozs7Ozs7OztZQUFaLFlBQVksR0FBRzs7O0NBR3BCLENBQUM7WUFLRjtnQkFRSSxZQUFvQixRQUF1QjtvQkFBdkIsYUFBUSxHQUFSLFFBQVEsQ0FBZTtvQkFEM0MsY0FBUyxHQUEwQyxFQUFFLENBQUM7Z0JBQ1IsQ0FBQztnQkFFL0MsUUFBUTtvQkFDSixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBRTt3QkFDdkIsSUFBSSxDQUFDLGdCQUFnQixHQUFLLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO3dCQUM5RCxJQUFJLENBQUMsUUFBUSxHQUFhLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUNuRCxJQUFJLENBQUMsR0FBRyxHQUFrQixJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTs0QkFDekcsSUFBSSxFQUFFLEVBQUU7eUJBQ1gsQ0FBQyxDQUFDO3dCQUNILElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDbkIsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFFTSxPQUFPO29CQUNWLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztvQkFDN0QsSUFBSSxRQUFRLEdBQTZDLEVBQUUsQ0FBQztvQkFDNUQsR0FBRyxDQUFDLENBQUMsSUFBSSxPQUFPLElBQUksSUFBSSxD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QUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVE7d0JBQ3hFLFVBQVUsRUFBWSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPO3dCQUNwRCxTQUFTLEVBQWEsSUFBSSxDQUFDLFNBQVM7d0JBQ3BDLGlCQUFpQixFQUFLLElBQUk7cUJBQzdCLENBQUM7b0JBQ0YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLE9BQU8sRUFBRSxNQUFNO3dCQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUNyQixFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUM3QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDdkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDakQsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsQ0FBQzt3QkFDdEMsQ0FBQztvQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO1lBRUwsQ0FBQztZQS9GRztnQkFBQyxZQUFLLEVBQUU7O3FFQUFBO1lBTFo7Z0JBQUMsZ0JBQVMsQ0FBQztvQkFDUCxRQUFRLEVBQUcsMEJBQTBCO29CQUNyQyxRQUFRLEVBQUcsWUFBWTtpQkFDMUIsQ0FBQzs7c0NBQUE7WUFDRiwyREFnR0MsQ0FBQSIsImZpbGUiOiJDb21wb25lbnRzL0NvbXBvc2FudE1hcHNJbmZpcm1pZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBJbnB1dH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE1hcHNBUElMb2FkZXIgfSBmcm9tIFwiYW5ndWxhcjItZ29vZ2xlLW1hcHMvY29yZVwiO1xuaW1wb3J0IHtJbmZpcm1pZXJJbnRlcmZhY2V9IGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XG5cbmNvbnN0IGh0bWxUZW1wbGF0ZSA9IGBcbiAgICA8ZGl2IGNsYXNzPVwibWFwLWluZmlybWllciBtYXAtaW5maXJtaWVyLXt7aW5maXJtaWVyLmlkfX1cIj5cbiAgICA8L2Rpdj5cbmA7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3Rvclx0OiBcImNvbXBvc2FudC1tYXBzLWluZmlybWllclwiLFxuICAgIHRlbXBsYXRlXHQ6IGh0bWxUZW1wbGF0ZVxufSlcbmV4cG9ydCBjbGFzcyBDb21wb3NhbnRNYXBzSW5maXJtaWVyIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBpbmZpcm1pZXIgICAgICAgICAgICAgICAgICAgICAgOiBJbmZpcm1pZXJJbnRlcmZhY2U7XG4gICAgZ2VvY29kZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZ29vZ2xlLm1hcHMuR2VvY29kZXI7XG4gICAgbWFwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZ29vZ2xlLm1hcHMuTWFwO1xuICAgIG1hcmtlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGdvb2dsZS5tYXBzLk1hcmtlcjtcbiAgICBkaXJlY3Rpb25TZXJ2aWNlICAgICAgICAgICAgICAgICAgICAgICAgOiBnb29nbGUubWFwcy5EaXJlY3Rpb25zU2VydmljZTtcbiAgICBkaXJlY3Rpb25EaXNwbGF5ICAgICAgICAgICAgICAgICAgICAgICAgOiBnb29nbGUubWFwcy5EaXJlY3Rpb25zUmVuZGVyZXI7XG4gICAgcG9zaXRpb25zICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYW55IFtdID0gW107XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfX2xvYWRlcjogTWFwc0FQSUxvYWRlcikge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLl9fbG9hZGVyLmxvYWQoKS50aGVuKCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvblNlcnZpY2UgICA9IG5ldyBnb29nbGUubWFwcy5EaXJlY3Rpb25zU2VydmljZSgpO1xuICAgICAgICAgICAgdGhpcy5nZW9jb2RlciAgICAgICAgICAgPSBuZXcgZ29vZ2xlLm1hcHMuR2VvY29kZXIoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLm1hcC1pbmZpcm1pZXItXCIgKyB0aGlzLmluZmlybWllci5pZCk7XG4gICAgICAgICAgICB0aGlzLm1hcCAgICAgICAgICAgICAgICA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYXAtaW5maXJtaWVyLVwiICsgdGhpcy5pbmZpcm1pZXIuaWQpLCB7XG4gICAgICAgICAgICAgICAgem9vbTogMTJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5nZXRUcmlwKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRUcmlwKCkge1xuICAgICAgICB0aGlzLmRpcmVjdGlvbkRpc3BsYXkgPSBuZXcgZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1JlbmRlcmVyKCk7XG4gICAgICAgIGxldCBwcm9taXNlcyA6IFByb21pc2U8Z29vZ2xlLm1hcHMuR2VvY29kZXJSZXN1bHRbXT5bXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBwYXRpZW50IG9mIHRoaXMuaW5maXJtaWVyLnBhdGllbnRzKSB7XG4gICAgICAgICAgICBsZXQgYWRyZXNzZSA6IHN0cmluZyA9ICBwYXRpZW50LmFkcmVzc2UudmlsbGUgKyBcIiBcIlxuICAgICAgICAgICAgICAgICsgcGF0aWVudC5hZHJlc3NlLnJ1ZSArIFwiIFwiXG4gICAgICAgICAgICAgICAgKyBwYXRpZW50LmFkcmVzc2UuY29kZVBvc3RhbCArIFwiIFwiXG4gICAgICAgICAgICAgICAgKyBwYXRpZW50LmFkcmVzc2UubnVtZXJvO1xuICAgICAgICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZW9jb2Rlci5nZW9jb2RlKHtcImFkZHJlc3NcIjogYWRyZXNzZX0sXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHRzIDogZ29vZ2xlLm1hcHMuR2VvY29kZXJSZXN1bHRbXSwgc3RhdHVzIDogZ29vZ2xlLm1hcHMuR2VvY29kZXJTdGF0dXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IGdvb2dsZS5tYXBzLkdlb2NvZGVyU3RhdHVzLk9LKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHN0YXR1cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHByb21pc2UpO1xuICAgICAgICB9XG4gICAgICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCAocmVzIDogQXJyYXk8Z29vZ2xlLm1hcHMuR2VvY29kZXJSZXN1bHRbXT4pID0+IHtcbiAgICAgICAgICAgIC8qbGV0IGRpcmVjdGlvblJlcXVlc3QgOiBnb29nbGUubWFwcy5EaXJlY3Rpb25zUmVxdWVzdDtcbiAgICAgICAgICAgIGRpcmVjdGlvblJlcXVlc3Qub3JpZ2luICAgICAgICAgICAgID0gdGhpcy5wb3NpdGlvbnNbMF0ubG9jYXRpb247XG4gICAgICAgICAgICBkaXJlY3Rpb25SZXF1ZXN0LmRlc3RpbmF0aW9uICAgICAgICA9IHRoaXMucG9zaXRpb25zW3RoaXMucG9zaXRpb25zLmxlbmd0aCAtIDFdLmxvY2F0aW9uO1xuICAgICAgICAgICAgZGlyZWN0aW9uUmVxdWVzdC50cmF2ZWxNb2RlICAgICAgICAgPSBnb29nbGUubWFwcy5UcmF2ZWxNb2RlLkRSSVZJTkc7XG4gICAgICAgICAgICBkaXJlY3Rpb25SZXF1ZXN0LndheXBvaW50cyAgICAgICAgICA9IHRoaXMucG9zaXRpb25zO1xuICAgICAgICAgICAgZGlyZWN0aW9uUmVxdWVzdC5vcHRpbWl6ZVdheXBvaW50cyAgPSB0cnVlOyovXG4gICAgICAgICAgICBpZiAocmVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXVjdW4gcGF0aWVudFwiKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVW4gc2V1bCBwYXRpZW50XCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0TWFya2VyRm9yT25lUGF0aWVudChyZXNbMF1bMF0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBvYmogb2YgcmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zLnB1c2goe1wibG9jYXRpb25cIiA6IG9ialswXS5nZW9tZXRyeS5sb2NhdGlvbn0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlNYXBEaXJlY3Rpb24oKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCggKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0TWFya2VyRm9yT25lUGF0aWVudChyZXN1bHQgOiBnb29nbGUubWFwcy5HZW9jb2RlclJlc3VsdCkge1xuICAgICAgICB0aGlzLm1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICAgICAgcG9zaXRpb24gICAgOiByZXN1bHQuZ2VvbWV0cnkubG9jYXRpb24sXG4gICAgICAgICAgICBtYXAgICAgICAgICA6IHRoaXMubWFwXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm1hcC5zZXRDZW50ZXIocmVzdWx0Lmdlb21ldHJ5LmxvY2F0aW9uKTtcbiAgICB9XG5cbiAgICBkaXNwbGF5TWFwRGlyZWN0aW9uKCkge1xuICAgICAgICBsZXQgZGlyZWN0aW9uUmVxdWVzdCA9IHtcbiAgICAgICAgICAgIG9yaWdpbiAgICAgICAgICAgICAgOiB0aGlzLnBvc2l0aW9uc1swXS5sb2NhdGlvbixcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uICAgICAgICAgOiB0aGlzLnBvc2l0aW9uc1t0aGlzLnBvc2l0aW9ucy5sZW5ndGggLSAxXS5sb2NhdGlvbixcbiAgICAgICAgICAgIHRyYXZlbE1vZGUgICAgICAgICAgOiBnb29nbGUubWFwcy5UcmF2ZWxNb2RlLkRSSVZJTkcsXG4gICAgICAgICAgICB3YXlwb2ludHMgICAgICAgICAgIDogdGhpcy5wb3NpdGlvbnMsXG4gICAgICAgICAgICBvcHRpbWl6ZVdheXBvaW50cyAgIDogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRpcmVjdGlvblNlcnZpY2Uucm91dGUoZGlyZWN0aW9uUmVxdWVzdCwgKHJlc3VsdHMsIHN0YXR1cykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0cyk7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSBnb29nbGUubWFwcy5EaXJlY3Rpb25zU3RhdHVzLk9LKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25EaXNwbGF5LnNldE1hcCh0aGlzLm1hcCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb25EaXNwbGF5LnNldERpcmVjdGlvbnMocmVzdWx0cyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3RhdHVzIDogXCIgKyBzdGF0dXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==
