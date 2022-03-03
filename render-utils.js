import { } from './fetch-utils.js';

export function renderOptions(genres, location, id) {
    for (let genre of genres) {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.genre;
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

    jokeContainer.append(genre, jokeContent);
    return jokeContainer;
}

export function renderRatingDiv(joke) {
    const div = document.createElement('div');
    const like = document.createElement('div');
    
    like.classList.add('like');
    if (joke.ratings && joke.ratings.length > 0 && joke.ratings[0].liked) {

       
        like.style.backgroundImage = 'url(../assets/like.png)';
    } else {
        like.style.backgroundImage = 'url(../assets/newlike.png)';
    }
    div.classList.add('ratings');

    div.append(like);
    return div;
}
