import { checkAuth, fetchUserJokes, getGenres, logInLogOut } from '../fetch-utils.js';
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
// console.log(window.location.pathname)

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
    // inputField.type = 'text';
    const genreSelectEl = document.createElement('select');
    genreSelectEl.name = 'genre-booger';
    // genreSelectEl.textContent = joke.genre_id.genre;
    renderOptions(genres, genreSelectEl, joke.genre_id.id);
    // genreSelectEl.value = joke.genre_id;
    const formSubmitButton = document.createElement('button');
    // formSubmitButton.classList.add('submit-add');
    formSubmitButton.textContent = 'Save';

    editForm.append(genreSelectEl, inputField, formSubmitButton);

    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = new FormData(editForm);
        // console.log(data.get('booger-edit'), 'data test content');
        // console.log(data.get('genre-booger'), 'data test genre');
        const editObject = {
            joke_content: data.get('booger-edit'),
            genre_id: data.get('genre-booger'),
            id: joke.id,
        };
        await updateJoke(editObject);
        // location.reload();

        await displayProfileJokes();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'delete';
    deleteButton.addEventListener('click', async () => {
        await deleteJoke(joke.id);
        // location.reload();
        await displayProfileJokes();
    });
    formContainer.append(editForm, deleteButton);

    jokeContainer.addEventListener('click', () => {
        jokeContainer.classList.add('hide');
        // jokeContainer.classList.remove('joke-container');
        formContainer.classList.remove('hide');
        // const deleteButton = document.createElement('button');
    });

    jokeWrapper.append(jokeContainer, formContainer);
    return jokeWrapper;
}
