import { deleteJoke, updateJoke } from './fetch-utils.js';

export function renderOptions(genres, location, id) {
    for (let genre of genres) {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.genre;
        // console.log('this is the id', id);
        if (genre.id === id) {
            option.selected = 'selected';
        }
        location.append(option);
    }
}

export function renderJoke(joke) {
    const jokeContainer = document.createElement('div');
    jokeContainer.classList.add('joke-container');

    const genre = document.createElement('div');
    genre.classList.add('genre');
    genre.textContent = joke.genre_id.genre;

    const jokeContent = document.createElement('div');
    jokeContent.classList.add('joke-content');
    jokeContent.textContent = joke.joke_content;

    const ratings = document.createElement('div');
    ratings.classList.add('ratings');

    const like = document.createElement('div');
    like.classList.add('like');

    const dislike = document.createElement('div');
    dislike.classList.add('dislike');

    ratings.append(like, dislike);
    jokeContainer.append(genre, jokeContent, ratings);
    return jokeContainer;
}

export function renderProfileJoke(joke, genres) {
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
        location.reload();

        // renderProfileJoke(joke);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'delete';
    deleteButton.addEventListener('click', async () => {
        await deleteJoke(joke.id);
        location.reload();
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
