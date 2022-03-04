import { checkAuth, logInLogOut } from '../fetch-utils.js';

checkAuth();
const signButton = document.getElementById('sign-button');

logInLogOut(signButton);
