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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50TWFwcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBSU0sWUFBWTs7Ozs7Ozs7Ozs7OztZQUFaLFlBQVksR0FBRzs7Ozs7Q0FLcEIsQ0FBQztZQUtGO2dCQVFJLFlBQW9CLFFBQXVCO29CQUF2QixhQUFRLEdBQVIsUUFBUSxDQUFlO29CQU4zQyxZQUFPLEdBQXlDLEVBQUUsQ0FBQztnQkFPbkQsQ0FBQztnQkFDRCxRQUFRO29CQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFFO3dCQUN2QixJQUFJLENBQUMsUUFBUSxHQUFLLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDN0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7d0JBQy9DLElBQUksQ0FBQyxHQUFHLEdBQVUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFOzRCQUNsRSxJQUFJLEVBQUUsRUFBRTt5QkFDWCxDQUFDLENBQUM7d0JBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBVTs0QkFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUUsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU07Z0NBQ2hFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29DQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29DQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3Q0FDZCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQ0FDN0IsQ0FBQztvQ0FDRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7d0NBQ2pDLFFBQVEsRUFBTSxLQUFLLENBQUMsTUFBTTt3Q0FDMUIsR0FBRyxFQUFXLElBQUksQ0FBQyxHQUFHO3FDQUN6QixDQUFDLENBQUM7b0NBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUM7b0NBQ3pELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29DQUM1QyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUNyQyxDQUFDO2dDQUFDLElBQUksQ0FBQyxDQUFDO29DQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0NBQzdELENBQUM7NEJBQ0wsQ0FBQyxDQUFDLENBQUM7d0JBQ1AsQ0FBQyxDQUFDLENBQUM7d0JBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTTs0QkFDN0QsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0NBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Z0NBQ3JCLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dDQUN6RCxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQ0FDekQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFDOzRCQUM3QyxDQUFDOzRCQUFDLElBQUksQ0FBQyxDQUFDO2dDQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7NEJBQzdELENBQUM7d0JBQ0wsQ0FBQyxDQUFDLENBQUM7b0JBQ1AsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFFRCxlQUFlLENBQUMsT0FBbUM7b0JBQy9DLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7d0JBQzdCLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7NEJBQ3pDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQzs0QkFDeEMsQ0FBQzs0QkFDRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7NEJBQ3JDLENBQUM7NEJBQ0QsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDOzRCQUM1QyxDQUFDOzRCQUNELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQzs0QkFDdkMsQ0FBQzt3QkFDTCxDQUFDO29CQUNMLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDNUMsQ0FBQztnQkFDTCxDQUFDO2dCQUdNLE1BQU07b0JBQ1QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDeEMsSUFBSSxPQUFPLEdBQVksSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO3dCQUM3RCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBRSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxNQUFNOzRCQUMxRCxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQ0FDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQ0FDckIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0NBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQzdCLENBQUM7Z0NBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO29DQUNqQyxRQUFRLEVBQU0sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRO29DQUMxQyxHQUFHLEVBQVcsSUFBSSxDQUFDLEdBQUc7aUNBQ3pCLENBQUMsQ0FBQztnQ0FDSCxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dDQUNqRCxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQ0FDekQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0NBQzVDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3JDLENBQUM7NEJBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQzs0QkFDN0QsQ0FBQzt3QkFDTCxDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDO2dCQUNMLENBQUM7WUFFTCxDQUFDO1lBaEdHO2dCQUFDLFlBQUssRUFBRTs7NERBQUE7WUFNUjtnQkFBQyxnQkFBUyxDQUFDLGNBQWMsQ0FBQzs7K0RBQUE7WUFYOUI7Z0JBQUMsZ0JBQVMsQ0FBQztvQkFDUCxRQUFRLEVBQUcsZ0JBQWdCO29CQUMzQixRQUFRLEVBQUcsWUFBWTtpQkFDMUIsQ0FBQzs7NkJBQUE7WUFDRix5Q0FpR0MsQ0FBQSIsImZpbGUiOiJDb21wb25lbnRzL0NvbXBvc2FudE1hcHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBNYXBzQVBJTG9hZGVyIH0gZnJvbSBcImFuZ3VsYXIyLWdvb2dsZS1tYXBzL2NvcmVcIjtcclxuaW1wb3J0IHtBYnN0cmFjdENvbXBvc2FudFBhdGllbnR9IGZyb20gXCIuL0Fic3RyYWN0LkNvbXBvc2FudFBhdGllbnRcIjtcclxuXHJcbmNvbnN0IGh0bWxUZW1wbGF0ZSA9IGBcclxuICAgIDxpbnB1dCBuYW1lPVwiYWRyZXNzZVwiIHBsYWNlaG9sZGVyPVwiRXg6IDQgcnVlIGR1IEJvdXQgR3Vlc2RvbiAxNDEwMCBJRlNcIiAjc2VhcmNoQWRyZXNzPlxyXG4gICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIlJlY2hlcmNoZXJcIiAoY2xpY2spPVwic2VhcmNoKClcIj48YnIvPlxyXG4gICAgPGRpdiBjbGFzcz1cIm1hcFwiPlxyXG4gICAgPC9kaXY+XHJcbmA7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3JcdDogXCJjb21wb3NhbnQtbWFwc1wiLFxyXG4gICAgdGVtcGxhdGVcdDogaHRtbFRlbXBsYXRlXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb21wb3NhbnRNYXBzIGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIEBJbnB1dCgpIGNvbXBvc2FudCAgICAgICAgICAgICAgICAgICAgICA6IEFic3RyYWN0Q29tcG9zYW50UGF0aWVudDtcclxuICAgIGFkcmVzc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGFueSA9IHt9O1xyXG4gICAgZ2VvY29kZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZ29vZ2xlLm1hcHMuR2VvY29kZXI7XHJcbiAgICBtYXAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBnb29nbGUubWFwcy5NYXA7XHJcbiAgICBpbmZvV2luZG93ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBnb29nbGUubWFwcy5JbmZvV2luZG93O1xyXG4gICAgbWFya2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZ29vZ2xlLm1hcHMuTWFya2VyO1xyXG4gICAgQFZpZXdDaGlsZChcInNlYXJjaEFkcmVzc1wiKSBzZWFyY2hBZHJlc3MgOiBFbGVtZW50UmVmO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfX2xvYWRlcjogTWFwc0FQSUxvYWRlcikge1xyXG4gICAgfVxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5fX2xvYWRlci5sb2FkKCkudGhlbiggKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdlb2NvZGVyICAgPSBuZXcgZ29vZ2xlLm1hcHMuR2VvY29kZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5pbmZvV2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coKTtcclxuICAgICAgICAgICAgdGhpcy5tYXAgICAgICAgID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1hcFwiKSwge1xyXG4gICAgICAgICAgICAgICAgem9vbTogMTJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLmFkZExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2VvY29kZXIuZ2VvY29kZSggeyBcImxvY2F0aW9uXCI6IGV2ZW50LmxhdExuZ30sIChyZXN1bHRzLCBzdGF0dXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSBnb29nbGUubWFwcy5HZW9jb2RlclN0YXR1cy5PSykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWFya2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtlci5zZXRNYXAobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uICAgIDogZXZlbnQubGF0TG5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwICAgICAgICAgOiB0aGlzLm1hcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmZvV2luZG93LnNldENvbnRlbnQocmVzdWx0c1swXS5mb3JtYXR0ZWRfYWRkcmVzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5mb1dpbmRvdy5vcGVuKHRoaXMubWFwLCB0aGlzLm1hcmtlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGF0aWVudEluZm9zKHJlc3VsdHNbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBcIiwgcmVzdWx0cywgXCIgJiBTdGF0dXMgLSBcIiwgc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VvY29kZXIuZ2VvY29kZSggeyBcImFkZHJlc3NcIjogXCJHcmVub2JsZVwifSwgKHJlc3VsdHMsIHN0YXR1cykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gZ29vZ2xlLm1hcHMuR2VvY29kZXJTdGF0dXMuT0spIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHRzKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGF0ID0gcmVzdWx0c1swXS5nZW9tZXRyeS52aWV3cG9ydC5nZXRDZW50ZXIoKS5sYXQoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbG5nID0gcmVzdWx0c1swXS5nZW9tZXRyeS52aWV3cG9ydC5nZXRDZW50ZXIoKS5sbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcC5zZXRDZW50ZXIoe2xhdDogbGF0LCBsbmc6IGxuZ30pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gXCIsIHJlc3VsdHMsIFwiICYgU3RhdHVzIC0gXCIsIHN0YXR1cyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBhdGllbnRJbmZvcyhyZXN1bHRzOiBnb29nbGUubWFwcy5HZW9jb2RlclJlc3VsdCkge1xyXG4gICAgICAgIGlmIChyZXN1bHRzLmFkZHJlc3NfY29tcG9uZW50cykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBvYmogb2YgcmVzdWx0cy5hZGRyZXNzX2NvbXBvbmVudHMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmoudHlwZXMuaW5kZXhPZihcInN0cmVldF9udW1iZXJcIikgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZHJlc3NlLm51bWVybyA9IG9iai5sb25nX25hbWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLnR5cGVzLmluZGV4T2YoXCJyb3V0ZVwiKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkcmVzc2UucnVlID0gb2JqLmxvbmdfbmFtZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChvYmoudHlwZXMuaW5kZXhPZihcInBvc3RhbF9jb2RlXCIpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRyZXNzZS5jb2RlUG9zdGFsID0gb2JqLmxvbmdfbmFtZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChvYmoudHlwZXMuaW5kZXhPZihcImxvY2FsaXR5XCIpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRyZXNzZS52aWxsZSA9IG9iai5sb25nX25hbWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY29tcG9zYW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcG9zYW50LnNldEFkcmVzc2UodGhpcy5hZHJlc3NlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzZWFyY2goKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoQWRyZXNzLm5hdGl2ZUVsZW1lbnQudmFsdWUpIHtcclxuICAgICAgICAgICAgbGV0IGFkZHJlc3MgOiBzdHJpbmcgPSB0aGlzLnNlYXJjaEFkcmVzcy5uYXRpdmVFbGVtZW50LnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLmdlb2NvZGVyLmdlb2NvZGUoIHsgXCJhZGRyZXNzXCI6IGFkZHJlc3N9LCAocmVzdWx0cywgc3RhdHVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSBnb29nbGUubWFwcy5HZW9jb2RlclN0YXR1cy5PSykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hcmtlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtlci5zZXRNYXAobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uICAgIDogcmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwICAgICAgICAgOiB0aGlzLm1hcFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwLnNldENlbnRlcihyZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZm9XaW5kb3cuc2V0Q29udGVudChyZXN1bHRzWzBdLmZvcm1hdHRlZF9hZGRyZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZm9XaW5kb3cub3Blbih0aGlzLm1hcCwgdGhpcy5tYXJrZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGF0aWVudEluZm9zKHJlc3VsdHNbMF0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gXCIsIHJlc3VsdHMsIFwiICYgU3RhdHVzIC0gXCIsIHN0YXR1cyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=
