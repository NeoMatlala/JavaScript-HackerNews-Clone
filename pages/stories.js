import Story from '../components/Story.js'
import view from '../utils/view.js'
import baseUrl from '../utils/baseUrl.js'
import checkFavorite from '../utils/checkFavorites.js'
import store from '../store.js'

export default async function Stories(path) {
    // get state
    const {favorites} = store.getState();
    //console.log(favorites)

    // get story first before displaying
    const stories = await getStories(path);
    
    // we first check if we have any stories to display, before we display anything
    const hasStories = stories.length > 0;

    // we pass our data to our Story component
    view.innerHTML = `
    <div>
        ${hasStories ? stories.map((story, i) => Story({ ...story, index: i+1, isFavorite: checkFavorite(favorites, story) })).join('') : 'No stories'}
    </div>`;

    // click event on all favorite spans to add to array of favorites
    document.querySelectorAll('.favorite').forEach(favoriteButton => {
        favoriteButton.addEventListener('click', async function() {
            const story = JSON.parse(this.dataset.story);
            const isFavorited = checkFavorite(favorites, story);

            if(isFavorited) {
                store.dispatch({ type: 'REMOVE_FAVORITE', payload: { favorite: story } })
            } else {
                store.dispatch({ type: 'ADD_FAVORITE', payload: { favorite: story } })
            }

            // re-render to display new data 
            await Stories(path);
        })
    })
}

// function that GETs our stories from HN API, through the path passed as argument. 
async function getStories(path){
    const isHomeRoute = path === '/';
    const isNewRoute = path === '/new';

    if(isHomeRoute){
        path = '/news'
    } else if (isNewRoute) {
        path = '/newest'
    }
    const response = await fetch(`${baseUrl}${path}`)
    const stories = await response.json();
    return stories;
}