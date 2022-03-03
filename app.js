import { fetchJokes, logInLogOut } from './fetch-utils.js';
import { renderJoke } from './render-utils.js';

const jokeSection = document.getElementById('joke-section');
const signButton = document.getElementById('sign-up');

logInLogOut(signButton);


async function renderJokes() {
    const jokes = await fetchJokes();
    jokeSection.textContent = '';
    for (const joke of jokes) {
        const jokeEl = renderJoke(joke);
        jokeSection.append(jokeEl);
    }
}

window.addEventListener('load', async () => {
    await renderJokes();
    // await fetchUserJokes();
    // console.log(jokes, 'jokes console log');
});
