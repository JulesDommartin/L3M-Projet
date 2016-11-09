System.register(["@angular/core", "angular2-google-maps/core", "./ComposantAddPatient"], function(exports_1, context_1) {
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
    var core_1, core_2, ComposantAddPatient_1;
    var htmlTemplate, ComposantMaps;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (ComposantAddPatient_1_1) {
                ComposantAddPatient_1 = ComposantAddPatient_1_1;
            }],
        execute: function() {
            htmlTemplate = `
    <input name="adresse" placeholder="Ex: 4 rue du Bout Guesdon 14100 IFS" #searchAdress>
    <input type="button" value="Rechercher" (click)="search()"><br/>
    <div class="map">
    </div>
`;
            ComposantMaps = class ComposantMaps {
                constructor(__loader) {
                    this.__loader = __loader;
                    this.adresse = {};
                }
                ngOnInit() {
                    this.__loader.load().then(() => {
                        this.geocoder = new google.maps.Geocoder();
                        this.infoWindow = new google.maps.InfoWindow();
                        this.map = new google.maps.Map(document.querySelector(".map"), {
                            zoom: 12
                        });
                        this.map.addListener("click", (event) => {
                            console.log(event);
                            this.geocoder.geocode({ "location": event.latLng }, (results, status) => {
                                if (status === google.maps.GeocoderStatus.OK) {
                                    console.log(results);
                                    if (this.marker) {
                                        this.marker.setMap(null);
                                    }
                                    this.marker = new google.maps.Marker({
                                        position: event.latLng,
                                        map: this.map
                                    });
                                    this.infoWindow.setContent(results[0].formatted_address);
                                    this.infoWindow.open(this.map, this.marker);
                                    this.setPatientInfos(results[0]);
                                }
                                else {
                                    console.log("Error - ", results, " & Status - ", status);
                                }
                            });
                        });
                        this.geocoder.geocode({ "address": "Grenoble" }, (results, status) => {
                            if (status === google.maps.GeocoderStatus.OK) {
                                console.log(results);
                                let lat = results[0].geometry.viewport.getCenter().lat();
                                let lng = results[0].geometry.viewport.getCenter().lng();
                                this.map.setCenter({ lat: lat, lng: lng });
                            }
                            else {
                                console.log("Error - ", results, " & Status - ", status);
                            }
                        });
                    });
                }
                setPatientInfos(results) {
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
                    this.composantAddPatient.setAdresse(this.adresse);
                }
                search() {
                    if (this.searchAdress.nativeElement.value) {
                        let address = this.searchAdress.nativeElement.value;
                        this.geocoder.geocode({ "address": address }, (results, status) => {
                            if (status === google.maps.GeocoderStatus.OK) {
                                console.log(results);
                                if (this.marker) {
                                    this.marker.setMap(null);
                                }
                                this.marker = new google.maps.Marker({
                                    position: results[0].geometry.location,
                                    map: this.map
                                });
                                this.map.setCenter(results[0].geometry.location);
                                this.infoWindow.setContent(results[0].formatted_address);
                                this.infoWindow.open(this.map, this.marker);
                                this.setPatientInfos(results[0]);
                            }
                            else {
                                console.log("Error - ", results, " & Status - ", status);
                            }
                        });
                    }
                }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', ComposantAddPatient_1.ComposantAddPatient)
            ], ComposantMaps.prototype, "composantAddPatient", void 0);
            __decorate([
                core_1.ViewChild("searchAdress"), 
                __metadata('design:type', core_1.ElementRef)
            ], ComposantMaps.prototype, "searchAdress", void 0);
            ComposantMaps = __decorate([
                core_1.Component({
                    selector: "composant-maps",
                    template: htmlTemplate
                }), 
                __metadata('design:paramtypes', [core_2.MapsAPILoader])
            ], ComposantMaps);
            exports_1("ComposantMaps", ComposantMaps);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50TWFwcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBSU0sWUFBWTs7Ozs7Ozs7Ozs7OztZQUFaLFlBQVksR0FBRzs7Ozs7Q0FLcEIsQ0FBQztZQUtGO2dCQVFJLFlBQW9CLFFBQXVCO29CQUF2QixhQUFRLEdBQVIsUUFBUSxDQUFlO29CQU4zQyxZQUFPLEdBQXlDLEVBQUUsQ0FBQztnQkFPbkQsQ0FBQztnQkFDRCxRQUFRO29CQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFFO3dCQUN2QixJQUFJLENBQUMsUUFBUSxHQUFLLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDN0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7d0JBQy9DLElBQUksQ0FBQyxHQUFHLEdBQVUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFOzRCQUNsRSxJQUFJLEVBQUUsRUFBRTt5QkFDWCxDQUFDLENBQUM7d0JBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBVTs0QkFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUUsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU07Z0NBQ2hFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29DQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29DQUNyQixFQUFFLENBQUMs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LFFBQVEsRUFBTSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVE7b0NBQzFDLEdBQUcsRUFBVyxJQUFJLENBQUMsR0FBRztpQ0FDekIsQ0FBQyxDQUFDO2dDQUNILElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7Z0NBQ2pELElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dDQUN6RCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQ0FDNUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDckMsQ0FBQzs0QkFBQyxJQUFJLENBQUMsQ0FBQztnQ0FDSixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDOzRCQUM3RCxDQUFDO3dCQUNMLENBQUMsQ0FBQyxDQUFDO29CQUNQLENBQUM7Z0JBQ0wsQ0FBQztZQUVMLENBQUM7WUE5Rkc7Z0JBQUMsWUFBSyxFQUFFOztzRUFBQTtZQU1SO2dCQUFDLGdCQUFTLENBQUMsY0FBYyxDQUFDOzsrREFBQTtZQVg5QjtnQkFBQyxnQkFBUyxDQUFDO29CQUNQLFFBQVEsRUFBRyxnQkFBZ0I7b0JBQzNCLFFBQVEsRUFBRyxZQUFZO2lCQUMxQixDQUFDOzs2QkFBQTtZQUNGLHlDQStGQyxDQUFBIiwiZmlsZSI6IkNvbXBvbmVudHMvQ29tcG9zYW50TWFwcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBNYXBzQVBJTG9hZGVyIH0gZnJvbSBcImFuZ3VsYXIyLWdvb2dsZS1tYXBzL2NvcmVcIjtcbmltcG9ydCB7Q29tcG9zYW50QWRkUGF0aWVudH0gZnJvbSBcIi4vQ29tcG9zYW50QWRkUGF0aWVudFwiO1xuXG5jb25zdCBodG1sVGVtcGxhdGUgPSBgXG4gICAgPGlucHV0IG5hbWU9XCJhZHJlc3NlXCIgcGxhY2Vob2xkZXI9XCJFeDogNCBydWUgZHUgQm91dCBHdWVzZG9uIDE0MTAwIElGU1wiICNzZWFyY2hBZHJlc3M+XG4gICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIlJlY2hlcmNoZXJcIiAoY2xpY2spPVwic2VhcmNoKClcIj48YnIvPlxuICAgIDxkaXYgY2xhc3M9XCJtYXBcIj5cbiAgICA8L2Rpdj5cbmA7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3Rvclx0OiBcImNvbXBvc2FudC1tYXBzXCIsXG4gICAgdGVtcGxhdGVcdDogaHRtbFRlbXBsYXRlXG59KVxuZXhwb3J0IGNsYXNzIENvbXBvc2FudE1hcHMgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIGNvbXBvc2FudEFkZFBhdGllbnQgICAgICAgICAgICA6IENvbXBvc2FudEFkZFBhdGllbnQ7XG4gICAgYWRyZXNzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYW55ID0ge307XG4gICAgZ2VvY29kZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZ29vZ2xlLm1hcHMuR2VvY29kZXI7XG4gICAgbWFwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZ29vZ2xlLm1hcHMuTWFwO1xuICAgIGluZm9XaW5kb3cgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGdvb2dsZS5tYXBzLkluZm9XaW5kb3c7XG4gICAgbWFya2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZ29vZ2xlLm1hcHMuTWFya2VyO1xuICAgIEBWaWV3Q2hpbGQoXCJzZWFyY2hBZHJlc3NcIikgc2VhcmNoQWRyZXNzIDogRWxlbWVudFJlZjtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9fbG9hZGVyOiBNYXBzQVBJTG9hZGVyKSB7XG4gICAgfVxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLl9fbG9hZGVyLmxvYWQoKS50aGVuKCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmdlb2NvZGVyICAgPSBuZXcgZ29vZ2xlLm1hcHMuR2VvY29kZXIoKTtcbiAgICAgICAgICAgIHRoaXMuaW5mb1dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KCk7XG4gICAgICAgICAgICB0aGlzLm1hcCAgICAgICAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFwXCIpLCB7XG4gICAgICAgICAgICAgICAgem9vbTogMTJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5tYXAuYWRkTGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLmdlb2NvZGVyLmdlb2NvZGUoIHsgXCJsb2NhdGlvblwiOiBldmVudC5sYXRMbmd9LCAocmVzdWx0cywgc3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IGdvb2dsZS5tYXBzLkdlb2NvZGVyU3RhdHVzLk9LKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hcmtlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFya2VyLnNldE1hcChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gICAgOiBldmVudC5sYXRMbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwICAgICAgICAgOiB0aGlzLm1hcFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluZm9XaW5kb3cuc2V0Q29udGVudChyZXN1bHRzWzBdLmZvcm1hdHRlZF9hZGRyZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5mb1dpbmRvdy5vcGVuKHRoaXMubWFwLCB0aGlzLm1hcmtlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBhdGllbnRJbmZvcyhyZXN1bHRzWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBcIiwgcmVzdWx0cywgXCIgJiBTdGF0dXMgLSBcIiwgc3RhdHVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmdlb2NvZGVyLmdlb2NvZGUoIHsgXCJhZGRyZXNzXCI6IFwiR3Jlbm9ibGVcIn0sIChyZXN1bHRzLCBzdGF0dXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSBnb29nbGUubWFwcy5HZW9jb2RlclN0YXR1cy5PSykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxhdCA9IHJlc3VsdHNbMF0uZ2VvbWV0cnkudmlld3BvcnQuZ2V0Q2VudGVyKCkubGF0KCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsbmcgPSByZXN1bHRzWzBdLmdlb21ldHJ5LnZpZXdwb3J0LmdldENlbnRlcigpLmxuZygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcC5zZXRDZW50ZXIoe2xhdDogbGF0LCBsbmc6IGxuZ30pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBcIiwgcmVzdWx0cywgXCIgJiBTdGF0dXMgLSBcIiwgc3RhdHVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0UGF0aWVudEluZm9zKHJlc3VsdHM6IGdvb2dsZS5tYXBzLkdlb2NvZGVyUmVzdWx0KSB7XG4gICAgICAgIGlmIChyZXN1bHRzLmFkZHJlc3NfY29tcG9uZW50cykge1xuICAgICAgICAgICAgZm9yIChsZXQgb2JqIG9mIHJlc3VsdHMuYWRkcmVzc19jb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9iai50eXBlcy5pbmRleE9mKFwic3RyZWV0X251bWJlclwiKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZHJlc3NlLm51bWVybyA9IG9iai5sb25nX25hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChvYmoudHlwZXMuaW5kZXhPZihcInJvdXRlXCIpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkcmVzc2UucnVlID0gb2JqLmxvbmdfbmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG9iai50eXBlcy5pbmRleE9mKFwicG9zdGFsX2NvZGVcIikgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRyZXNzZS5jb2RlUG9zdGFsID0gb2JqLmxvbmdfbmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG9iai50eXBlcy5pbmRleE9mKFwibG9jYWxpdHlcIikgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRyZXNzZS52aWxsZSA9IG9iai5sb25nX25hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29tcG9zYW50QWRkUGF0aWVudC5zZXRBZHJlc3NlKHRoaXMuYWRyZXNzZSk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgc2VhcmNoKCkge1xuICAgICAgICBpZiAodGhpcy5zZWFyY2hBZHJlc3MubmF0aXZlRWxlbWVudC52YWx1ZSkge1xuICAgICAgICAgICAgbGV0IGFkZHJlc3MgOiBzdHJpbmcgPSB0aGlzLnNlYXJjaEFkcmVzcy5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5nZW9jb2Rlci5nZW9jb2RlKCB7IFwiYWRkcmVzc1wiOiBhZGRyZXNzfSwgKHJlc3VsdHMsIHN0YXR1cykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IGdvb2dsZS5tYXBzLkdlb2NvZGVyU3RhdHVzLk9LKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdHMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXJrZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFya2VyLnNldE1hcChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gICAgOiByZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwICAgICAgICAgOiB0aGlzLm1hcFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXAuc2V0Q2VudGVyKHJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZm9XaW5kb3cuc2V0Q29udGVudChyZXN1bHRzWzBdLmZvcm1hdHRlZF9hZGRyZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmZvV2luZG93Lm9wZW4odGhpcy5tYXAsIHRoaXMubWFya2VyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQYXRpZW50SW5mb3MocmVzdWx0c1swXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIFwiLCByZXN1bHRzLCBcIiAmIFN0YXR1cyAtIFwiLCBzdGF0dXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=
