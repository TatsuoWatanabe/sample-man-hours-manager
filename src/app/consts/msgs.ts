export const Msgs = {
  confirmSave(target: string) { return `You save the data of ${target}. Is it OK?`; },
  confirmDiscard: 'Discard the data being entered and return it to the saved state. Is it OK?',
  confirmDelete(target: string) { return `You delete the data of ${target}. Is it OK?`; },
  promptInput(target: string) { return `Please input ${target}.`; },
  saved: 'Saved.',
  deleted: 'Deleted.',
  noData: 'No Data.',
  noProjectData: 'No registration of project.',
  loggedIn(username: string) { return `Welcome, $ {username}.`; },
  loginFailed: 'Login failed.',
  loggedOut: 'Logged Out.',
  logoutFailed: 'Logout Failed.',
  dataGridEmpty: 'No data to display'
};
