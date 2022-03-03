import { createRating, deleteRating, fetchJokes, getUser, logInLogOut } from './fetch-utils.js';
import { renderJoke, renderRatingDiv } from './render-utils.js';

const jokeSection = document.getElementById('joke-section');
const signButton = document.getElementById('sign-up');

logInLogOut(signButton);

async function renderJokes() {
    const jokes = await fetchJokes();
    jokeSection.textContent = '';
    for (const joke of jokes) {
        const jokeEl = renderJoke(joke);
        if (joke.user_id !== getUser().id) {
            const ratingEl = renderRatingDiv(joke);
            jokeEl.append(ratingEl);
            ratingEl.addEventListener('click', async () => {
                if (joke.ratings && joke.ratings.length > 0) {
                    await deleteRating(joke.id);
                } else {
                    await createRating(joke.id);
                }
                renderJokes();
            });
        }
        jokeSection.append(jokeEl);
    }
}

window.addEventListener('load', async () => {
    await renderJokes();
});
