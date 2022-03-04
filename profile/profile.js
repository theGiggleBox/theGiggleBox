import {
    checkAuth,
    deleteJokeRatings,
    fetchUserJokes,
    getGenres,
    logInLogOut,
} from '../fetch-utils.js';
import { renderJoke, renderOptions } from '../render-utils.js';
import { deleteJoke, updateJoke } from '../fetch-utils.js';

checkAuth();

const jokeSection = document.getElementById('joke-section');
const signButton = document.getElementById('sign-up');
async function displayProfileJokes() {
    jokeSection.textContent = '';
    const userJokes = await fetchUserJokes();
    const genres = await getGenres();
    for (const joke of userJokes) {
        const jokeEl = renderProfileJoke(joke, genres);
        jokeSection.append(jokeEl);
    }
}

logInLogOut(signButton);
window.addEventListener('load', async () => {
    await displayProfileJokes();
});

function renderProfileJoke(joke, genres) {
    const jokeWrapper = document.createElement('div');
    jokeWrapper.classList.add('joke-wrapper');
    const jokeContainer = renderJoke(joke);

    const formContainer = document.createElement('div');
    formContainer.classList.add('hide');
    const editForm = document.createElement('form');
    const inputField = document.createElement('textarea');
    inputField.name = 'booger-edit';
    inputField.value = joke.joke_content;
    const genreSelectEl = document.createElement('select');
    genreSelectEl.name = 'genre-booger';
    renderOptions(genres, genreSelectEl, joke.genre_id.id);
    const formSubmitButton = document.createElement('button');
    formSubmitButton.textContent = 'Save';

    editForm.append(genreSelectEl, inputField, formSubmitButton);

    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = new FormData(editForm);
        const editObject = {
            joke_content: data.get('booger-edit'),
            genre_id: data.get('genre-booger'),
            id: joke.id,
        };
        await updateJoke(editObject);

        await displayProfileJokes();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'delete';
    deleteButton.addEventListener('click', async () => {
        await deleteJokeRatings(joke.id);

        await deleteJoke(joke.id);
        await displayProfileJokes();
    });
    formContainer.append(editForm, deleteButton);

    jokeContainer.addEventListener('click', () => {
        jokeContainer.classList.add('hide');
        formContainer.classList.remove('hide');
    });

    jokeWrapper.append(jokeContainer, formContainer);
    return jokeWrapper;
}
