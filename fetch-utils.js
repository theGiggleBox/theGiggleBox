const SUPABASE_URL = 'https://wlciphartsabwqqpvnez.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsY2lwaGFydHNhYndxcXB2bmV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDU4MzM0MjcsImV4cCI6MTk2MTQwOTQyN30.SzJ2OpOQXHBDB0w9uI8_k8i-XGyJs35OAEAbQbJH3zg';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();
    if (!user) location.replace('../auth');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('/');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });
    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });
    return response.user;
}

export async function logout() {
    await client.auth.signOut();
    return (window.location.href = '/');
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}

//----------------------------------------------------------------------
// Fetch Functions
//----------------------------------------------------------------------

export async function fetchJokes() {
    const resp = await client.from('jokes').select('*, genre_id (*), ratings(*)').order('id', { ascending: false });
    console.log(resp, 'fetchJokes');
    return checkError(resp);
}

export async function fetchRatings() {
    const resp = await client.from('ratings').select('*, joke_id (*)');
    return checkError(resp);
}

export async function fetchUserRating(id) {
    const resp = await client
        .from('ratings')
        .select('*')
        .match({ joke_id: id, user_id: getUser().id });
    return checkError(resp);
}

export async function fetchUserJokes() {
    const resp = await client
        .from('jokes')
        .select('*, genre_id (*)')
        .match({ user_id: getUser().id });
    return checkError(resp);
}

export async function getGenres() {
    const resp = await client.from('genres').select();

    return checkError(resp);
}

export async function createJoke(newJoke) {
    const resp = await client.from('jokes').insert(newJoke);
    return checkError(resp);
}

export async function deleteJokeRatings(id) {
    const resp = await client.from('ratings').delete().eq('joke_id', id);
    return checkError(resp);
}

export async function deleteJoke(id) {
    const resp = await client.from('jokes').delete().match({ id });

    return checkError(resp);
}

export async function updateJoke(object) {
    const id = object.id;
    const resp = await client.from('jokes').update(object).match({ id });
    return checkError(resp);
}

export function logInLogOut(element) {
    const user = getUser();
    if (user) {
        element.textContent = 'Log Out';
        element.addEventListener('click', () => {
            logout();
            location.replace('/');
        });
    } else if (window.location.pathname === '/') {
        element.textContent = 'Sign In / Sign Up';
        element.addEventListener('click', () => {
            location.replace('./auth');
        });
    } else {
        element.textContent = 'Sign In / Sign Up';
        element.addEventListener('click', () => {
            location.replace('../auth');
        });
    }
}
// ------------------------ your ratings ---------------------------------------
export async function createRating(id) {
    const resp = await client
        .from('ratings')
        .insert({ joke_id: id, user_id: getUser().id, liked: true });
    return checkError(resp);
}
export async function deleteRating(id) {
    const resp = await client
        .from('ratings')
        .delete()
        .match({ joke_id: id, user_id: getUser().id });

    return checkError(resp);
}
