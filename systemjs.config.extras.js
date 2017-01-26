/**
 * Add barrels and stuff
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    defaultJSExtensions: true,
    packages: {
        "materialize-css": {
            "main": "dist/js/materialize"
        }
    },
    map: {
        "materialize-css": "node-modules/materialize-css",
        "angular2-materialize": "node_modules/angular2-materialize/dist/index.js",
        "@swimlane/ngx-datatable": "node_modules/@swimlane/ngx-datatable/release/index.js",
        "moment": "node_modules/moment",
        "angular-2-local-storage": "node_modules/angular-2-local-storage/dist/index.js",
        "http-status-codes": "node_modules/http-status-codes/index.js"
    }
  });
})(this);
