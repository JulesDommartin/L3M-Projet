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
                    let ville = el.querySelector("ville") || "";
                    let codePostal = el.querySelector("codePostal") || "";
                    let rue = el.querySelector("rue") || "";
                    let numero = el.querySelector("numero") || "";
                    let etage = el.querySelector("etage") || "";
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
                    let controls = f.form.controls;
                    let body = {};
                    for (let v in controls) {
                        body[v] = controls[v].value;
                    }
                    return this._http.post("./addPatient", body).toPromise().then(() => body);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlcnZpY2VzL2NhYmluZXRNZWRpY2FsU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFLQSxXQUFZLFFBQVE7Z0JBQUUsaUNBQUMsQ0FBQTtnQkFBRSxpQ0FBQyxDQUFBO1lBQUEsQ0FBQyxFQUFmLFFBQVEsS0FBUixRQUFRLFFBQU87NENBQUE7WUEyQjNCO2dCQUNJLFlBQW9CLEtBQVc7b0JBQVgsVUFBSyxHQUFMLEtBQUssQ0FBTTtnQkFBRyxDQUFDLENBQUMscURBQXFEO2dCQUN6RixPQUFPLENBQUUsR0FBVztvQkFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBRSxDQUFDLEdBQWE7d0JBQ3ZELElBQUksT0FBTyxHQUFzQjs0QkFDN0IsVUFBVSxFQUFZLEVBQUU7NEJBQ3hCLG1CQUFtQixFQUFHLEVBQUU7eUJBQzNCLENBQUM7d0JBQ0YsSUFBSSxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQzt3QkFDN0IsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7d0JBQ3pELEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBZTs0QkFDbEUsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFDeEMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ3ZDLENBQUMsQ0FBQyxDQUFDO3dCQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFB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LEtBQUssTUFBTSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzVGLE1BQU0sQ0FBQyxTQUFTLENBQUM7d0JBQ3JCLENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ0osTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLE9BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsS0FBSyxNQUFNLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDM0YsQ0FBQztvQkFDTCxDQUFDLENBQUM7eUJBQ0csS0FBSyxDQUFDLENBQUUsR0FBRzt3QkFDUixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNyQixDQUFDLENBQUMsQ0FBQztnQkFDWCxDQUFDO1lBRUwsQ0FBQztZQW5KRDtnQkFBQyxpQkFBVSxFQUFFOztxQ0FBQTtZQUNiLHlEQWtKQyxDQUFBIiwiZmlsZSI6IlNlcnZpY2VzL2NhYmluZXRNZWRpY2FsU2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gICAgIGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0h0dHAsIFJlc3BvbnNlfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlXCI7XG5pbXBvcnQge05nRm9ybX0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5cbmV4cG9ydCBlbnVtIHNleGVFbnVtIHtNLCBGfVxuZXhwb3J0IGludGVyZmFjZSBQYXRpZW50SW50ZXJmYWNlIHtcbiAgICBwcmVub20gICAgICAgICAgICAgICAgICA6IHN0cmluZztcbiAgICBub20gICAgICAgICAgICAgICAgICAgICA6IHN0cmluZztcbiAgICBzZXhlICAgICAgICAgICAgICAgICAgICA6IHNleGVFbnVtO1xuICAgIG51bWVyb1NlY3VyaXRlU29jaWFsZSAgIDogc3RyaW5nO1xuICAgIGFkcmVzc2UgICAgICAgICAgICAgICAgIDoge1xuICAgICAgICB2aWxsZSAgICAgICA6IHN0cmluZztcbiAgICAgICAgY29kZVBvc3RhbCAgOiBudW1iZXI7XG4gICAgICAgIHJ1ZSAgICAgICAgIDogc3RyaW5nO1xuICAgICAgICBudW1lcm8gICAgICA6IHN0cmluZztcbiAgICAgICAgZXRhZ2UgICAgICAgOiBzdHJpbmc7XG4gICAgfTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSW5maXJtaWVySW50ZXJmYWNlIHtcbiAgICBpZCAgICAgICAgICA6IHN0cmluZztcbiAgICBwcmVub20gICAgICA6IHN0cmluZztcbiAgICBub20gICAgICAgICA6IHN0cmluZztcbiAgICBwaG90byAgICAgICA6IHN0cmluZztcbiAgICBwYXRpZW50cyAgICA6IFBhdGllbnRJbnRlcmZhY2VbXTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgQ2FiaW5ldEludGVyZmFjZSB7XG4gICAgaW5maXJtaWVycyAgICAgICAgICA6IEluZmlybWllckludGVyZmFjZVtdO1xuICAgIHBhdGllbnRzTm9uQWZmZWN0ZXMgOiBQYXRpZW50SW50ZXJmYWNlICBbXTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZpY2VDYWJpbmV0TWVkaWNhbCB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDogSHR0cCkge30gLy8gTGUgc2VydmljZSBDYWJpbmV0TWVkaWNhbCBhIGJlc29pbiBkdSBzZXJ2aWNlIEh0dHBcbiAgICBnZXREYXRhKCB1cmw6IHN0cmluZyApIDogUHJvbWlzZTxDYWJpbmV0SW50ZXJmYWNlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldCh1cmwpLnRvUHJvbWlzZSgpLnRoZW4oIChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBsZXQgY2FiaW5ldCA6IENhYmluZXRJbnRlcmZhY2UgPSB7XG4gICAgICAgICAgICAgICAgaW5maXJtaWVycyAgICAgICAgICA6IFtdLFxuICAgICAgICAgICAgICAgIHBhdGllbnRzTm9uQWZmZWN0ZXMgOiBbXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxldCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG4gICAgICAgICAgICBsZXQgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhyZXMudGV4dCgpLCBcInRleHQveG1sXCIpO1xuICAgICAgICAgICAgQXJyYXkuZnJvbShkb2MucXVlcnlTZWxlY3RvckFsbChcImluZmlybWllclwiKSkuZm9yRWFjaCgoZWw6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGluZmlybWllciA9IHRoaXMucGFyc2VJbmZpcm1pZXIoZWwpO1xuICAgICAgICAgICAgICAgIGNhYmluZXQuaW5maXJtaWVycy5wdXNoKGluZmlybWllcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIEFycmF5LmZyb20oZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoXCJwYXRpZW50XCIpKS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBwYXRpZW50ID0gdGhpcy5wYXJzZVBhdGllbnQoZWwpO1xuICAgICAgICAgICAgICAgIGlmICghcGF0aWVudC5pZCkge1xuICAgICAgICAgICAgICAgICAgICBjYWJpbmV0LnBhdGllbnRzTm9uQWZmZWN0ZXMucHVzaChwYXRpZW50LnBhdGllbnQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmYgOiBJbmZpcm1pZXJJbnRlcmZhY2VbXSA9IGNhYmluZXQuaW5maXJtaWVycy5maWx0ZXIoKGVsKSA9PiB7cmV0dXJuIGVsLmlkID09PSBwYXRpZW50LmlkO30pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5mLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJJbCBuJ2V4aXN0ZSBhdWN1biBpbmZpcm1pZXIgZGUgY2V0IGlkLCBvcMOpcmF0aW9uIGltcG9zc2libGUuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGluZi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZlswXS5wYXRpZW50cy5wdXNoKHBhdGllbnQucGF0aWVudCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIklsIGV4aXN0ZSBwbHVzaWV1cnMgaW5maXJtaWVycyBkZSBjZXQgaWQsIG9ww6lyYXRpb24gaW1wb3NzaWJsZS5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBjYWJpbmV0O1xuICAgICAgICB9KTsgLy8gRmluIGRlIHRoaXMuX2h0dHAuZ2V0XG4gICAgfVxuXG4gICAgYWZmZWN0ZXJQYXRpZW50KGlkUGF0aWVudDogc3RyaW5nLCBpZEluZjogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLnBvc3QoXCIvYWZmZWN0YXRpb25cIiwge2luZmlybWllcjogaWRJbmYsIHBhdGllbnQ6IGlkUGF0aWVudH0pLnRvUHJvbWlzZSgpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTGUgcGF0aWVudCBhIMOpdMOpIGFmZmVjdMOpXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVuZSBlcnJldXIgcydlc3QgcHJvZHVpdGUgOiBcIiArIHJlcy5zdGF0dXMgKyBcIiA6IFwiICsgcmVzLnN0YXR1c1RleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcGFyc2VJbmZpcm1pZXIoZWwgOiBFbGVtZW50KSA6IEluZmlybWllckludGVyZmFjZSB7XG4gICAgICAgIGxldCBpZCAgICAgID0gZWwuZ2V0QXR0cmlidXRlKFwiaWRcIik7XG4gICAgICAgIGxldCBub20gICAgID0gZWwucXVlcnlTZWxlY3RvcihcIm5vbVwiKS50ZXh0Q29udGVudCAgICAgICB8fCBcIlwiO1xuICAgICAgICBsZXQgcHJlbm9tICA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCJwcsOpbm9tXCIpLnRleHRDb250ZW50ICAgIHx8IFwiXCI7XG4gICAgICAgIGxldCBwaG90byAgID0gZWwucXVlcnlTZWxlY3RvcihcInBob3RvXCIpLnRleHRDb250ZW50ICAgICB8fCBcIlwiO1xuXG4gICAgICAgIGxldCBpbmZpcm1pZXIgOiBJbmZpcm1pZXJJbnRlcmZhY2UgPSA8SW5maXJtaWVySW50ZXJmYWNlPntcbiAgICAgICAgICAgIGlkICAgICAgOiBpZCxcbiAgICAgICAgICAgIG5vbSAgICAgOiBub20sXG4gICAgICAgICAgICBwcmVub20gIDogcHJlbm9tLFxuICAgICAgICAgICAgcGhvdG8gICA6IHBob3RvLFxuICAgICAgICAgICAgcGF0aWVudHM6IFtdXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBpbmZpcm1pZXI7XG4gICAgfVxuXG4gICAgcGFyc2VQYXRpZW50KGVsIDogRWxlbWVudCkge1xuICAgICAgICBsZXQgaWQgICAgICAgICAgPSBlbC5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgICAgICAgbGV0IG5vbSAgICAgICAgID0gZWwucXVlcnlTZWxlY3RvcihcIm5vbVwiKS50ZXh0Q29udGVudCAgICAgICAgICAgICAgIHx8IFwiXCI7XG4gICAgICAgIGxldCBwcmVub20gICAgICA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCJwcsOpbm9tXCIpLnRleHRDb250ZW50ICAgICAgICAgICAgfHwgXCJcIjtcbiAgICAgICAgbGV0IHNleGUgICAgICAgID0gdGhpcy5nZXRTZXhlKGVsLnF1ZXJ5U2VsZWN0b3IoXCJzZXhlXCIpLnRleHRDb250ZW50KXx8IFwiXCI7XG4gICAgICAgIGxldCBuYWlzc2FuY2UgICA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCJuYWlzc2FuY2VcIikudGV4dENvbnRlbnQgICAgICAgICB8fCBcIlwiO1xuICAgICAgICBsZXQgbnVtw6lybyAgICAgID0gZWwucXVlcnlTZWxlY3RvcihcIm51bcOpcm9cIikudGV4dENvbnRlbnQgICAgICAgICAgICB8fCBcIlwiO1xuICAgICAgICBsZXQgYWRyZXNzZSAgICAgPSB0aGlzLnBhcnNlQWRyZXNzZShlbC5xdWVyeVNlbGVjdG9yKFwiYWRyZXNzZVwiKSkgICAgfHwge307XG4gICAgICAgIGxldCBwYXRpZW50IDogUGF0aWVudEludGVyZmFjZSA9IDxQYXRpZW50SW50ZXJmYWNlPntcbiAgICAgICAgICAgIGlkICAgICAgICAgICAgICAgICAgICAgIDogaWQsXG4gICAgICAgICAgICBub20gICAgICAgICAgICAgICAgICAgICA6IG5vbSxcbiAgICAgICAgICAgIHByZW5vbSAgICAgICAgICAgICAgICAgIDogcHJlbm9tLFxuICAgICAgICAgICAgc2V4ZSAgICAgICAgICAgICAgICAgICAgOiBzZXhlLFxuICAgICAgICAgICAgbmFpc3NhbmNlICAgICAgICAgICAgICAgOiBuYWlzc2FuY2UsXG4gICAgICAgICAgICBudW1lcm9TZWN1cml0ZVNvY2lhbGUgICA6IG51bcOpcm8sXG4gICAgICAgICAgICBhZHJlc3NlICAgICAgICAgICAgICAgICA6IGFkcmVzc2UsXG4gICAgICAgIH07XG4gICAgICAgIGlmIChlbC5xdWVyeVNlbGVjdG9yKFwidmlzaXRlXCIpLmdldEF0dHJpYnV0ZShcImludGVydmVuYW50XCIpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcGF0aWVudCA6IHBhdGllbnQsXG4gICAgICAgICAgICAgICAgaWQgICAgICA6IGVsLnF1ZXJ5U2VsZWN0b3IoXCJ2aXNpdGVcIikuZ2V0QXR0cmlidXRlKFwiaW50ZXJ2ZW5hbnRcIilcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHBhdGllbnQgOiBwYXRpZW50LFxuICAgICAgICAgICAgICAgIGlkICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwYXJzZUFkcmVzc2UoZWwgOiBFbGVtZW50KSA6IGFueSB7XG4gICAgICAgIGxldCB2aWxsZSAgICAgICA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCJ2aWxsZVwiKSAgICAgICAgIHx8IFwiXCI7XG4gICAgICAgIGxldCBjb2RlUG9zdGFsICA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCJjb2RlUG9zdGFsXCIpICAgIHx8IFwiXCI7XG4gICAgICAgIGxldCBydWUgICAgICAgICA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCJydWVcIikgICAgICAgICAgIHx8IFwiXCI7XG4gICAgICAgIGxldCBudW1lcm8gICAgICA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCJudW1lcm9cIikgICAgICAgIHx8IFwiXCI7XG4gICAgICAgIGxldCBldGFnZSAgICAgICA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCJldGFnZVwiKSAgICAgICAgIHx8IFwiXCI7XG5cbiAgICAgICAgbGV0IGFkcmVzc2UgPSB7XG4gICAgICAgICAgICB2aWxsZSAgICAgICA6IHZpbGxlLFxuICAgICAgICAgICAgY29kZVBvc3RhbCAgOiBjb2RlUG9zdGFsLFxuICAgICAgICAgICAgcnVlICAgICAgICAgOiBydWUsXG4gICAgICAgICAgICBudW1lcm8gICAgICA6IG51bWVybyxcbiAgICAgICAgICAgIGV0YWdlICAgICAgIDogZXRhZ2VcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gYWRyZXNzZTtcbiAgICB9XG5cbiAgICBnZXRTZXhlKHNleGUgOiBzdHJpbmcpIDogc2V4ZUVudW0ge1xuICAgICAgICBpZiAoc2V4ZSA9PT0gXCJNXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBzZXhlRW51bS5NO1xuICAgICAgICB9IGVsc2UgaWYgKHNleGUgPT09IFwiRlwiKVxuICAgICAgICAgICAgcmV0dXJuIHNleGVFbnVtLkY7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIEFqb3V0ZXJQYXRpZW50IChmOiBOZ0Zvcm0pIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgbGV0IGNvbnRyb2xzID0gZi5mb3JtLmNvbnRyb2xzO1xuICAgICAgICBsZXQgYm9keSAgICAgPSB7fTtcbiAgICAgICAgZm9yKGxldCB2IGluIGNvbnRyb2xzKSB7XG4gICAgICAgICAgICBib2R5W3ZdID0gY29udHJvbHNbdl0udmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdCggXCIuL2FkZFBhdGllbnRcIiwgYm9keSApLnRvUHJvbWlzZSgpLnRoZW4oICgpID0+IGJvZHkgKTtcbiAgICB9XG5cbiAgICBnZXRQYXRpZW50QnlJZChudW1lcm86IHN0cmluZyk6IFByb21pc2U8UGF0aWVudEludGVyZmFjZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREYXRhKFwiL2RhdGEvY2FiaW5ldEluZmlybWllci54bWxcIikudGhlbigoIHJlcyApID0+IHtcbiAgICAgICAgICAgIGxldCBjYWJpbmV0ICAgICA6IENhYmluZXRJbnRlcmZhY2UgPSByZXM7XG4gICAgICAgICAgICBsZXQgcGF0aWVudHMgICAgOiBQYXRpZW50SW50ZXJmYWNlW10gPSBjYWJpbmV0LnBhdGllbnRzTm9uQWZmZWN0ZXM7XG5cbiAgICAgICAgICAgIGNhYmluZXQuaW5maXJtaWVycy5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHBhdGllbnRzID0gcGF0aWVudHMuY29uY2F0KHZhbHVlLnBhdGllbnRzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHBhdGllbnRzLmZpbHRlcigodmFsdWUpID0+IHtyZXR1cm4gdmFsdWUubnVtZXJvU2VjdXJpdGVTb2NpYWxlID09PSBudW1lcm87fSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhdGllbnRzLmZpbHRlcigodmFsdWUpID0+IHtyZXR1cm4gdmFsdWUubnVtZXJvU2VjdXJpdGVTb2NpYWxlID09PSBudW1lcm87fSlbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKCBlcnIgKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
