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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlcnZpY2VzL2NhYmluZXRNZWRpY2FsU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFLQSxXQUFZLFFBQVE7Z0JBQUUsaUNBQUMsQ0FBQTtnQkFBRSxpQ0FBQyxDQUFBO1lBQUEsQ0FBQyxFQUFmLFFBQVEsS0FBUixRQUFRLFFBQU87NENBQUE7WUEyQjNCO2dCQUNJLFlBQW9CLEtBQVc7b0JBQVgsVUFBSyxHQUFMLEtBQUssQ0FBTTtnQkFBRyxDQUFDLENBQUMscURBQXFEO2dCQUN6RixPQUFPLENBQUUsR0FBVztvQkFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBRSxDQUFDLEdBQWE7d0JBQ3ZELElBQUksT0FBTyxHQUFzQjs0QkFDN0IsVUFBVSxFQUFZLEVBQUU7NEJBQ3hCLG1CQUFtQixFQUFHLEVBQUU7eUJBQzNCLENBQUM7d0JBQ0YsSUFBSSxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQzt3QkFDN0IsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7d0JBQ3pELEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBZTs0QkFDbEUsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFDeEMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ3ZDLENBQUMsQ0FBQyxDQUFDO3dCQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFB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LENBQUMsQ0FBQyxDQUFDO3dCQUNILEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLE9BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsS0FBSyxNQUFNLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDNUYsTUFBTSxDQUFDLFNBQVMsQ0FBQzt3QkFDckIsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDSixNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssT0FBTSxNQUFNLENBQUMsS0FBSyxDQUFDLHFCQUFxQixLQUFLLE1BQU0sQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMzRixDQUFDO29CQUNMLENBQUMsQ0FBQzt5QkFDRyxLQUFLLENBQUMsQ0FBRSxHQUFHO3dCQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3JCLENBQUMsQ0FBQyxDQUFDO2dCQUNYLENBQUM7WUFFTCxDQUFDO1lBL0lEO2dCQUFDLGlCQUFVLEVBQUU7O3FDQUFBO1lBQ2IseURBOElDLENBQUEiLCJmaWxlIjoiU2VydmljZXMvY2FiaW5ldE1lZGljYWxTZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSAgICAgZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtIdHRwLCBSZXNwb25zZX0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlXCI7XHJcbmltcG9ydCB7TmdGb3JtfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcclxuXHJcbmV4cG9ydCBlbnVtIHNleGVFbnVtIHtNLCBGfVxyXG5leHBvcnQgaW50ZXJmYWNlIFBhdGllbnRJbnRlcmZhY2Uge1xyXG4gICAgcHJlbm9tICAgICAgICAgICAgICAgICAgOiBzdHJpbmc7XHJcbiAgICBub20gICAgICAgICAgICAgICAgICAgICA6IHN0cmluZztcclxuICAgIHNleGUgICAgICAgICAgICAgICAgICAgIDogc2V4ZUVudW07XHJcbiAgICBudW1lcm9TZWN1cml0ZVNvY2lhbGUgICA6IHN0cmluZztcclxuICAgIGFkcmVzc2UgICAgICAgICAgICAgICAgIDoge1xyXG4gICAgICAgIHZpbGxlICAgICAgIDogc3RyaW5nO1xyXG4gICAgICAgIGNvZGVQb3N0YWwgIDogbnVtYmVyO1xyXG4gICAgICAgIHJ1ZSAgICAgICAgIDogc3RyaW5nO1xyXG4gICAgICAgIG51bWVybyAgICAgIDogc3RyaW5nO1xyXG4gICAgICAgIGV0YWdlICAgICAgIDogc3RyaW5nO1xyXG4gICAgfTtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIEluZmlybWllckludGVyZmFjZSB7XHJcbiAgICBpZCAgICAgICAgICA6IHN0cmluZztcclxuICAgIHByZW5vbSAgICAgIDogc3RyaW5nO1xyXG4gICAgbm9tICAgICAgICAgOiBzdHJpbmc7XHJcbiAgICBwaG90byAgICAgICA6IHN0cmluZztcclxuICAgIHBhdGllbnRzICAgIDogUGF0aWVudEludGVyZmFjZVtdO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2FiaW5ldEludGVyZmFjZSB7XHJcbiAgICBpbmZpcm1pZXJzICAgICAgICAgIDogSW5maXJtaWVySW50ZXJmYWNlW107XHJcbiAgICBwYXRpZW50c05vbkFmZmVjdGVzIDogUGF0aWVudEludGVyZmFjZSAgW107XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFNlcnZpY2VDYWJpbmV0TWVkaWNhbCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwKSB7fSAvLyBMZSBzZXJ2aWNlIENhYmluZXRNZWRpY2FsIGEgYmVzb2luIGR1IHNlcnZpY2UgSHR0cFxyXG4gICAgZ2V0RGF0YSggdXJsOiBzdHJpbmcgKSA6IFByb21pc2U8Q2FiaW5ldEludGVyZmFjZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldCh1cmwpLnRvUHJvbWlzZSgpLnRoZW4oIChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjYWJpbmV0IDogQ2FiaW5ldEludGVyZmFjZSA9IHtcclxuICAgICAgICAgICAgICAgIGluZmlybWllcnMgICAgICAgICAgOiBbXSxcclxuICAgICAgICAgICAgICAgIHBhdGllbnRzTm9uQWZmZWN0ZXMgOiBbXVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBsZXQgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xyXG4gICAgICAgICAgICBsZXQgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhyZXMudGV4dCgpLCBcInRleHQveG1sXCIpO1xyXG4gICAgICAgICAgICBBcnJheS5mcm9tKGRvYy5xdWVyeVNlbGVjdG9yQWxsKFwiaW5maXJtaWVyXCIpKS5mb3JFYWNoKChlbDogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBpbmZpcm1pZXIgPSB0aGlzLnBhcnNlSW5maXJtaWVyKGVsKTtcclxuICAgICAgICAgICAgICAgIGNhYmluZXQuaW5maXJtaWVycy5wdXNoKGluZmlybWllcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBBcnJheS5mcm9tKGRvYy5xdWVyeVNlbGVjdG9yQWxsKFwicGF0aWVudFwiKSkuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBwYXRpZW50ID0gdGhpcy5wYXJzZVBhdGllbnQoZWwpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFwYXRpZW50LmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FiaW5ldC5wYXRpZW50c05vbkFmZmVjdGVzLnB1c2gocGF0aWVudC5wYXRpZW50KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZiA6IEluZmlybWllckludGVyZmFjZVtdID0gY2FiaW5ldC5pbmZpcm1pZXJzLmZpbHRlcigoZWwpID0+IHtyZXR1cm4gZWwuaWQgPT09IHBhdGllbnQuaWQ7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZi5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJJbCBuJ2V4aXN0ZSBhdWN1biBpbmZpcm1pZXIgZGUgY2V0IGlkLCBvcMOpcmF0aW9uIGltcG9zc2libGUuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5mLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZbMF0ucGF0aWVudHMucHVzaChwYXRpZW50LnBhdGllbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSWwgZXhpc3RlIHBsdXNpZXVycyBpbmZpcm1pZXJzIGRlIGNldCBpZCwgb3DDqXJhdGlvbiBpbXBvc3NpYmxlLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gY2FiaW5ldDtcclxuICAgICAgICB9KTsgLy8gRmluIGRlIHRoaXMuX2h0dHAuZ2V0XHJcbiAgICB9XHJcblxyXG4gICAgYWZmZWN0ZXJQYXRpZW50KGlkUGF0aWVudDogc3RyaW5nLCBpZEluZjogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdChcIi9hZmZlY3RhdGlvblwiLCB7aW5maXJtaWVyOiBpZEluZiwgcGF0aWVudDogaWRQYXRpZW50fSkudG9Qcm9taXNlKCkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTGUgcGF0aWVudCBhIMOpdMOpIGFmZmVjdMOpXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVbmUgZXJyZXVyIHMnZXN0IHByb2R1aXRlIDogXCIgKyByZXMuc3RhdHVzICsgXCIgOiBcIiArIHJlcy5zdGF0dXNUZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwYXJzZUluZmlybWllcihlbCA6IEVsZW1lbnQpIDogSW5maXJtaWVySW50ZXJmYWNlIHtcclxuICAgICAgICBsZXQgaWQgICAgICA9IGVsLmdldEF0dHJpYnV0ZShcImlkXCIpO1xyXG4gICAgICAgIGxldCBub20gICAgID0gZWwucXVlcnlTZWxlY3RvcihcIm5vbVwiKS50ZXh0Q29udGVudCAgICAgICB8fCBcIlwiO1xyXG4gICAgICAgIGxldCBwcmVub20gID0gZWwucXVlcnlTZWxlY3RvcihcInByw6lub21cIikudGV4dENvbnRlbnQgICAgfHwgXCJcIjtcclxuICAgICAgICBsZXQgcGhvdG8gICA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCJwaG90b1wiKS50ZXh0Q29udGVudCAgICAgfHwgXCJcIjtcclxuXHJcbiAgICAgICAgbGV0IGluZmlybWllciA6IEluZmlybWllckludGVyZmFjZSA9IDxJbmZpcm1pZXJJbnRlcmZhY2U+e1xyXG4gICAgICAgICAgICBpZCAgICAgIDogaWQsXHJcbiAgICAgICAgICAgIG5vbSAgICAgOiBub20sXHJcbiAgICAgICAgICAgIHByZW5vbSAgOiBwcmVub20sXHJcbiAgICAgICAgICAgIHBob3RvICAgOiBwaG90byxcclxuICAgICAgICAgICAgcGF0aWVudHM6IFtdXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gaW5maXJtaWVyO1xyXG4gICAgfVxyXG5cclxuICAgIHBhcnNlUGF0aWVudChlbCA6IEVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgaWQgICAgICAgICAgPSBlbC5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcclxuICAgICAgICBsZXQgbm9tICAgICAgICAgPSBlbC5xdWVyeVNlbGVjdG9yKFwibm9tXCIpICAgICAgICAgICAgICAgLnRleHRDb250ZW50IHx8IFwiXCI7XHJcbiAgICAgICAgbGV0IHByZW5vbSAgICAgID0gZWwucXVlcnlTZWxlY3RvcihcInByw6lub21cIikgICAgICAgICAgICAudGV4dENvbnRlbnQgfHwgXCJcIjtcclxuICAgICAgICBsZXQgc2V4ZSAgICAgICAgPSB0aGlzLmdldFNleGUoZWwucXVlcnlTZWxlY3RvcihcInNleGVcIikgLnRleHRDb250ZW50KXx8IFwiXCI7XHJcbiAgICAgICAgbGV0IG5haXNzYW5jZSAgID0gZWwucXVlcnlTZWxlY3RvcihcIm5haXNzYW5jZVwiKSAgICAgICAgIC50ZXh0Q29udGVudCB8fCBcIlwiO1xyXG4gICAgICAgIGxldCBudW3DqXJvICAgICAgPSBlbC5xdWVyeVNlbGVjdG9yKFwibnVtw6lyb1wiKSAgICAgICAgICAgIC50ZXh0Q29udGVudCB8fCBcIlwiO1xyXG4gICAgICAgIGxldCBhZHJlc3NlICAgICA9IHRoaXMucGFyc2VBZHJlc3NlKGVsLnF1ZXJ5U2VsZWN0b3IoXCJhZHJlc3NlXCIpKSAgICB8fCB7fTtcclxuICAgICAgICBsZXQgcGF0aWVudCA6IFBhdGllbnRJbnRlcmZhY2UgPSA8UGF0aWVudEludGVyZmFjZT57XHJcbiAgICAgICAgICAgIGlkICAgICAgICAgICAgICAgICAgICAgIDogaWQsXHJcbiAgICAgICAgICAgIG5vbSAgICAgICAgICAgICAgICAgICAgIDogbm9tLFxyXG4gICAgICAgICAgICBwcmVub20gICAgICAgICAgICAgICAgICA6IHByZW5vbSxcclxuICAgICAgICAgICAgc2V4ZSAgICAgICAgICAgICAgICAgICAgOiBzZXhlLFxyXG4gICAgICAgICAgICBuYWlzc2FuY2UgICAgICAgICAgICAgICA6IG5haXNzYW5jZSxcclxuICAgICAgICAgICAgbnVtZXJvU2VjdXJpdGVTb2NpYWxlICAgOiBudW3DqXJvLFxyXG4gICAgICAgICAgICBhZHJlc3NlICAgICAgICAgICAgICAgICA6IGFkcmVzc2UsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAoZWwucXVlcnlTZWxlY3RvcihcInZpc2l0ZVwiKS5nZXRBdHRyaWJ1dGUoXCJpbnRlcnZlbmFudFwiKSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBwYXRpZW50IDogcGF0aWVudCxcclxuICAgICAgICAgICAgICAgIGlkICAgICAgOiBlbC5xdWVyeVNlbGVjdG9yKFwidmlzaXRlXCIpLmdldEF0dHJpYnV0ZShcImludGVydmVuYW50XCIpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHBhdGllbnQgOiBwYXRpZW50LFxyXG4gICAgICAgICAgICAgICAgaWQgICAgICA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwYXJzZUFkcmVzc2UoZWwgOiBFbGVtZW50KSA6IGFueSB7XHJcbiAgICAgICAgbGV0IHZpbGxlICAgICAgID0gKGVsLnF1ZXJ5U2VsZWN0b3IoXCJ2aWxsZVwiKSkgICAgICAgPyBlbC5xdWVyeVNlbGVjdG9yKFwidmlsbGVcIikgICAgIC50ZXh0Q29udGVudCA6IFwiXCI7XHJcbiAgICAgICAgbGV0IGNvZGVQb3N0YWwgID0gKGVsLnF1ZXJ5U2VsZWN0b3IoXCJjb2RlUG9zdGFsXCIpKSAgPyBlbC5xdWVyeVNlbGVjdG9yKFwiY29kZVBvc3RhbFwiKS50ZXh0Q29udGVudCA6IFwiXCI7XHJcbiAgICAgICAgbGV0IHJ1ZSAgICAgICAgID0gKGVsLnF1ZXJ5U2VsZWN0b3IoXCJydWVcIikpICAgICAgICAgPyBlbC5xdWVyeVNlbGVjdG9yKFwicnVlXCIpICAgICAgIC50ZXh0Q29udGVudCA6IFwiXCI7XHJcbiAgICAgICAgbGV0IG51bWVybyAgICAgID0gKGVsLnF1ZXJ5U2VsZWN0b3IoXCJudW3DqXJvXCIpKSAgICAgID8gZWwucXVlcnlTZWxlY3RvcihcIm51bcOpcm9cIikgICAgLnRleHRDb250ZW50IDogXCJcIjtcclxuICAgICAgICBsZXQgZXRhZ2UgICAgICAgPSAoZWwucXVlcnlTZWxlY3RvcihcIsOpdGFnZVwiKSkgICAgICAgPyBlbC5xdWVyeVNlbGVjdG9yKFwiw6l0YWdlXCIpICAgICAudGV4dENvbnRlbnQgOiBudWxsO1xyXG5cclxuICAgICAgICBsZXQgYWRyZXNzZSA9IHtcclxuICAgICAgICAgICAgdmlsbGUgICAgICAgOiB2aWxsZSxcclxuICAgICAgICAgICAgY29kZVBvc3RhbCAgOiBjb2RlUG9zdGFsLFxyXG4gICAgICAgICAgICBydWUgICAgICAgICA6IHJ1ZSxcclxuICAgICAgICAgICAgbnVtZXJvICAgICAgOiBudW1lcm8sXHJcbiAgICAgICAgICAgIGV0YWdlICAgICAgIDogZXRhZ2VcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gYWRyZXNzZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTZXhlKHNleGUgOiBzdHJpbmcpIDogc2V4ZUVudW0ge1xyXG4gICAgICAgIGlmIChzZXhlID09PSBcIk1cIikge1xyXG4gICAgICAgICAgICByZXR1cm4gc2V4ZUVudW0uTTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNleGUgPT09IFwiRlwiKVxyXG4gICAgICAgICAgICByZXR1cm4gc2V4ZUVudW0uRjtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBBam91dGVyUGF0aWVudCAoZjogTmdGb3JtKSA6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgbGV0IGNvbnRyb2xzID0gZi52YWx1ZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KCBcIi4vYWRkUGF0aWVudFwiLCBjb250cm9scyApLnRvUHJvbWlzZSgpLnRoZW4oICgpID0+IGNvbnRyb2xzICk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGF0aWVudEJ5SWQobnVtZXJvOiBzdHJpbmcpOiBQcm9taXNlPFBhdGllbnRJbnRlcmZhY2U+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXREYXRhKFwiL2RhdGEvY2FiaW5ldEluZmlybWllci54bWxcIikudGhlbigoIHJlcyApID0+IHtcclxuICAgICAgICAgICAgbGV0IGNhYmluZXQgICAgIDogQ2FiaW5ldEludGVyZmFjZSA9IHJlcztcclxuICAgICAgICAgICAgbGV0IHBhdGllbnRzICAgIDogUGF0aWVudEludGVyZmFjZVtdID0gY2FiaW5ldC5wYXRpZW50c05vbkFmZmVjdGVzO1xyXG5cclxuICAgICAgICAgICAgY2FiaW5ldC5pbmZpcm1pZXJzLmZvckVhY2goKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwYXRpZW50cyA9IHBhdGllbnRzLmNvbmNhdCh2YWx1ZS5wYXRpZW50cyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAocGF0aWVudHMuZmlsdGVyKCh2YWx1ZSkgPT4ge3JldHVybiB2YWx1ZS5udW1lcm9TZWN1cml0ZVNvY2lhbGUgPT09IG51bWVybzt9KS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGF0aWVudHMuZmlsdGVyKCh2YWx1ZSkgPT4ge3JldHVybiB2YWx1ZS5udW1lcm9TZWN1cml0ZVNvY2lhbGUgPT09IG51bWVybzt9KVswXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoIGVyciApID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9
