import { fetchUserJokes } from '../fetch-utils.js';
import { renderJoke } from '../render-utils.js';

const jokeSection = document.getElementById('joke-section');



window.addEventListener('load', async () => {
    const userJokes = await fetchUserJokes();
   
    for (const joke of userJokes) {
        const jokeEl = renderJoke(joke);
        jokeSection.append(jokeEl);
        
    }
    
});
console.log(window.location.pathname);

