import { getGenres, getUser, createJoke } from '../fetch-utils.js';
const jokeForm = document.getElementById('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newForm = new FormData(form);

    const newJoke = {
        joke_content: newForm.get('text-box'),
        genre_id: newForm.get('genre-select'),
        user_id: getUser().id
    };
    // console.log('newJoke', newJoke);
    await createJoke(newJoke);
});

window.addEventListener('load', async () => {
    const selectEl = document.getElementById('genre-select');
    const genreList = await getGenres();
    // console.log(genreList, 'genreList');
    for (let genre of genreList) {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.genre;
        selectEl.append(option);
    }
});
