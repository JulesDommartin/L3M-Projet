import {Injectable}     from "@angular/core";
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {NgForm} from "@angular/forms";

export enum sexeEnum {M, F}
export interface PatientInterface {
    prenom                  : string;
    nom                     : string;
    sexe                    : sexeEnum;
    numeroSecuriteSociale   : string;
    adresse                 : {
        ville       : string;
        codePostal  : number;
        rue         : string;
        numero      : string;
        etage       : string;
    };
}
export interface InfirmierInterface {
    id          : string;
    prenom      : string;
    nom         : string;
    photo       : string;
    patients    : PatientInterface[];
}
export interface CabinetInterface {
    infirmiers          : InfirmierInterface[];
    patientsNonAffectes : PatientInterface  [];
}

@Injectable()
export class ServiceCabinetMedical {
    constructor(private _http: Http) {} // Le service CabinetMedical a besoin du service Http
    getData( url: string ) : Promise<CabinetInterface> {
        return this._http.get(url).toPromise().then( (res: Response) => {
            let cabinet : CabinetInterface = {
                infirmiers          : [],
                patientsNonAffectes : []
            };
            let parser = new DOMParser();
            let doc = parser.parseFromString(res.text(), "text/xml");
            Array.from(doc.querySelectorAll("infirmier")).forEach((el: HTMLElement) => {
                let infirmier = this.parseInfirmier(el);
                cabinet.infirmiers.push(infirmier);
            });
            Array.from(doc.querySelectorAll("patient")).forEach((el) => {
                let patient = this.parsePatient(el);
                if (!patient.id) {
                    cabinet.patientsNonAffectes.push(patient.patient);
                } else {
                    let inf : InfirmierInterface[] = cabinet.infirmiers.filter((el) => {return el.id === patient.id;});
                    if (inf.length === 0) {
                        console.log("Il n'existe aucun infirmier de cet id, opération impossible.");
                    } else if (inf.length === 1) {
                        inf[0].patients.push(patient.patient);
                    } else {
                        console.log("Il existe plusieurs infirmiers de cet id, opération impossible.");
                    }
                }
            });
            return cabinet;
        }); // Fin de this._http.get
    }

    affecterPatient(idPatient: string, idInf: string) {
        return this._http.post("/affectation", {infirmier: idInf, patient: idPatient}).toPromise().then((res) => {
            if (res.status === 200) {
                console.log("Le patient a été affecté");
            } else {
                console.log("Une erreur s'est produite : " + res.status + " : " + res.statusText);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    parseInfirmier(el : Element) : InfirmierInterface {
        let id      = el.getAttribute("id");
        let nom     = el.querySelector("nom").textContent       || "";
        let prenom  = el.querySelector("prénom").textContent    || "";
        let photo   = el.querySelector("photo").textContent     || "";

        let infirmier : InfirmierInterface = <InfirmierInterface>{
            id      : id,
            nom     : nom,
            prenom  : prenom,
            photo   : photo,
            patients: []
        };
        return infirmier;
    }

    parsePatient(el : Element) {
        let id          = el.getAttribute("id");
        let nom         = el.querySelector("nom").textContent               || "";
        let prenom      = el.querySelector("prénom").textContent            || "";
        let sexe        = this.getSexe(el.querySelector("sexe").textContent)|| "";
        let naissance   = el.querySelector("naissance").textContent         || "";
        let numéro      = el.querySelector("numéro").textContent            || "";
        let adresse     = this.parseAdresse(el.querySelector("adresse"))    || {};
        let patient : PatientInterface = <PatientInterface>{
            id                      : id,
            nom                     : nom,
            prenom                  : prenom,
            sexe                    : sexe,
            naissance               : naissance,
            numeroSecuriteSociale   : numéro,
            adresse                 : adresse,
        };
        if (el.querySelector("visite").getAttribute("intervenant") !== undefined) {
            return {
                patient : patient,
                id      : el.querySelector("visite").getAttribute("intervenant")
            };
        } else {
            return {
                patient : patient,
                id      : undefined
            };
        }
    }

    parseAdresse(el : Element) : any {
        let ville       = el.querySelector("ville")         || "";
        let codePostal  = el.querySelector("codePostal")    || "";
        let rue         = el.querySelector("rue")           || "";
        let numero      = el.querySelector("numero")        || "";
        let etage       = el.querySelector("etage")         || "";

        let adresse = {
            ville       : ville,
            codePostal  : codePostal,
            rue         : rue,
            numero      : numero,
            etage       : etage
        };

        return adresse;
    }

    getSexe(sexe : string) : sexeEnum {
        if (sexe === "M") {
            return sexeEnum.M;
        } else if (sexe === "F")
            return sexeEnum.F;
        return null;
    }

    AjouterPatient (f: NgForm) : Promise<any> {
        let controls = f.form.controls;
        let body     = {};
        for(let v in controls) {
            body[v] = controls[v].value;
        }
        return this._http.post( "./addPatient", body ).toPromise().then( () => body );
    }

}
