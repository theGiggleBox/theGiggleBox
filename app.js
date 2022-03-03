import { fetchJokes, logInLogOut, fetchRatings } from './fetch-utils.js';
import { renderJoke } from './render-utils.js';

const jokeSection = document.getElementById('joke-section');
const signButton = document.getElementById('sign-up');
// const joke = { joke_content: 'this is a joke, get rekt', genre: 'joke genre', id: 1 };
logInLogOut(signButton);
//Make async
// function renderJoke(joke) {
//     // need section, genre, joke, ratings
//     const jokeContainer = document.createElement('div');
//     jokeContainer.classList.add('joke-container');

//     const genre = document.createElement('div');
//     genre.classList.add('genre');
//     genre.textContent = `${joke.genre_id.genre}`;

//     const jokeContent = document.createElement('div');
//     jokeContent.classList.add('joke-content');
//     jokeContent.textContent = `${joke.joke_content}`;

//     const ratings = document.createElement('div');
//     ratings.classList.add('ratings');

//     const like = document.createElement('div');
//     like.classList.add('like');

//     const dislike = document.createElement('div');
//     dislike.classList.add('dislike');

//     ratings.append(like, dislike);
//     jokeContainer.append(genre, jokeContent, ratings);
//     return jokeContainer;
// }

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
    await fetchRatings();
    // console.log(jokes, 'jokes console log');
});
