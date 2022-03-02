import { fetchUserJokes, getGenres } from '../fetch-utils.js';
import { renderProfileJoke } from '../render-utils.js';

const jokeSection = document.getElementById('joke-section');



window.addEventListener('load', async () => {
    const userJokes = await fetchUserJokes();
    const genres = await getGenres();
    for (const joke of userJokes) {
        const jokeEl = renderProfileJoke(joke, genres);
        jokeSection.append(jokeEl);

    }
});
// console.log(window.location.pathname);

