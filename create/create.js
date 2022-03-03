import { getGenres, getUser, createJoke, checkAuth } from '../fetch-utils.js';
import { renderOptions } from '../render-utils.js';
const form = document.getElementById('form');

checkAuth();


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newForm = new FormData(form);

    const newJoke = {
        joke_content: newForm.get('text-box'),
        genre_id: newForm.get('genre-select'),
        user_id: getUser().id,
    };
    await createJoke(newJoke);
    location.replace('/');
});

window.addEventListener('load', async () => {
    const selectEl = document.getElementById('genre-select');
    const genreList = await getGenres();
    renderOptions(genreList, selectEl);
});
