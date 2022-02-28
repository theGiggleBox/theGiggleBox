const SUPABASE_URL = 'https://wlciphartsabwqqpvnez.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsY2lwaGFydHNhYndxcXB2bmV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDU4MzM0MjcsImV4cCI6MTk2MTQwOTQyN30.SzJ2OpOQXHBDB0w9uI8_k8i-XGyJs35OAEAbQbJH3zg';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./other-page');
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

    return (window.location.href = '../');
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}


//----------------------------------------------------------------------
// Fetch Functions
//----------------------------------------------------------------------

export async function fetchJokes() {
    const resp = await client.from('jokes').select('*, genre_id (*)');
    console.log(resp.data, 'jokes data');
    return checkError(resp);
}

// on click like / dislike
// grab the id of the joke, insert a rating into the ratings table
// insert the joke id, id of the user, rating 


// export async function rate(rating){
//     const resp = await client.from('ratings').insert({ joke_id: rating.id, })
// }

export async function getGenres() {
    const resp = await client.from('genres').select();
    // console.log('in getGenres', resp.data);
    return checkError(resp);
}