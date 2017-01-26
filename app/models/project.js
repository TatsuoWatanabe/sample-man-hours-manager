"use strict";
var Project = (function () {
    function Project() {
        this.id = '';
        this.name = '';
    }
    Project.create = function () {
        return new Project();
    };
    Project.fromObject = function (obj) {
        var instance = new Project();
        Object.keys(instance).forEach(function (key) {
            var objValue = obj[key];
            if (objValue === undefined) {
                return;
            }
            instance[key] = objValue;
        });
        return instance;
    };
    return Project;
}());
exports.Project = Project;
//# sourceMappingURL=project.js.map