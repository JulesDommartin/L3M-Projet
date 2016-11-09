System.register(["@Services/cabinetMedicalService", "@angular/core", "@angular/router"], function(exports_1, context_1) {
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
    var NF, core_1, router_1;
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
            }],
        execute: function() {
            htmlTemplate = `
    <div *ngIf="initDone" class="patient-non-affecte">
        <span><b>Nom : </b> {{patient.nom}}</span>
        <span><b>Prénom : </b>{{patient.prenom}}</span>
        <span><b>Numéro de sécu : </b>{{patient.numeroSecuriteSociale}}</span>
    </div>
    <a [routerLink]="['/secretaire']">Retour</a>
`;
            ComposantOnlyPatient = class ComposantOnlyPatient {
                constructor(cms, route) {
                    this.cms = cms;
                    this.route = route;
                    this.initDone = false;
                }
                ngOnInit() {
                    this.route.params.forEach((params) => {
                        this.numero = params["numero"];
                        console.log(params);
                    });
                    this.cms.getPatientById(this.numero).then((res) => {
                        this.patient = res;
                        console.log(res);
                        this.initDone = true;
                    });
                }
            };
            ComposantOnlyPatient = __decorate([
                core_1.Component({
                    template: htmlTemplate
                }), 
                __metadata('design:paramtypes', [NF.ServiceCabinetMedical, router_1.ActivatedRoute])
            ], ComposantOnlyPatient);
            exports_1("ComposantOnlyPatient", ComposantOnlyPatient);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvQ29tcG9zYW50T25seVBhdGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztRQUtNLFlBQVk7Ozs7Ozs7Ozs7Ozs7WUFBWixZQUFZLEdBQUc7Ozs7Ozs7Q0FPcEIsQ0FBQztZQUlGO2dCQUlJLFlBQW1CLEdBQTZCLEVBQVUsS0FBc0I7b0JBQTdELFFBQUcsR0FBSCxHQUFHLENBQTBCO29CQUFVLFVBQUssR0FBTCxLQUFLLENBQWlCO29CQURoRixhQUFRLEdBQVksS0FBSyxDQUFDO2dCQUN5RCxDQUFDO2dCQUNwRixRQUFRO29CQUNKLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQWM7d0JBQ3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN4QixDQUFDLENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRzt3QkFDMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7d0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO29CQUN6QixDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO1lBQ0wsQ0FBQztZQW5CRDtnQkFBQyxnQkFBUyxDQUFDO29CQUNQLFFBQVEsRUFBRyxZQUFZO2lCQUMxQixDQUFDO29EQUs2QixxQkFBcUI7b0NBTGxEO1lBQ0YsdURBZ0JDLENBQUEiLCJmaWxlIjoiQ29tcG9uZW50cy9Db21wb3NhbnRPbmx5UGF0aWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIE5GIGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XG5pbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQge1BhdGllbnRJbnRlcmZhY2V9IGZyb20gXCJAU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlXCI7XG5cbmNvbnN0IGh0bWxUZW1wbGF0ZSA9IGBcbiAgICA8ZGl2ICpuZ0lmPVwiaW5pdERvbmVcIiBjbGFzcz1cInBhdGllbnQtbm9uLWFmZmVjdGVcIj5cbiAgICAgICAgPHNwYW4+PGI+Tm9tIDogPC9iPiB7e3BhdGllbnQubm9tfX08L3NwYW4+XG4gICAgICAgIDxzcGFuPjxiPlByw6lub20gOiA8L2I+e3twYXRpZW50LnByZW5vbX19PC9zcGFuPlxuICAgICAgICA8c3Bhbj48Yj5OdW3DqXJvIGRlIHPDqWN1IDogPC9iPnt7cGF0aWVudC5udW1lcm9TZWN1cml0ZVNvY2lhbGV9fTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8YSBbcm91dGVyTGlua109XCJbJy9zZWNyZXRhaXJlJ11cIj5SZXRvdXI8L2E+XG5gO1xuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVcdDogaHRtbFRlbXBsYXRlXG59KVxuZXhwb3J0IGNsYXNzIENvbXBvc2FudE9ubHlQYXRpZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBudW1lcm8gIDogc3RyaW5nO1xuICAgIHBhdGllbnQgOiBQYXRpZW50SW50ZXJmYWNlO1xuICAgIGluaXREb25lOiBib29sZWFuID0gZmFsc2U7XG4gICAgY29uc3RydWN0b3IocHVibGljIGNtczogTkYuU2VydmljZUNhYmluZXRNZWRpY2FsLCBwcml2YXRlIHJvdXRlIDogQWN0aXZhdGVkUm91dGUpIHt9XG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucm91dGUucGFyYW1zLmZvckVhY2goKHBhcmFtczogUGFyYW1zKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm51bWVybyA9IHBhcmFtc1tcIm51bWVyb1wiXTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhcmFtcyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNtcy5nZXRQYXRpZW50QnlJZCh0aGlzLm51bWVybykudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhdGllbnQgPSByZXM7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgICAgdGhpcy5pbml0RG9uZSA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=
