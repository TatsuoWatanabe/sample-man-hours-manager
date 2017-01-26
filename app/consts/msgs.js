"use strict";
exports.Msgs = {
    confirmSave: function (target) { return "You save the data of " + target + ". Is it OK?"; },
    confirmDiscard: 'Discard the data being entered and return it to the saved state. Is it OK?',
    confirmDelete: function (target) { return "You delete the data of " + target + ". Is it OK?"; },
    promptInput: function (target) { return "Please input " + target + "."; },
    saved: 'Saved.',
    deleted: 'Deleted.',
    noData: 'No Data.',
    noProjectData: 'No registration of project.',
    loggedIn: function (username) { return "Welcome, $ {username}."; },
    loginFailed: 'Login failed.',
    loggedOut: 'Logged Out.',
    logoutFailed: 'Logout Failed.',
    dataGridEmpty: 'No data to display'
};
//# sourceMappingURL=msgs.js.map