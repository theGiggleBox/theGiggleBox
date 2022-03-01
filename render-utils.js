export function renderOptions(genres, location) {
    for (let genre of genres) {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.genre;
        location.append(option);
    }
}


export function renderJoke(joke, genres) {
    // need section, genre, joke, ratings
    const jokeWrapper = document.createElement('div');

    const formContainer = document.createElement('div');
    const editForm = document.createElement('form');
    const inputField = document.createElement('input');
    inputField.value = joke.joke_content;

    const genreSelect = document.createElement('select');
    // render options to the select 
    renderOptions(genres, genreSelect);
    // append our edit input and select to the form
    // on submit of form, pass an object to our supabase to update



    const submit = document.createElement('button');
    
    const jokeContainer = document.createElement('div');
    jokeContainer.classList.add('joke-container');

    const genre = document.createElement('div');
    genre.classList.add('genre');
    genre.textContent = `${joke.genre_id.genre}`;

    const jokeContent = document.createElement('div');
    jokeContent.classList.add('joke-content');
    jokeContent.textContent = joke.joke_content;

    const ratings = document.createElement('div');
    ratings.classList.add('ratings');

    const like = document.createElement('div');
    like.classList.add('like');

    const dislike = document.createElement('div');
    dislike.classList.add('dislike');

    const editJoke = document.createElement('button');
    editJoke.classList.add('edit');

    const deleteJoke = document.createElement('button');
    deleteJoke.classList.add('delete');

    const editJokeContent = document.createElement('input');
    editJokeContent.value = joke.joke_content;
    editJokeContent.classList.add('hide');
    
    if (window.location.pathname === '/profile/') {
        jokeContainer.addEventListener('click', () => {
            jokeContainer.classList.add('hide'); 
        
        });
    }

    ratings.append(like, dislike);
    jokeContainer.append(genre, jokeContent, ratings);
    return jokeContainer;
}
