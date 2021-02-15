import Stories from './pages/stories.js'
import Item from './pages/item.js'
import Favorites from './pages/favorites.js'

// initializing a new Router
const router = new Navigo(null, true, '#');

//class to handle our routing
export default class RouterHandler {
    constructor(){
        this.createRoutes();
    }

    createRoutes(){
        // an array of routes, where each route is an object
        const routes = [
            { path: '/', page: Stories},
            { path: '/new', page: Stories},
            { path: '/ask', page: Stories},
            { path: '/show', page: Stories},
            { path: '/item', page: Item},
            { path: '/favorites', page: Favorites}
        ];

        routes.forEach(({path, page}) => {
            router.on(path, () => {
                page(path);
            }).resolve();
        })
    }
}