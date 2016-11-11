System.register(["@Services/cabinetMedicalService", "@angular/core", "@angular/router", "angular2-google-maps/core"], function(exports_1, context_1) {
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
    var NF, core_1, router_1, core_2;
    var htmlTemplate, ComposantOnlyPatient;
    return {
        setters:[
            function (NF_1) {
                NF = NF_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            htmlTemplate = `
    <div class="patient-only">
    <table *ngIf="patient">
        <tr>
            <td><b>Nom : </b></td>
            <td>{{patient.nom || ""}}</td>
        </tr>
        <tr>
            <td><b>Prénom : </b></td>
            <td>{{patient.prenom || ""}}</td>
        </tr>
        <tr>
            <td><b>Numéro de sécu : </b></td>
            <td>{{patient.numeroSecuriteSociale || ""}}</td>
        </tr>
        <tr>
            <td><b>Sexe :</b></td>
            <td>{{patient.sexe || ""}}</td>
        </tr>
        <tr>
            <td><b>Naissance :</b></td>
            <td>{{patient.naissance || ""}}</td>
        </tr>
        <tr>
            <td><b>Adresse :</b></td>
            <td></td>
        </tr>
    </table>
    <div class="map"></div>
         
        <br/>
        <br/>
    </div>
    <a [routerLink]="['/secretaire']">Retour</a>
`;
            ComposantOnlyPatient = class ComposantOnlyPatient {
                constructor(cms, route, __loader) {
                    this.cms = cms;
                    this.route = route;
                    this.__loader = __loader;
                }
                ngOnInit() {
                    this.route.params.forEach((params) => {
                        this.numero = params["numero"];
                        console.log(params);
                    });
                    this.cms.getPatientById(this.numero).then((res) => {
                        this.patient = res;
                        console.log(res);
                        this.__loader.load().then(() => {
                            this.geocoder = new google.maps.Geocoder();
                            this.infoWindow = new google.maps.InfoWindow();
                            this.map = new google.maps.Map(document.querySelector(".map"), {
                                zoom: 12
                            });
                            let patientAdresse = this.patient.adresse.ville + " "
                                + this.patient.adresse.numero + " "
                                + this.patient.adresse.rue + " "
                                + this.patient.adresse.codePostal;
                            console.log(patientAdresse);
                            this.geocoder.geocode({ "address": patientAdresse }, (results, status) => {
                                if (status === google.maps.GeocoderStatus.OK) {
                                    this.marker = new google.maps.Marker({
                                        position: results[0].geometry.location,
                                        map: this.map
                                    });
                                    this.map.setCenter(results[0].geometry.location);
                                    this.infoWindow.setContent(results[0].formatted_address);
                                    this.infoWindow.open(this.map, this.marker);
                                }
                                else {
                                    console.log("Error - ", results, " & Status - ", status);
                                }
                            });
                        });
                    });
                }
            };
            ComposantOnlyPatient = __decorate([
                core_1.Component({
                    template: htmlTemplate
                }), 
                __metadata('design:paramtypes', [NF.ServiceCabinetMedical, router_1.ActivatedRoute, core_2.MapsAPILoader])
            ], ComposantOnlyPatient);
            exports_1("ComposantOnlyPatient", ComposantOnlyPatient);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50T25seVBhdGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztRQU1NLFlBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7WUFBWixZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FrQ3BCLENBQUM7WUFJRjtnQkFPSSxZQUFtQixHQUE2QixFQUFVLEtBQXNCLEVBQVUsUUFBdUI7b0JBQTlGLFFBQUcsR0FBSCxHQUFHLENBQTBCO29CQUFVLFVBQUssR0FBTCxLQUFLLENBQWlCO29CQUFVLGFBQVEsR0FBUixRQUFRLENBQWU7Z0JBQUcsQ0FBQztnQkFDckgsUUFBUTtvQkFDSixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFjO3dCQUNyQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDeEIsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUc7d0JBQzFDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO3dCQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQzs0QkFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBSyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7NEJBQzdDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDOzRCQUMvQyxJQUFJLENBQUMsR0FBRyxHQUFVLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQ0FDbEUsSUFBSSxFQUFFLEVBQUU7NkJBQ1gsQ0FBQyxDQUFDOzRCQUNILElBQUksY0FBYyxHQUFZLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxHQUFHO2tDQUN4RCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsR0FBRztrQ0FDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUc7a0NBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQzs0QkFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQzs0QkFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUUsRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTTtnQ0FDakUsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0NBQzNDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzt3Q0FDakMsUUFBUSxFQUFNLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUTt3Q0FDMUMsR0FBRyxFQUFXLElBQUksQ0FBQyxHQUFHO3FDQUN6QixDQUFDLENBQUM7b0NBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQ0FDakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUM7b0NBQ3pELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dDQUNoRCxDQUFDO2dDQUFDLElBQUksQ0FBQyxDQUFDO29DQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0NBQzdELENBQUM7NEJBQ0wsQ0FBQyxDQUFDLENBQUM7d0JBQ1AsQ0FBQyxDQUFDLENBQUM7b0JBQ1AsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztZQUNMLENBQUM7WUE5Q0Q7Z0JBQUMsZ0JBQVMsQ0FBQztvQkFDUCxRQUFRLEVBQUcsWUFBWTtpQkFDMUIsQ0FBQztvREFRNkIscUJBQXFCO29DQVJsRDtZQUNGLHVEQTJDQyxDQUFBIiwiZmlsZSI6IkNvbXBvbmVudHMvQ29tcG9zYW50T25seVBhdGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBORiBmcm9tIFwiQFNlcnZpY2VzL2NhYmluZXRNZWRpY2FsU2VydmljZVwiO1xyXG5pbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlLCBQYXJhbXN9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHtQYXRpZW50SW50ZXJmYWNlfSBmcm9tIFwiQFNlcnZpY2VzL2NhYmluZXRNZWRpY2FsU2VydmljZVwiO1xyXG5pbXBvcnQge01hcHNBUElMb2FkZXJ9IGZyb20gXCJhbmd1bGFyMi1nb29nbGUtbWFwcy9jb3JlXCI7XHJcblxyXG5jb25zdCBodG1sVGVtcGxhdGUgPSBgXHJcbiAgICA8ZGl2IGNsYXNzPVwicGF0aWVudC1vbmx5XCI+XHJcbiAgICA8dGFibGUgKm5nSWY9XCJwYXRpZW50XCI+XHJcbiAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICA8dGQ+PGI+Tm9tIDogPC9iPjwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD57e3BhdGllbnQubm9tIHx8IFwiXCJ9fTwvdGQ+XHJcbiAgICAgICAgPC90cj5cclxuICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgIDx0ZD48Yj5QcsOpbm9tIDogPC9iPjwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD57e3BhdGllbnQucHJlbm9tIHx8IFwiXCJ9fTwvdGQ+XHJcbiAgICAgICAgPC90cj5cclxuICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgIDx0ZD48Yj5OdW3DqXJvIGRlIHPDqWN1IDogPC9iPjwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD57e3BhdGllbnQubnVtZXJvU2VjdXJpdGVTb2NpYWxlIHx8IFwiXCJ9fTwvdGQ+XHJcbiAgICAgICAgPC90cj5cclxuICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgIDx0ZD48Yj5TZXhlIDo8L2I+PC90ZD5cclxuICAgICAgICAgICAgPHRkPnt7cGF0aWVudC5zZXhlIHx8IFwiXCJ9fTwvdGQ+XHJcbiAgICAgICAgPC90cj5cclxuICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgIDx0ZD48Yj5OYWlzc2FuY2UgOjwvYj48L3RkPlxyXG4gICAgICAgICAgICA8dGQ+e3twYXRpZW50Lm5haXNzYW5jZSB8fCBcIlwifX08L3RkPlxyXG4gICAgICAgIDwvdHI+XHJcbiAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICA8dGQ+PGI+QWRyZXNzZSA6PC9iPjwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD48L3RkPlxyXG4gICAgICAgIDwvdHI+XHJcbiAgICA8L3RhYmxlPlxyXG4gICAgPGRpdiBjbGFzcz1cIm1hcFwiPjwvZGl2PlxyXG4gICAgICAgICBcclxuICAgICAgICA8YnIvPlxyXG4gICAgICAgIDxici8+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxhIFtyb3V0ZXJMaW5rXT1cIlsnL3NlY3JldGFpcmUnXVwiPlJldG91cjwvYT5cclxuYDtcclxuQENvbXBvbmVudCh7XHJcbiAgICB0ZW1wbGF0ZVx0OiBodG1sVGVtcGxhdGVcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbXBvc2FudE9ubHlQYXRpZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIG51bWVybyAgICAgIDogc3RyaW5nO1xyXG4gICAgcGF0aWVudCAgICAgOiBQYXRpZW50SW50ZXJmYWNlO1xyXG4gICAgZ2VvY29kZXIgICAgOiBnb29nbGUubWFwcy5HZW9jb2RlcjtcclxuICAgIG1hcCAgICAgICAgIDogZ29vZ2xlLm1hcHMuTWFwO1xyXG4gICAgbWFya2VyICAgICAgOiBnb29nbGUubWFwcy5NYXJrZXI7XHJcbiAgICBpbmZvV2luZG93ICA6IGdvb2dsZS5tYXBzLkluZm9XaW5kb3c7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY21zOiBORi5TZXJ2aWNlQ2FiaW5ldE1lZGljYWwsIHByaXZhdGUgcm91dGUgOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSBfX2xvYWRlcjogTWFwc0FQSUxvYWRlcikge31cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMucm91dGUucGFyYW1zLmZvckVhY2goKHBhcmFtczogUGFyYW1zKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubnVtZXJvID0gcGFyYW1zW1wibnVtZXJvXCJdO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwYXJhbXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY21zLmdldFBhdGllbnRCeUlkKHRoaXMubnVtZXJvKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wYXRpZW50ID0gcmVzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICB0aGlzLl9fbG9hZGVyLmxvYWQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2VvY29kZXIgICA9IG5ldyBnb29nbGUubWFwcy5HZW9jb2RlcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbmZvV2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwICAgICAgICA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYXBcIiksIHtcclxuICAgICAgICAgICAgICAgICAgICB6b29tOiAxMlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGF0aWVudEFkcmVzc2UgOiBzdHJpbmcgPSB0aGlzLnBhdGllbnQuYWRyZXNzZS52aWxsZSArIFwiIFwiXHJcbiAgICAgICAgICAgICAgICAgICAgKyB0aGlzLnBhdGllbnQuYWRyZXNzZS5udW1lcm8gKyBcIiBcIlxyXG4gICAgICAgICAgICAgICAgICAgICsgdGhpcy5wYXRpZW50LmFkcmVzc2UucnVlICsgXCIgXCJcclxuICAgICAgICAgICAgICAgICAgICArIHRoaXMucGF0aWVudC5hZHJlc3NlLmNvZGVQb3N0YWw7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwYXRpZW50QWRyZXNzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdlb2NvZGVyLmdlb2NvZGUoIHsgXCJhZGRyZXNzXCI6IHBhdGllbnRBZHJlc3NlfSwgKHJlc3VsdHMsIHN0YXR1cykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IGdvb2dsZS5tYXBzLkdlb2NvZGVyU3RhdHVzLk9LKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiAgICA6IHJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAgICAgICAgICA6IHRoaXMubWFwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcC5zZXRDZW50ZXIocmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5mb1dpbmRvdy5zZXRDb250ZW50KHJlc3VsdHNbMF0uZm9ybWF0dGVkX2FkZHJlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluZm9XaW5kb3cub3Blbih0aGlzLm1hcCwgdGhpcy5tYXJrZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBcIiwgcmVzdWx0cywgXCIgJiBTdGF0dXMgLSBcIiwgc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==
