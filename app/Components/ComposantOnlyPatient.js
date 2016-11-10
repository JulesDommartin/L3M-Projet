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
                            let patientAdresse = this.patient.adresse.ville + " " + this.patient.adresse.numero + " " + this.patient.adresse.rue + " " + this.patient.adresse.codePostal;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50T25seVBhdGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztRQU1NLFlBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7WUFBWixZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FrQ3BCLENBQUM7WUFJRjtnQkFPSSxZQUFtQixHQUE2QixFQUFVLEtBQXNCLEVBQVUsUUFBdUI7b0JBQTlGLFFBQUcsR0FBSCxHQUFHLENBQTBCO29CQUFVLFVBQUssR0FBTCxLQUFLLENBQWlCO29CQUFVLGFBQVEsR0FBUixRQUFRLENBQWU7Z0JBQUcsQ0FBQztnQkFDckgsUUFBUTtvQkFDSixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFjO3dCQUNyQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDeEIsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUc7d0JBQzFDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO3dCQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQzs0QkFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBSyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7NEJBQzdDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDOzRCQUMvQyxJQUFJLENBQUMsR0FBRyxHQUFVLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQ0FDbEUsSUFBSSxFQUFFLEVBQUU7NkJBQ1gsQ0FBQyxDQUFDOzRCQUNILElBQUksY0FBYyxHQUFZLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQzs0QkFDdEssT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQzs0QkFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUUsRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTTtnQ0FDakUsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0NBQzNDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzt3Q0FDakMsUUFBUSxFQUFNLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUTt3Q0FDMUMsR0FBRyxFQUFXLElBQUksQ0FBQyxHQUFHO3FDQUN6QixDQUFDLENBQUM7b0NBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQ0FDakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUM7b0NBQ3pELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dDQUNoRCxDQUFDO2dDQUFDLElBQUksQ0FBQyxDQUFDO29DQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0NBQzdELENBQUM7NEJBQ0wsQ0FBQyxDQUFDLENBQUM7d0JBQ1AsQ0FBQyxDQUFDLENBQUM7b0JBQ1AsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztZQUNMLENBQUM7WUEzQ0Q7Z0JBQUMsZ0JBQVMsQ0FBQztvQkFDUCxRQUFRLEVBQUcsWUFBWTtpQkFDMUIsQ0FBQztvREFRNkIscUJBQXFCO29DQVJsRDtZQUNGLHVEQXdDQyxDQUFBIiwiZmlsZSI6IkNvbXBvbmVudHMvQ29tcG9zYW50T25seVBhdGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBORiBmcm9tIFwiQFNlcnZpY2VzL2NhYmluZXRNZWRpY2FsU2VydmljZVwiO1xuaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7QWN0aXZhdGVkUm91dGUsIFBhcmFtc30gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHtQYXRpZW50SW50ZXJmYWNlfSBmcm9tIFwiQFNlcnZpY2VzL2NhYmluZXRNZWRpY2FsU2VydmljZVwiO1xuaW1wb3J0IHtNYXBzQVBJTG9hZGVyfSBmcm9tIFwiYW5ndWxhcjItZ29vZ2xlLW1hcHMvY29yZVwiO1xuXG5jb25zdCBodG1sVGVtcGxhdGUgPSBgXG4gICAgPGRpdiBjbGFzcz1cInBhdGllbnQtb25seVwiPlxuICAgIDx0YWJsZSAqbmdJZj1cInBhdGllbnRcIj5cbiAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRkPjxiPk5vbSA6IDwvYj48L3RkPlxuICAgICAgICAgICAgPHRkPnt7cGF0aWVudC5ub20gfHwgXCJcIn19PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRkPjxiPlByw6lub20gOiA8L2I+PC90ZD5cbiAgICAgICAgICAgIDx0ZD57e3BhdGllbnQucHJlbm9tIHx8IFwiXCJ9fTwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICAgIDx0cj5cbiAgICAgICAgICAgIDx0ZD48Yj5OdW3DqXJvIGRlIHPDqWN1IDogPC9iPjwvdGQ+XG4gICAgICAgICAgICA8dGQ+e3twYXRpZW50Lm51bWVyb1NlY3VyaXRlU29jaWFsZSB8fCBcIlwifX08L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGQ+PGI+U2V4ZSA6PC9iPjwvdGQ+XG4gICAgICAgICAgICA8dGQ+e3twYXRpZW50LnNleGUgfHwgXCJcIn19PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRkPjxiPk5haXNzYW5jZSA6PC9iPjwvdGQ+XG4gICAgICAgICAgICA8dGQ+e3twYXRpZW50Lm5haXNzYW5jZSB8fCBcIlwifX08L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGQ+PGI+QWRyZXNzZSA6PC9iPjwvdGQ+XG4gICAgICAgICAgICA8dGQ+PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICA8L3RhYmxlPlxuICAgIDxkaXYgY2xhc3M9XCJtYXBcIj48L2Rpdj5cbiAgICAgICAgIFxuICAgICAgICA8YnIvPlxuICAgICAgICA8YnIvPlxuICAgIDwvZGl2PlxuICAgIDxhIFtyb3V0ZXJMaW5rXT1cIlsnL3NlY3JldGFpcmUnXVwiPlJldG91cjwvYT5cbmA7XG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVx0OiBodG1sVGVtcGxhdGVcbn0pXG5leHBvcnQgY2xhc3MgQ29tcG9zYW50T25seVBhdGllbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIG51bWVybyAgICAgIDogc3RyaW5nO1xuICAgIHBhdGllbnQgICAgIDogUGF0aWVudEludGVyZmFjZTtcbiAgICBnZW9jb2RlciAgICA6IGdvb2dsZS5tYXBzLkdlb2NvZGVyO1xuICAgIG1hcCAgICAgICAgIDogZ29vZ2xlLm1hcHMuTWFwO1xuICAgIG1hcmtlciAgICAgIDogZ29vZ2xlLm1hcHMuTWFya2VyO1xuICAgIGluZm9XaW5kb3cgIDogZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdztcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY21zOiBORi5TZXJ2aWNlQ2FiaW5ldE1lZGljYWwsIHByaXZhdGUgcm91dGUgOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSBfX2xvYWRlcjogTWFwc0FQSUxvYWRlcikge31cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5yb3V0ZS5wYXJhbXMuZm9yRWFjaCgocGFyYW1zOiBQYXJhbXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMubnVtZXJvID0gcGFyYW1zW1wibnVtZXJvXCJdO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocGFyYW1zKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY21zLmdldFBhdGllbnRCeUlkKHRoaXMubnVtZXJvKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGF0aWVudCA9IHJlcztcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgICAgICB0aGlzLl9fbG9hZGVyLmxvYWQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdlb2NvZGVyICAgPSBuZXcgZ29vZ2xlLm1hcHMuR2VvY29kZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmluZm9XaW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdygpO1xuICAgICAgICAgICAgICAgIHRoaXMubWFwICAgICAgICA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYXBcIiksIHtcbiAgICAgICAgICAgICAgICAgICAgem9vbTogMTJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBsZXQgcGF0aWVudEFkcmVzc2UgOiBzdHJpbmcgPSB0aGlzLnBhdGllbnQuYWRyZXNzZS52aWxsZSArIFwiIFwiICsgdGhpcy5wYXRpZW50LmFkcmVzc2UubnVtZXJvICsgXCIgXCIgKyB0aGlzLnBhdGllbnQuYWRyZXNzZS5ydWUgKyBcIiBcIiArIHRoaXMucGF0aWVudC5hZHJlc3NlLmNvZGVQb3N0YWw7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGF0aWVudEFkcmVzc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2VvY29kZXIuZ2VvY29kZSggeyBcImFkZHJlc3NcIjogcGF0aWVudEFkcmVzc2V9LCAocmVzdWx0cywgc3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IGdvb2dsZS5tYXBzLkdlb2NvZGVyU3RhdHVzLk9LKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uICAgIDogcmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAgICAgICAgICA6IHRoaXMubWFwXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwLnNldENlbnRlcihyZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5mb1dpbmRvdy5zZXRDb250ZW50KHJlc3VsdHNbMF0uZm9ybWF0dGVkX2FkZHJlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmZvV2luZG93Lm9wZW4odGhpcy5tYXAsIHRoaXMubWFya2VyKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBcIiwgcmVzdWx0cywgXCIgJiBTdGF0dXMgLSBcIiwgc3RhdHVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=
