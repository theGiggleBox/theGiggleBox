import { createRating, deleteRating, fetchUserRating, getUser } from './fetch-utils.js';

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

    const ratings = renderRatingDiv(joke);
    ratings.classList.add('ratings');

    // const like = document.createElement('div');
    // like.classList.add('like');

    // const dislike = document.createElement('div');
    // dislike.classList.add('dislike');

    // ratings.append(like, dislike);
    jokeContainer.append(genre, jokeContent, ratings);
    return jokeContainer;
}

export function renderRatingDiv(joke) {
    const div = document.createElement('div');
    const like = document.createElement('div');

    like.classList.add('like');
    like.addEventListener('click', async () => {
        const fetchedRating = await fetchUserRating(joke.id);
        if (fetchedRating.length === 0) {
            const userRating = {
                liked: true,
                user_id: getUser().id,
                joke_id: joke.id,
            };
            await createRating(userRating);
            like.classList.add('liked');
        } else if (fetchedRating.length > 0) {
            await deleteRating(joke.id);
            like.classList.remove('liked');
            /// enter delete function here
            console.log('unliked');
        }
        // await createRating(userRating);
        //if there is no user rating create a row in ratings
        //if there is a rating then we want to update with the rating
        console.log('length', fetchedRating.length);
    });
    div.append(like);
    return div;
}
