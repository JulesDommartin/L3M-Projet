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
            <td>{{getLitteralPatientSexe()}}</td>
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
    <div class="div-bouton-retour">
        <a class="bouton-retour" [routerLink]="['/secretaire']">Retour</a>
    </div>
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
                    });
                    this.cms.getPatientById(this.numero).then((res) => {
                        this.patient = res;
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
                getLitteralPatientSexe() {
                    if (this.patient) {
                        if (this.patient.sexe === 0) {
                            return "Homme";
                        }
                        else if (this.patient.sexe === 1) {
                            return "Femme";
                        }
                        else {
                            return "?";
                        }
                    }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50T25seVBhdGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztRQU1NLFlBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7WUFBWixZQUFZLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQW9DcEIsQ0FBQztZQUlGO2dCQU9JLFlBQW1CLEdBQTZCLEVBQVUsS0FBc0IsRUFBVSxRQUF1QjtvQkFBOUYsUUFBRyxHQUFILEdBQUcsQ0FBMEI7b0JBQVUsVUFBSyxHQUFMLEtBQUssQ0FBaUI7b0JBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBZTtnQkFBRyxDQUFDO2dCQUNySCxRQUFRO29CQUNKLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQWM7d0JBQ3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNuQyxDQUFDLENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRzt3QkFDMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7d0JBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDOzRCQUN0QixJQUFJLENBQUMsUUFBUSxHQUFLLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs0QkFDN0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7NEJBQy9DLElBQUksQ0FBQyxHQUFHLEdBQVUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dDQUNsRSxJQUFJLEVBQUUsRUFBRTs2QkFDWCxDQUFDLENBQUM7NEJBQ0gsSUFBSSxjQUFjLEdBQVksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEdBQUc7a0NBQ3hELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHO2tDQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRztrQ0FDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDOzRCQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBRSxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxNQUFNO2dDQUNqRSxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQ0FDM0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO3dDQUNqQyxRQUFRLEVBQU0sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRO3dDQUMxQyxHQUFHLEVBQVcsSUFBSSxDQUFDLEdBQUc7cUNBQ3pCLENBQUMsQ0FBQztvQ0FDSCxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29DQUNqRCxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQztvQ0FDekQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0NBQ2hELENBQUM7Z0NBQUMsSUFBSSxDQUFDLENBQUM7b0NBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztnQ0FDN0QsQ0FBQzs0QkFDTCxDQUFDLENBQUMsQ0FBQzt3QkFDUCxDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUVELHNCQUFzQjtvQkFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQ2YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDMUIsTUFBTSxDQUFDLE9BQU8sQ0FBQzt3QkFDbkIsQ0FBQzt3QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDakMsTUFBTSxDQUFDLE9BQU8sQ0FBQzt3QkFDbkIsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDSixNQUFNLENBQUMsR0FBRyxDQUFDO3dCQUNmLENBQUM7b0JBQ0wsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQztZQXZERDtnQkFBQyxnQkFBUyxDQUFDO29CQUNQLFFBQVEsRUFBRyxZQUFZO2lCQUMxQixDQUFDO29EQVE2QixxQkFBcUI7b0NBUmxEO1lBQ0YsdURBb0RDLENBQUEiLCJmaWxlIjoiQ29tcG9uZW50cy9Db21wb3NhbnRPbmx5UGF0aWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIE5GIGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XG5pbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQge1BhdGllbnRJbnRlcmZhY2V9IGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XG5pbXBvcnQge01hcHNBUElMb2FkZXJ9IGZyb20gXCJhbmd1bGFyMi1nb29nbGUtbWFwcy9jb3JlXCI7XG5cbmNvbnN0IGh0bWxUZW1wbGF0ZSA9IGBcbiAgICA8ZGl2IGNsYXNzPVwicGF0aWVudC1vbmx5XCI+XG4gICAgPHRhYmxlICpuZ0lmPVwicGF0aWVudFwiPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGQ+PGI+Tm9tIDogPC9iPjwvdGQ+XG4gICAgICAgICAgICA8dGQ+e3twYXRpZW50Lm5vbSB8fCBcIlwifX08L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGQ+PGI+UHLDqW5vbSA6IDwvYj48L3RkPlxuICAgICAgICAgICAgPHRkPnt7cGF0aWVudC5wcmVub20gfHwgXCJcIn19PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRkPjxiPk51bcOpcm8gZGUgc8OpY3UgOiA8L2I+PC90ZD5cbiAgICAgICAgICAgIDx0ZD57e3BhdGllbnQubnVtZXJvU2VjdXJpdGVTb2NpYWxlIHx8IFwiXCJ9fTwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICAgIDx0cj5cbiAgICAgICAgICAgIDx0ZD48Yj5TZXhlIDo8L2I+PC90ZD5cbiAgICAgICAgICAgIDx0ZD57e2dldExpdHRlcmFsUGF0aWVudFNleGUoKX19PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRkPjxiPk5haXNzYW5jZSA6PC9iPjwvdGQ+XG4gICAgICAgICAgICA8dGQ+e3twYXRpZW50Lm5haXNzYW5jZSB8fCBcIlwifX08L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGQ+PGI+QWRyZXNzZSA6PC9iPjwvdGQ+XG4gICAgICAgICAgICA8dGQ+PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICA8L3RhYmxlPlxuICAgIDxkaXYgY2xhc3M9XCJtYXBcIj48L2Rpdj5cbiAgICAgICAgIFxuICAgICAgICA8YnIvPlxuICAgICAgICA8YnIvPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJkaXYtYm91dG9uLXJldG91clwiPlxuICAgICAgICA8YSBjbGFzcz1cImJvdXRvbi1yZXRvdXJcIiBbcm91dGVyTGlua109XCJbJy9zZWNyZXRhaXJlJ11cIj5SZXRvdXI8L2E+XG4gICAgPC9kaXY+XG5gO1xuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVcdDogaHRtbFRlbXBsYXRlXG59KVxuZXhwb3J0IGNsYXNzIENvbXBvc2FudE9ubHlQYXRpZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBudW1lcm8gICAgICA6IHN0cmluZztcbiAgICBwYXRpZW50ICAgICA6IFBhdGllbnRJbnRlcmZhY2U7XG4gICAgZ2VvY29kZXIgICAgOiBnb29nbGUubWFwcy5HZW9jb2RlcjtcbiAgICBtYXAgICAgICAgICA6IGdvb2dsZS5tYXBzLk1hcDtcbiAgICBtYXJrZXIgICAgICA6IGdvb2dsZS5tYXBzLk1hcmtlcjtcbiAgICBpbmZvV2luZG93ICA6IGdvb2dsZS5tYXBzLkluZm9XaW5kb3c7XG4gICAgY29uc3RydWN0b3IocHVibGljIGNtczogTkYuU2VydmljZUNhYmluZXRNZWRpY2FsLCBwcml2YXRlIHJvdXRlIDogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgX19sb2FkZXI6IE1hcHNBUElMb2FkZXIpIHt9XG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucm91dGUucGFyYW1zLmZvckVhY2goKHBhcmFtczogUGFyYW1zKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm51bWVybyA9IHBhcmFtc1tcIm51bWVyb1wiXTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY21zLmdldFBhdGllbnRCeUlkKHRoaXMubnVtZXJvKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGF0aWVudCA9IHJlcztcbiAgICAgICAgICAgIHRoaXMuX19sb2FkZXIubG9hZCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2VvY29kZXIgICA9IG5ldyBnb29nbGUubWFwcy5HZW9jb2RlcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5mb1dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXAgICAgICAgID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1hcFwiKSwge1xuICAgICAgICAgICAgICAgICAgICB6b29tOiAxMlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGxldCBwYXRpZW50QWRyZXNzZSA6IHN0cmluZyA9IHRoaXMucGF0aWVudC5hZHJlc3NlLnZpbGxlICsgXCIgXCJcbiAgICAgICAgICAgICAgICAgICAgKyB0aGlzLnBhdGllbnQuYWRyZXNzZS5udW1lcm8gKyBcIiBcIlxuICAgICAgICAgICAgICAgICAgICArIHRoaXMucGF0aWVudC5hZHJlc3NlLnJ1ZSArIFwiIFwiXG4gICAgICAgICAgICAgICAgICAgICsgdGhpcy5wYXRpZW50LmFkcmVzc2UuY29kZVBvc3RhbDtcbiAgICAgICAgICAgICAgICB0aGlzLmdlb2NvZGVyLmdlb2NvZGUoIHsgXCJhZGRyZXNzXCI6IHBhdGllbnRBZHJlc3NlfSwgKHJlc3VsdHMsIHN0YXR1cykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSBnb29nbGUubWFwcy5HZW9jb2RlclN0YXR1cy5PSykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiAgICA6IHJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwICAgICAgICAgOiB0aGlzLm1hcFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcC5zZXRDZW50ZXIocmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluZm9XaW5kb3cuc2V0Q29udGVudChyZXN1bHRzWzBdLmZvcm1hdHRlZF9hZGRyZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5mb1dpbmRvdy5vcGVuKHRoaXMubWFwLCB0aGlzLm1hcmtlcik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0gXCIsIHJlc3VsdHMsIFwiICYgU3RhdHVzIC0gXCIsIHN0YXR1cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRMaXR0ZXJhbFBhdGllbnRTZXhlKCkge1xuICAgICAgICBpZiAodGhpcy5wYXRpZW50KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXRpZW50LnNleGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJIb21tZVwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBhdGllbnQuc2V4ZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBcIkZlbW1lXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBcIj9cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=
