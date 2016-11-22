System.register(["@angular/core", "angular2-google-maps/core", "./Abstract.ComposantPatient", "./ComposantEditPatient"], function(exports_1, context_1) {
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
    var core_1, core_2, Abstract_ComposantPatient_1, ComposantEditPatient_1;
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
            },
            function (ComposantEditPatient_1_1) {
                ComposantEditPatient_1 = ComposantEditPatient_1_1;
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
                            this.geocoder.geocode({ "location": event.latLng }, (results, status) => {
                                if (status === google.maps.GeocoderStatus.OK) {
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
                                let lat = results[0].geometry.viewport.getCenter().lat();
                                let lng = results[0].geometry.viewport.getCenter().lng();
                                this.map.setCenter({ lat: lat, lng: lng });
                            }
                            else {
                                console.log("Error - ", results, " & Status - ", status);
                            }
                        });
                        this.initPatientLocation();
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
                initPatientLocation() {
                    if (this.composant instanceof ComposantEditPatient_1.ComposantEditPatient) {
                        this.composant.setAdresse(this.composant.patient.adresse);
                        let patient = this.composant.patient;
                        let adresse = patient.adresse.ville + " "
                            + patient.adresse.rue + " "
                            + patient.adresse.codePostal + " "
                            + patient.adresse.numero;
                        this.geocode(adresse);
                    }
                }
                search() {
                    if (this.searchAdress.nativeElement.value) {
                        let address = this.searchAdress.nativeElement.value;
                        this.geocode(address);
                    }
                }
                geocode(address) {
                    this.geocoder.geocode({ "address": address }, (results, status) => {
                        if (status === google.maps.GeocoderStatus.OK) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50TWFwcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBTU0sWUFBWTs7Ozs7Ozs7Ozs7Ozs7OztZQUFaLFlBQVksR0FBRzs7Ozs7Q0FLcEIsQ0FBQztZQUtGO2dCQVFJLFlBQW9CLFFBQXVCO29CQUF2QixhQUFRLEdBQVIsUUFBUSxDQUFlO29CQU4zQyxZQUFPLEdBQXlDLEVBQUUsQ0FBQztnQkFPbkQsQ0FBQztnQkFDRCxRQUFRO29CQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFFO3dCQUN2QixJQUFJLENBQUMsUUFBUSxHQUFLLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDN0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7d0JBQy9DLElBQUksQ0FBQyxHQUFHLEdBQVUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFOzRCQUNsRSxJQUFJLEVBQUUsRUFBRTt5QkFDWCxDQUFDLENBQUM7d0JBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBVTs0QkFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUUsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU07Z0NBQ2hFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29DQUMzQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3Q0FDZCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMs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Q0FBQyxDQUFDOzRCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7d0JBQzdELENBQUM7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztZQUVMLENBQUM7WUE1R0c7Z0JBQUMsWUFBSyxFQUFFOzs0REFBQTtZQU1SO2dCQUFDLGdCQUFTLENBQUMsY0FBYyxDQUFDOzsrREFBQTtZQVg5QjtnQkFBQyxnQkFBUyxDQUFDO29CQUNQLFFBQVEsRUFBRyxnQkFBZ0I7b0JBQzNCLFFBQVEsRUFBRyxZQUFZO2lCQUMxQixDQUFDOzs2QkFBQTtZQUNGLHlDQTZHQyxDQUFBIiwiZmlsZSI6IkNvbXBvbmVudHMvQ29tcG9zYW50TWFwcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBNYXBzQVBJTG9hZGVyIH0gZnJvbSBcImFuZ3VsYXIyLWdvb2dsZS1tYXBzL2NvcmVcIjtcbmltcG9ydCB7QWJzdHJhY3RDb21wb3NhbnRQYXRpZW50fSBmcm9tIFwiLi9BYnN0cmFjdC5Db21wb3NhbnRQYXRpZW50XCI7XG5pbXBvcnQge0NvbXBvc2FudEVkaXRQYXRpZW50fSBmcm9tIFwiLi9Db21wb3NhbnRFZGl0UGF0aWVudFwiO1xuaW1wb3J0IHtQYXRpZW50SW50ZXJmYWNlfSBmcm9tIFwiQFNlcnZpY2VzL2NhYmluZXRNZWRpY2FsU2VydmljZVwiO1xuXG5jb25zdCBodG1sVGVtcGxhdGUgPSBgXG4gICAgPGlucHV0IG5hbWU9XCJhZHJlc3NlXCIgcGxhY2Vob2xkZXI9XCJFeDogNCBydWUgZHUgQm91dCBHdWVzZG9uIDE0MTAwIElGU1wiICNzZWFyY2hBZHJlc3M+XG4gICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIlJlY2hlcmNoZXJcIiAoY2xpY2spPVwic2VhcmNoKClcIj48YnIvPlxuICAgIDxkaXYgY2xhc3M9XCJtYXBcIj5cbiAgICA8L2Rpdj5cbmA7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3Rvclx0OiBcImNvbXBvc2FudC1tYXBzXCIsXG4gICAgdGVtcGxhdGVcdDogaHRtbFRlbXBsYXRlXG59KVxuZXhwb3J0IGNsYXNzIENvbXBvc2FudE1hcHMgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIGNvbXBvc2FudCAgICAgICAgICAgICAgICAgICAgICA6IEFic3RyYWN0Q29tcG9zYW50UGF0aWVudDtcbiAgICBhZHJlc3NlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBhbnkgPSB7fTtcbiAgICBnZW9jb2RlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBnb29nbGUubWFwcy5HZW9jb2RlcjtcbiAgICBtYXAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBnb29nbGUubWFwcy5NYXA7XG4gICAgaW5mb1dpbmRvdyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdztcbiAgICBtYXJrZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBnb29nbGUubWFwcy5NYXJrZXI7XG4gICAgQFZpZXdDaGlsZChcInNlYXJjaEFkcmVzc1wiKSBzZWFyY2hBZHJlc3MgOiBFbGVtZW50UmVmO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX19sb2FkZXI6IE1hcHNBUElMb2FkZXIpIHtcbiAgICB9XG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuX19sb2FkZXIubG9hZCgpLnRoZW4oICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2VvY29kZXIgICA9IG5ldyBnb29nbGUubWFwcy5HZW9jb2RlcigpO1xuICAgICAgICAgICAgdGhpcy5pbmZvV2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coKTtcbiAgICAgICAgICAgIHRoaXMubWFwICAgICAgICA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYXBcIiksIHtcbiAgICAgICAgICAgICAgICB6b29tOiAxMlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLm1hcC5hZGRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZW9jb2Rlci5nZW9jb2RlKCB7IFwibG9jYXRpb25cIjogZXZlbnQubGF0TG5nfSwgKHJlc3VsdHMsIHN0YXR1cykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSBnb29nbGUubWFwcy5HZW9jb2RlclN0YXR1cy5PSykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWFya2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrZXIuc2V0TWFwKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiAgICA6IGV2ZW50LmxhdExuZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAgICAgICAgICA6IHRoaXMubWFwXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5mb1dpbmRvdy5zZXRDb250ZW50KHJlc3VsdHNbMF0uZm9ybWF0dGVkX2FkZHJlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmZvV2luZG93Lm9wZW4odGhpcy5tYXAsIHRoaXMubWFya2VyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGF0aWVudEluZm9zKHJlc3VsdHNbMF0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIFwiLCByZXN1bHRzLCBcIiAmIFN0YXR1cyAtIFwiLCBzdGF0dXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZ2VvY29kZXIuZ2VvY29kZSggeyBcImFkZHJlc3NcIjogXCJHcmVub2JsZVwifSwgKHJlc3VsdHMsIHN0YXR1cykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IGdvb2dsZS5tYXBzLkdlb2NvZGVyU3RhdHVzLk9LKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsYXQgPSByZXN1bHRzWzBdLmdlb21ldHJ5LnZpZXdwb3J0LmdldENlbnRlcigpLmxhdCgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbG5nID0gcmVzdWx0c1swXS5nZW9tZXRyeS52aWV3cG9ydC5nZXRDZW50ZXIoKS5sbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXAuc2V0Q2VudGVyKHtsYXQ6IGxhdCwgbG5nOiBsbmd9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gXCIsIHJlc3VsdHMsIFwiICYgU3RhdHVzIC0gXCIsIHN0YXR1cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmluaXRQYXRpZW50TG9jYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0UGF0aWVudEluZm9zKHJlc3VsdHM6IGdvb2dsZS5tYXBzLkdlb2NvZGVyUmVzdWx0KSB7XG4gICAgICAgIGlmIChyZXN1bHRzLmFkZHJlc3NfY29tcG9uZW50cykge1xuICAgICAgICAgICAgZm9yIChsZXQgb2JqIG9mIHJlc3VsdHMuYWRkcmVzc19jb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9iai50eXBlcy5pbmRleE9mKFwic3RyZWV0X251bWJlclwiKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZHJlc3NlLm51bWVybyA9IG9iai5sb25nX25hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChvYmoudHlwZXMuaW5kZXhPZihcInJvdXRlXCIpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkcmVzc2UucnVlID0gb2JqLmxvbmdfbmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG9iai50eXBlcy5pbmRleE9mKFwicG9zdGFsX2NvZGVcIikgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRyZXNzZS5jb2RlUG9zdGFsID0gb2JqLmxvbmdfbmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG9iai50eXBlcy5pbmRleE9mKFwibG9jYWxpdHlcIikgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRyZXNzZS52aWxsZSA9IG9iai5sb25nX25hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNvbXBvc2FudCkge1xuICAgICAgICAgICAgdGhpcy5jb21wb3NhbnQuc2V0QWRyZXNzZSh0aGlzLmFkcmVzc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGluaXRQYXRpZW50TG9jYXRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbXBvc2FudCBpbnN0YW5jZW9mIENvbXBvc2FudEVkaXRQYXRpZW50KSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvc2FudC5zZXRBZHJlc3NlKCg8Q29tcG9zYW50RWRpdFBhdGllbnQ+dGhpcy5jb21wb3NhbnQpLnBhdGllbnQuYWRyZXNzZSk7XG4gICAgICAgICAgICBsZXQgcGF0aWVudCA6IFBhdGllbnRJbnRlcmZhY2UgPSAoPENvbXBvc2FudEVkaXRQYXRpZW50PnRoaXMuY29tcG9zYW50KS5wYXRpZW50O1xuICAgICAgICAgICAgbGV0IGFkcmVzc2UgOiBzdHJpbmcgPSAgcGF0aWVudC5hZHJlc3NlLnZpbGxlICsgXCIgXCJcbiAgICAgICAgICAgICAgICArIHBhdGllbnQuYWRyZXNzZS5ydWUgKyBcIiBcIlxuICAgICAgICAgICAgICAgICsgcGF0aWVudC5hZHJlc3NlLmNvZGVQb3N0YWwgKyBcIiBcIlxuICAgICAgICAgICAgICAgICsgcGF0aWVudC5hZHJlc3NlLm51bWVybztcbiAgICAgICAgICAgIHRoaXMuZ2VvY29kZShhZHJlc3NlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZWFyY2goKSB7XG4gICAgICAgIGlmICh0aGlzLnNlYXJjaEFkcmVzcy5uYXRpdmVFbGVtZW50LnZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgYWRkcmVzcyA6IHN0cmluZyA9IHRoaXMuc2VhcmNoQWRyZXNzLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICAgICAgICB0aGlzLmdlb2NvZGUoYWRkcmVzcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2VvY29kZShhZGRyZXNzIDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZ2VvY29kZXIuZ2VvY29kZSggeyBcImFkZHJlc3NcIjogYWRkcmVzc30sIChyZXN1bHRzLCBzdGF0dXMpID0+IHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IGdvb2dsZS5tYXBzLkdlb2NvZGVyU3RhdHVzLk9LKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWFya2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFya2VyLnNldE1hcChudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gICAgOiByZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLFxuICAgICAgICAgICAgICAgICAgICBtYXAgICAgICAgICA6IHRoaXMubWFwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXAuc2V0Q2VudGVyKHJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24pO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5mb1dpbmRvdy5zZXRDb250ZW50KHJlc3VsdHNbMF0uZm9ybWF0dGVkX2FkZHJlc3MpO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5mb1dpbmRvdy5vcGVuKHRoaXMubWFwLCB0aGlzLm1hcmtlcik7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQYXRpZW50SW5mb3MocmVzdWx0c1swXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBcIiwgcmVzdWx0cywgXCIgJiBTdGF0dXMgLSBcIiwgc3RhdHVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=
