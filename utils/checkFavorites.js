// function dedicated to checking if a story is added as a favorite or nah

export default function checkFavorite(favorites, story) {
    //check if the story is in the favorites array or nah. return either true/false
    return favorites.some(favorite => favorite.id === story.id)
}