System.register(["@angular/core", "@angular/http", "rxjs/add/operator/toPromise"], function(exports_1, context_1) {
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
    var core_1, http_1;
    var sexeEnum, ServiceCabinetMedical;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            (function (sexeEnum) {
                sexeEnum[sexeEnum["M"] = 0] = "M";
                sexeEnum[sexeEnum["F"] = 1] = "F";
            })(sexeEnum || (sexeEnum = {}));
            exports_1("sexeEnum", sexeEnum);
            ServiceCabinetMedical = class ServiceCabinetMedical {
                constructor(_http) {
                    this._http = _http;
                } // Le service CabinetMedical a besoin du service Http
                getData(url) {
                    return this._http.get(url).toPromise().then((res) => {
                        let cabinet = {
                            infirmiers: [],
                            patientsNonAffectes: []
                        };
                        let parser = new DOMParser();
                        let doc = parser.parseFromString(res.text(), "text/xml");
                        Array.from(doc.querySelectorAll("infirmier")).forEach((el) => {
                            let infirmier = this.parseInfirmier(el);
                            cabinet.infirmiers.push(infirmier);
                        });
                        Array.from(doc.querySelectorAll("patient")).forEach((el) => {
                            let patient = this.parsePatient(el);
                            if (!patient.id) {
                                cabinet.patientsNonAffectes.push(patient.patient);
                            }
                            else {
                                let inf = cabinet.infirmiers.filter((el) => { return el.id === patient.id; });
                                if (inf.length === 0) {
                                    console.log("Il n'existe aucun infirmier de cet id, opération impossible.");
                                }
                                else if (inf.length === 1) {
                                    inf[0].patients.push(patient.patient);
                                }
                                else {
                                    console.log("Il existe plusieurs infirmiers de cet id, opération impossible.");
                                }
                            }
                        });
                        return cabinet;
                    }); // Fin de this._http.get
                }
                affecterPatient(idPatient, idInf) {
                    return this._http.post("/affectation", { infirmier: idInf, patient: idPatient }).toPromise().then((res) => {
                        if (res.status === 200) {
                            console.log("Le patient a été affecté");
                        }
                        else {
                            console.log("Une erreur s'est produite : " + res.status + " : " + res.statusText);
                        }
                    })
                        .catch((err) => {
                        console.log(err);
                    });
                }
                parseInfirmier(el) {
                    let id = el.getAttribute("id");
                    let nom = el.querySelector("nom").textContent || "";
                    let prenom = el.querySelector("prénom").textContent || "";
                    let photo = el.querySelector("photo").textContent || "";
                    let infirmier = {
                        id: id,
                        nom: nom,
                        prenom: prenom,
                        photo: photo,
                        patients: []
                    };
                    return infirmier;
                }
                parsePatient(el) {
                    let id = el.getAttribute("id");
                    let nom = el.querySelector("nom").textContent || "";
                    let prenom = el.querySelector("prénom").textContent || "";
                    let sexe = this.getSexe(el.querySelector("sexe").textContent) || "";
                    let naissance = el.querySelector("naissance").textContent || "";
                    let numéro = el.querySelector("numéro").textContent || "";
                    let adresse = this.parseAdresse(el.querySelector("adresse")) || {};
                    let patient = {
                        id: id,
                        nom: nom,
                        prenom: prenom,
                        sexe: sexe,
                        naissance: naissance,
                        numeroSecuriteSociale: numéro,
                        adresse: adresse,
                    };
                    if (el.querySelector("visite").getAttribute("intervenant") !== undefined) {
                        return {
                            patient: patient,
                            id: el.querySelector("visite").getAttribute("intervenant")
                        };
                    }
                    else {
                        return {
                            patient: patient,
                            id: undefined
                        };
                    }
                }
                parseAdresse(el) {
                    let ville = (el.querySelector("ville")) ? el.querySelector("ville").textContent : "";
                    let codePostal = (el.querySelector("codePostal")) ? el.querySelector("codePostal").textContent : "";
                    let rue = (el.querySelector("rue")) ? el.querySelector("rue").textContent : "";
                    let numero = (el.querySelector("numéro")) ? el.querySelector("numéro").textContent : "";
                    let etage = (el.querySelector("étage")) ? el.querySelector("étage").textContent : null;
                    let adresse = {
                        ville: ville,
                        codePostal: codePostal,
                        rue: rue,
                        numero: numero,
                        etage: etage
                    };
                    return adresse;
                }
                getSexe(sexe) {
                    if (sexe === "M") {
                        return sexeEnum.M;
                    }
                    else if (sexe === "F")
                        return sexeEnum.F;
                    return null;
                }
                AjouterPatient(f) {
                    let controls = f.value;
                    return this._http.post("./addPatient", controls).toPromise().then(() => controls);
                }
                getPatientById(numero) {
                    return this.getData("/data/cabinetInfirmier.xml").then((res) => {
                        let cabinet = res;
                        let patients = cabinet.patientsNonAffectes;
                        cabinet.infirmiers.forEach((value) => {
                            patients = patients.concat(value.patients);
                        });
                        if (patients.filter((value) => { return value.numeroSecuriteSociale === numero; }).length === 0) {
                            return undefined;
                        }
                        else {
                            return patients.filter((value) => { return value.numeroSecuriteSociale === numero; })[0];
                        }
                    })
                        .catch((err) => {
                        console.log(err);
                    });
                }
            };
            ServiceCabinetMedical = __decorate([
                core_1.Injectable(), 
                __metadata('design:paramtypes', [http_1.Http])
            ], ServiceCabinetMedical);
            exports_1("ServiceCabinetMedical", ServiceCabinetMedical);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlcnZpY2VzL2NhYmluZXRNZWRpY2FsU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFLQSxXQUFZLFFBQVE7Z0JBQUUsaUNBQUMsQ0FBQTtnQkFBRSxpQ0FBQyxDQUFBO1lBQUEsQ0FBQyxFQUFmLFFBQVEsS0FBUixRQUFRLFFBQU87NENBQUE7WUEyQjNCO2dCQUNJLFlBQW9CLEtBQVc7b0JBQVgsVUFBSyxHQUFMLEtBQUssQ0FBTTtnQkFBRyxDQUFDLENBQUMscURBQXFEO2dCQUN6RixPQUFPLENBQUUsR0FBVztvQkFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBRSxDQUFDLEdBQWE7d0JBQ3ZELElBQUksT0FBTyxHQUFzQjs0QkFDN0IsVUFBVSxFQUFZLEVBQUU7NEJBQ3hCLG1CQUFtQixFQUFHLEVBQUU7eUJBQzNCLENBQUM7d0JBQ0YsSUFBSSxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQzt3QkFDN0IsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7d0JBQ3pELEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBZTs0QkFDbEUsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFDeEMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ3ZDLENBQUMsQ0FBQyxDQUFDO3dCQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFB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LENBQUMsQ0FBQyxDQUFDO3dCQUNILEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLE9BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsS0FBSyxNQUFNLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDNUYsTUFBTSxDQUFDLFNBQVMsQ0FBQzt3QkFDckIsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDSixNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssT0FBTSxNQUFNLENBQUMsS0FBSyxDQUFDLHFCQUFxQixLQUFLLE1BQU0sQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMzRixDQUFDO29CQUNMLENBQUMsQ0FBQzt5QkFDRyxLQUFLLENBQUMsQ0FBRSxHQUFHO3dCQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3JCLENBQUMsQ0FBQyxDQUFDO2dCQUNYLENBQUM7WUFFTCxDQUFDO1lBL0lEO2dCQUFDLGlCQUFVLEVBQUU7O3FDQUFBO1lBQ2IseURBOElDLENBQUEiLCJmaWxlIjoiU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSAgICAgZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7SHR0cCwgUmVzcG9uc2V9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci90b1Byb21pc2VcIjtcbmltcG9ydCB7TmdGb3JtfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcblxuZXhwb3J0IGVudW0gc2V4ZUVudW0ge00sIEZ9XG5leHBvcnQgaW50ZXJmYWNlIFBhdGllbnRJbnRlcmZhY2Uge1xuICAgIHByZW5vbSAgICAgICAgICAgICAgICAgIDogc3RyaW5nO1xuICAgIG5vbSAgICAgICAgICAgICAgICAgICAgIDogc3RyaW5nO1xuICAgIHNleGUgICAgICAgICAgICAgICAgICAgIDogc2V4ZUVudW07XG4gICAgbnVtZXJvU2VjdXJpdGVTb2NpYWxlICAgOiBzdHJpbmc7XG4gICAgYWRyZXNzZSAgICAgICAgICAgICAgICAgOiB7XG4gICAgICAgIHZpbGxlICAgICAgIDogc3RyaW5nO1xuICAgICAgICBjb2RlUG9zdGFsICA6IG51bWJlcjtcbiAgICAgICAgcnVlICAgICAgICAgOiBzdHJpbmc7XG4gICAgICAgIG51bWVybyAgICAgIDogc3RyaW5nO1xuICAgICAgICBldGFnZSAgICAgICA6IHN0cmluZztcbiAgICB9O1xufVxuZXhwb3J0IGludGVyZmFjZSBJbmZpcm1pZXJJbnRlcmZhY2Uge1xuICAgIGlkICAgICAgICAgIDogc3RyaW5nO1xuICAgIHByZW5vbSAgICAgIDogc3RyaW5nO1xuICAgIG5vbSAgICAgICAgIDogc3RyaW5nO1xuICAgIHBob3RvICAgICAgIDogc3RyaW5nO1xuICAgIHBhdGllbnRzICAgIDogUGF0aWVudEludGVyZmFjZVtdO1xufVxuZXhwb3J0IGludGVyZmFjZSBDYWJpbmV0SW50ZXJmYWNlIHtcbiAgICBpbmZpcm1pZXJzICAgICAgICAgIDogSW5maXJtaWVySW50ZXJmYWNlW107XG4gICAgcGF0aWVudHNOb25BZmZlY3RlcyA6IFBhdGllbnRJbnRlcmZhY2UgIFtdO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VydmljZUNhYmluZXRNZWRpY2FsIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwKSB7fSAvLyBMZSBzZXJ2aWNlIENhYmluZXRNZWRpY2FsIGEgYmVzb2luIGR1IHNlcnZpY2UgSHR0cFxuICAgIGdldERhdGEoIHVybDogc3RyaW5nICkgOiBQcm9taXNlPENhYmluZXRJbnRlcmZhY2U+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHVybCkudG9Qcm9taXNlKCkudGhlbiggKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGxldCBjYWJpbmV0IDogQ2FiaW5ldEludGVyZmFjZSA9IHtcbiAgICAgICAgICAgICAgICBpbmZpcm1pZXJzICAgICAgICAgIDogW10sXG4gICAgICAgICAgICAgICAgcGF0aWVudHNOb25BZmZlY3RlcyA6IFtdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGV0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcbiAgICAgICAgICAgIGxldCBkb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKHJlcy50ZXh0KCksIFwidGV4dC94bWxcIik7XG4gICAgICAgICAgICBBcnJheS5mcm9tKGRvYy5xdWVyeVNlbGVjdG9yQWxsKFwiaW5maXJtaWVyXCIpKS5mb3JFYWNoKChlbDogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgaW5maXJtaWVyID0gdGhpcy5wYXJzZUluZmlybWllcihlbCk7XG4gICAgICAgICAgICAgICAgY2FiaW5ldC5pbmZpcm1pZXJzLnB1c2goaW5maXJtaWVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgQXJyYXkuZnJvbShkb2MucXVlcnlTZWxlY3RvckFsbChcInBhdGllbnRcIikpLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHBhdGllbnQgPSB0aGlzLnBhcnNlUGF0aWVudChlbCk7XG4gICAgICAgICAgICAgICAgaWYgKCFwYXRpZW50LmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhYmluZXQucGF0aWVudHNOb25BZmZlY3Rlcy5wdXNoKHBhdGllbnQucGF0aWVudCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZiA6IEluZmlybWllckludGVyZmFjZVtdID0gY2FiaW5ldC5pbmZpcm1pZXJzLmZpbHRlcigoZWwpID0+IHtyZXR1cm4gZWwuaWQgPT09IHBhdGllbnQuaWQ7fSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmYubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIklsIG4nZXhpc3RlIGF1Y3VuIGluZmlybWllciBkZSBjZXQgaWQsIG9ww6lyYXRpb24gaW1wb3NzaWJsZS5cIik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5mLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5mWzBdLnBhdGllbnRzLnB1c2gocGF0aWVudC5wYXRpZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSWwgZXhpc3RlIHBsdXNpZXVycyBpbmZpcm1pZXJzIGRlIGNldCBpZCwgb3DDqXJhdGlvbiBpbXBvc3NpYmxlLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGNhYmluZXQ7XG4gICAgICAgIH0pOyAvLyBGaW4gZGUgdGhpcy5faHR0cC5nZXRcbiAgICB9XG5cbiAgICBhZmZlY3RlclBhdGllbnQoaWRQYXRpZW50OiBzdHJpbmcsIGlkSW5mOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdChcIi9hZmZlY3RhdGlvblwiLCB7aW5maXJtaWVyOiBpZEluZiwgcGF0aWVudDogaWRQYXRpZW50fSkudG9Qcm9taXNlKCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJMZSBwYXRpZW50IGEgw6l0w6kgYWZmZWN0w6lcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVW5lIGVycmV1ciBzJ2VzdCBwcm9kdWl0ZSA6IFwiICsgcmVzLnN0YXR1cyArIFwiIDogXCIgKyByZXMuc3RhdHVzVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwYXJzZUluZmlybWllcihlbCA6IEVsZW1lbnQpIDogSW5maXJtaWVySW50ZXJmYWNlIHtcbiAgICAgICAgbGV0IGlkICAgICAgPSBlbC5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgICAgICAgbGV0IG5vbSAgICAgPSBlbC5xdWVyeVNlbGVjdG9yKFwibm9tXCIpLnRleHRDb250ZW50ICAgICAgIHx8IFwiXCI7XG4gICAgICAgIGxldCBwcmVub20gID0gZWwucXVlcnlTZWxlY3RvcihcInByw6lub21cIikudGV4dENvbnRlbnQgICAgfHwgXCJcIjtcbiAgICAgICAgbGV0IHBob3RvICAgPSBlbC5xdWVyeVNlbGVjdG9yKFwicGhvdG9cIikudGV4dENvbnRlbnQgICAgIHx8IFwiXCI7XG5cbiAgICAgICAgbGV0IGluZmlybWllciA6IEluZmlybWllckludGVyZmFjZSA9IDxJbmZpcm1pZXJJbnRlcmZhY2U+e1xuICAgICAgICAgICAgaWQgICAgICA6IGlkLFxuICAgICAgICAgICAgbm9tICAgICA6IG5vbSxcbiAgICAgICAgICAgIHByZW5vbSAgOiBwcmVub20sXG4gICAgICAgICAgICBwaG90byAgIDogcGhvdG8sXG4gICAgICAgICAgICBwYXRpZW50czogW11cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGluZmlybWllcjtcbiAgICB9XG5cbiAgICBwYXJzZVBhdGllbnQoZWwgOiBFbGVtZW50KSB7XG4gICAgICAgIGxldCBpZCAgICAgICAgICA9IGVsLmdldEF0dHJpYnV0ZShcImlkXCIpO1xuICAgICAgICBsZXQgbm9tICAgICAgICAgPSBlbC5xdWVyeVNlbGVjdG9yKFwibm9tXCIpICAgICAgICAgICAgICAgLnRleHRDb250ZW50IHx8IFwiXCI7XG4gICAgICAgIGxldCBwcmVub20gICAgICA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCJwcsOpbm9tXCIpICAgICAgICAgICAgLnRleHRDb250ZW50IHx8IFwiXCI7XG4gICAgICAgIGxldCBzZXhlICAgICAgICA9IHRoaXMuZ2V0U2V4ZShlbC5xdWVyeVNlbGVjdG9yKFwic2V4ZVwiKSAudGV4dENvbnRlbnQpfHwgXCJcIjtcbiAgICAgICAgbGV0IG5haXNzYW5jZSAgID0gZWwucXVlcnlTZWxlY3RvcihcIm5haXNzYW5jZVwiKSAgICAgICAgIC50ZXh0Q29udGVudCB8fCBcIlwiO1xuICAgICAgICBsZXQgbnVtw6lybyAgICAgID0gZWwucXVlcnlTZWxlY3RvcihcIm51bcOpcm9cIikgICAgICAgICAgICAudGV4dENvbnRlbnQgfHwgXCJcIjtcbiAgICAgICAgbGV0IGFkcmVzc2UgICAgID0gdGhpcy5wYXJzZUFkcmVzc2UoZWwucXVlcnlTZWxlY3RvcihcImFkcmVzc2VcIikpICAgIHx8IHt9O1xuICAgICAgICBsZXQgcGF0aWVudCA6IFBhdGllbnRJbnRlcmZhY2UgPSA8UGF0aWVudEludGVyZmFjZT57XG4gICAgICAgICAgICBpZCAgICAgICAgICAgICAgICAgICAgICA6IGlkLFxuICAgICAgICAgICAgbm9tICAgICAgICAgICAgICAgICAgICAgOiBub20sXG4gICAgICAgICAgICBwcmVub20gICAgICAgICAgICAgICAgICA6IHByZW5vbSxcbiAgICAgICAgICAgIHNleGUgICAgICAgICAgICAgICAgICAgIDogc2V4ZSxcbiAgICAgICAgICAgIG5haXNzYW5jZSAgICAgICAgICAgICAgIDogbmFpc3NhbmNlLFxuICAgICAgICAgICAgbnVtZXJvU2VjdXJpdGVTb2NpYWxlICAgOiBudW3DqXJvLFxuICAgICAgICAgICAgYWRyZXNzZSAgICAgICAgICAgICAgICAgOiBhZHJlc3NlLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoZWwucXVlcnlTZWxlY3RvcihcInZpc2l0ZVwiKS5nZXRBdHRyaWJ1dGUoXCJpbnRlcnZlbmFudFwiKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHBhdGllbnQgOiBwYXRpZW50LFxuICAgICAgICAgICAgICAgIGlkICAgICAgOiBlbC5xdWVyeVNlbGVjdG9yKFwidmlzaXRlXCIpLmdldEF0dHJpYnV0ZShcImludGVydmVuYW50XCIpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBwYXRpZW50IDogcGF0aWVudCxcbiAgICAgICAgICAgICAgICBpZCAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGFyc2VBZHJlc3NlKGVsIDogRWxlbWVudCkgOiBhbnkge1xuICAgICAgICBsZXQgdmlsbGUgICAgICAgPSAoZWwucXVlcnlTZWxlY3RvcihcInZpbGxlXCIpKSAgICAgICA/IGVsLnF1ZXJ5U2VsZWN0b3IoXCJ2aWxsZVwiKSAgICAgLnRleHRDb250ZW50IDogXCJcIjtcbiAgICAgICAgbGV0IGNvZGVQb3N0YWwgID0gKGVsLnF1ZXJ5U2VsZWN0b3IoXCJjb2RlUG9zdGFsXCIpKSAgPyBlbC5xdWVyeVNlbGVjdG9yKFwiY29kZVBvc3RhbFwiKS50ZXh0Q29udGVudCA6IFwiXCI7XG4gICAgICAgIGxldCBydWUgICAgICAgICA9IChlbC5xdWVyeVNlbGVjdG9yKFwicnVlXCIpKSAgICAgICAgID8gZWwucXVlcnlTZWxlY3RvcihcInJ1ZVwiKSAgICAgICAudGV4dENvbnRlbnQgOiBcIlwiO1xuICAgICAgICBsZXQgbnVtZXJvICAgICAgPSAoZWwucXVlcnlTZWxlY3RvcihcIm51bcOpcm9cIikpICAgICAgPyBlbC5xdWVyeVNlbGVjdG9yKFwibnVtw6lyb1wiKSAgICAudGV4dENvbnRlbnQgOiBcIlwiO1xuICAgICAgICBsZXQgZXRhZ2UgICAgICAgPSAoZWwucXVlcnlTZWxlY3RvcihcIsOpdGFnZVwiKSkgICAgICAgPyBlbC5xdWVyeVNlbGVjdG9yKFwiw6l0YWdlXCIpICAgICAudGV4dENvbnRlbnQgOiBudWxsO1xuXG4gICAgICAgIGxldCBhZHJlc3NlID0ge1xuICAgICAgICAgICAgdmlsbGUgICAgICAgOiB2aWxsZSxcbiAgICAgICAgICAgIGNvZGVQb3N0YWwgIDogY29kZVBvc3RhbCxcbiAgICAgICAgICAgIHJ1ZSAgICAgICAgIDogcnVlLFxuICAgICAgICAgICAgbnVtZXJvICAgICAgOiBudW1lcm8sXG4gICAgICAgICAgICBldGFnZSAgICAgICA6IGV0YWdlXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGFkcmVzc2U7XG4gICAgfVxuXG4gICAgZ2V0U2V4ZShzZXhlIDogc3RyaW5nKSA6IHNleGVFbnVtIHtcbiAgICAgICAgaWYgKHNleGUgPT09IFwiTVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gc2V4ZUVudW0uTTtcbiAgICAgICAgfSBlbHNlIGlmIChzZXhlID09PSBcIkZcIilcbiAgICAgICAgICAgIHJldHVybiBzZXhlRW51bS5GO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBBam91dGVyUGF0aWVudCAoZjogTmdGb3JtKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGxldCBjb250cm9scyA9IGYudmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLnBvc3QoIFwiLi9hZGRQYXRpZW50XCIsIGNvbnRyb2xzICkudG9Qcm9taXNlKCkudGhlbiggKCkgPT4gY29udHJvbHMgKTtcbiAgICB9XG5cbiAgICBnZXRQYXRpZW50QnlJZChudW1lcm86IHN0cmluZyk6IFByb21pc2U8UGF0aWVudEludGVyZmFjZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREYXRhKFwiL2RhdGEvY2FiaW5ldEluZmlybWllci54bWxcIikudGhlbigoIHJlcyApID0+IHtcbiAgICAgICAgICAgIGxldCBjYWJpbmV0ICAgICA6IENhYmluZXRJbnRlcmZhY2UgPSByZXM7XG4gICAgICAgICAgICBsZXQgcGF0aWVudHMgICAgOiBQYXRpZW50SW50ZXJmYWNlW10gPSBjYWJpbmV0LnBhdGllbnRzTm9uQWZmZWN0ZXM7XG5cbiAgICAgICAgICAgIGNhYmluZXQuaW5maXJtaWVycy5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHBhdGllbnRzID0gcGF0aWVudHMuY29uY2F0KHZhbHVlLnBhdGllbnRzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHBhdGllbnRzLmZpbHRlcigodmFsdWUpID0+IHtyZXR1cm4gdmFsdWUubnVtZXJvU2VjdXJpdGVTb2NpYWxlID09PSBudW1lcm87fSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhdGllbnRzLmZpbHRlcigodmFsdWUpID0+IHtyZXR1cm4gdmFsdWUubnVtZXJvU2VjdXJpdGVTb2NpYWxlID09PSBudW1lcm87fSlbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKCBlcnIgKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
