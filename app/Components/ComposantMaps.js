System.register(["@angular/core", "angular2-google-maps/core", "./Abstract.ComposantPatient"], function(exports_1, context_1) {
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
    var core_1, core_2, Abstract_ComposantPatient_1;
    var htmlTemplate, ComposantMaps;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (Abstract_ComposantPatient_1_1) {
                Abstract_ComposantPatient_1 = Abstract_ComposantPatient_1_1;
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
                    if (this.composant) {
                        this.composant.setAdresse(this.adresse);
                    }
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
                __metadata('design:type', Abstract_ComposantPatient_1.AbstractComposantPatient)
            ], ComposantMaps.prototype, "composant", void 0);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50TWFwcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBSU0sWUFBWTs7Ozs7Ozs7Ozs7OztZQUFaLFlBQVksR0FBRzs7Ozs7Q0FLcEIsQ0FBQztZQUtGO2dCQVFJLFlBQW9CLFFBQXVCO29CQUF2QixhQUFRLEdBQVIsUUFBUSxDQUFlO29CQU4zQyxZQUFPLEdBQXlDLEVBQUUsQ0FBQztnQkFPbkQsQ0FBQztnQkFDRCxRQUFRO29CQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFFO3dCQUN2QixJQUFJLENBQUMsUUFBUSxHQUFLLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDN0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7d0JBQy9DLElBQUksQ0FBQyxHQUFHLEdBQVUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFOzRCQUNsRSxJQUFJLEVBQUUsRUFBRTt5QkFDWCxDQUFDLENBQUM7d0JBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBVTs0QkFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUUsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU07Z0NBQ2hFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29DQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29DQUNyQixFQUFFLENBQUMs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SUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO29DQUNqQyxRQUFRLEVBQU0sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRO29DQUMxQyxHQUFHLEVBQVcsSUFBSSxDQUFDLEdBQUc7aUNBQ3pCLENBQUMsQ0FBQztnQ0FDSCxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dDQUNqRCxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQ0FDekQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0NBQzVDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3JDLENBQUM7NEJBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQzs0QkFDN0QsQ0FBQzt3QkFDTCxDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDO2dCQUNMLENBQUM7WUFFTCxDQUFDO1lBaEdHO2dCQUFDLFlBQUssRUFBRTs7NERBQUE7WUFNUjtnQkFBQyxnQkFBUyxDQUFDLGNBQWMsQ0FBQzs7K0RBQUE7WUFYOUI7Z0JBQUMsZ0JBQVMsQ0FBQztvQkFDUCxRQUFRLEVBQUcsZ0JBQWdCO29CQUMzQixRQUFRLEVBQUcsWUFBWTtpQkFDMUIsQ0FBQzs7NkJBQUE7WUFDRix5Q0FpR0MsQ0FBQSIsImZpbGUiOiJDb21wb25lbnRzL0NvbXBvc2FudE1hcHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTWFwc0FQSUxvYWRlciB9IGZyb20gXCJhbmd1bGFyMi1nb29nbGUtbWFwcy9jb3JlXCI7XG5pbXBvcnQge0Fic3RyYWN0Q29tcG9zYW50UGF0aWVudH0gZnJvbSBcIi4vQWJzdHJhY3QuQ29tcG9zYW50UGF0aWVudFwiO1xuXG5jb25zdCBodG1sVGVtcGxhdGUgPSBgXG4gICAgPGlucHV0IG5hbWU9XCJhZHJlc3NlXCIgcGxhY2Vob2xkZXI9XCJFeDogNCBydWUgZHUgQm91dCBHdWVzZG9uIDE0MTAwIElGU1wiICNzZWFyY2hBZHJlc3M+XG4gICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIlJlY2hlcmNoZXJcIiAoY2xpY2spPVwic2VhcmNoKClcIj48YnIvPlxuICAgIDxkaXYgY2xhc3M9XCJtYXBcIj5cbiAgICA8L2Rpdj5cbmA7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3Rvclx0OiBcImNvbXBvc2FudC1tYXBzXCIsXG4gICAgdGVtcGxhdGVcdDogaHRtbFRlbXBsYXRlXG59KVxuZXhwb3J0IGNsYXNzIENvbXBvc2FudE1hcHMgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIGNvbXBvc2FudCAgICAgICAgICAgICAgICAgICAgICA6IEFic3RyYWN0Q29tcG9zYW50UGF0aWVudDtcbiAgICBhZHJlc3NlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBhbnkgPSB7fTtcbiAgICBnZW9jb2RlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBnb29nbGUubWFwcy5HZW9jb2RlcjtcbiAgICBtYXAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBnb29nbGUubWFwcy5NYXA7XG4gICAgaW5mb1dpbmRvdyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdztcbiAgICBtYXJrZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBnb29nbGUubWFwcy5NYXJrZXI7XG4gICAgQFZpZXdDaGlsZChcInNlYXJjaEFkcmVzc1wiKSBzZWFyY2hBZHJlc3MgOiBFbGVtZW50UmVmO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX19sb2FkZXI6IE1hcHNBUElMb2FkZXIpIHtcbiAgICB9XG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuX19sb2FkZXIubG9hZCgpLnRoZW4oICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2VvY29kZXIgICA9IG5ldyBnb29nbGUubWFwcy5HZW9jb2RlcigpO1xuICAgICAgICAgICAgdGhpcy5pbmZvV2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coKTtcbiAgICAgICAgICAgIHRoaXMubWFwICAgICAgICA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYXBcIiksIHtcbiAgICAgICAgICAgICAgICB6b29tOiAxMlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLm1hcC5hZGRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXZlbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2VvY29kZXIuZ2VvY29kZSggeyBcImxvY2F0aW9uXCI6IGV2ZW50LmxhdExuZ30sIChyZXN1bHRzLCBzdGF0dXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gZ29vZ2xlLm1hcHMuR2VvY29kZXJTdGF0dXMuT0spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWFya2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrZXIuc2V0TWFwKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiAgICA6IGV2ZW50LmxhdExuZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAgICAgICAgICA6IHRoaXMubWFwXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5mb1dpbmRvdy5zZXRDb250ZW50KHJlc3VsdHNbMF0uZm9ybWF0dGVkX2FkZHJlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmZvV2luZG93Lm9wZW4odGhpcy5tYXAsIHRoaXMubWFya2VyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGF0aWVudEluZm9zKHJlc3VsdHNbMF0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIFwiLCByZXN1bHRzLCBcIiAmIFN0YXR1cyAtIFwiLCBzdGF0dXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZ2VvY29kZXIuZ2VvY29kZSggeyBcImFkZHJlc3NcIjogXCJHcmVub2JsZVwifSwgKHJlc3VsdHMsIHN0YXR1cykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IGdvb2dsZS5tYXBzLkdlb2NvZGVyU3RhdHVzLk9LKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdHMpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbGF0ID0gcmVzdWx0c1swXS5nZW9tZXRyeS52aWV3cG9ydC5nZXRDZW50ZXIoKS5sYXQoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxuZyA9IHJlc3VsdHNbMF0uZ2VvbWV0cnkudmlld3BvcnQuZ2V0Q2VudGVyKCkubG5nKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwLnNldENlbnRlcih7bGF0OiBsYXQsIGxuZzogbG5nfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIFwiLCByZXN1bHRzLCBcIiAmIFN0YXR1cyAtIFwiLCBzdGF0dXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRQYXRpZW50SW5mb3MocmVzdWx0czogZ29vZ2xlLm1hcHMuR2VvY29kZXJSZXN1bHQpIHtcbiAgICAgICAgaWYgKHJlc3VsdHMuYWRkcmVzc19jb21wb25lbnRzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBvYmogb2YgcmVzdWx0cy5hZGRyZXNzX2NvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqLnR5cGVzLmluZGV4T2YoXCJzdHJlZXRfbnVtYmVyXCIpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkcmVzc2UubnVtZXJvID0gb2JqLmxvbmdfbmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG9iai50eXBlcy5pbmRleE9mKFwicm91dGVcIikgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRyZXNzZS5ydWUgPSBvYmoubG9uZ19uYW1lO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAob2JqLnR5cGVzLmluZGV4T2YoXCJwb3N0YWxfY29kZVwiKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZHJlc3NlLmNvZGVQb3N0YWwgPSBvYmoubG9uZ19uYW1lO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAob2JqLnR5cGVzLmluZGV4T2YoXCJsb2NhbGl0eVwiKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZHJlc3NlLnZpbGxlID0gb2JqLmxvbmdfbmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29tcG9zYW50KSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvc2FudC5zZXRBZHJlc3NlKHRoaXMuYWRyZXNzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHB1YmxpYyBzZWFyY2goKSB7XG4gICAgICAgIGlmICh0aGlzLnNlYXJjaEFkcmVzcy5uYXRpdmVFbGVtZW50LnZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgYWRkcmVzcyA6IHN0cmluZyA9IHRoaXMuc2VhcmNoQWRyZXNzLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICAgICAgICB0aGlzLmdlb2NvZGVyLmdlb2NvZGUoIHsgXCJhZGRyZXNzXCI6IGFkZHJlc3N9LCAocmVzdWx0cywgc3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gZ29vZ2xlLm1hcHMuR2VvY29kZXJTdGF0dXMuT0spIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hcmtlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrZXIuc2V0TWFwKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiAgICA6IHJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXAgICAgICAgICA6IHRoaXMubWFwXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcC5zZXRDZW50ZXIocmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5mb1dpbmRvdy5zZXRDb250ZW50KHJlc3VsdHNbMF0uZm9ybWF0dGVkX2FkZHJlc3MpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZm9XaW5kb3cub3Blbih0aGlzLm1hcCwgdGhpcy5tYXJrZXIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBhdGllbnRJbmZvcyhyZXN1bHRzWzBdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gXCIsIHJlc3VsdHMsIFwiICYgU3RhdHVzIC0gXCIsIHN0YXR1cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==
