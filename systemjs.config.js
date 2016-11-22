(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            main: 'app',
            // @NoyauFonctionnel
            '@Services/cabinetMedicalService' : 'app/Services/cabinetMedicalService.js',
            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            // other libraries
            'rxjs':                       'npm:rxjs',
            'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
            'moment': 'npm:moment/moment.js',
            'angular2-moment':'npm:angular2-moment',
            'ng2-bootstrap/ng2-bootstrap': 'npm:ng2-bootstrap/bundles/ng2-bootstrap.umd.js',
            'angular2-google-maps/core': 'npm:angular2-google-maps/core',
            'angular2-fontawesome': 'npm:angular2-fontawesome',
            '@google/maps':'npm:@google/maps/lib/',
            'angular2-notifications': 'npm:angular2-notifications'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            main: {
                main: './secretary.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'angular2-in-memory-web-api': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'angular2-google-maps/core': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            'angular2-fontawesome': {
                defaultExtension: 'js'
            },
            'angular2-notifications': {
                main: 'components.js',
                defaultExtension: 'js'
            },
            'angular2-moment': {
                main: './index.js',
                defaultExtension: 'js'
            }
        }
    });
})(this);
