let localStorageMusic
let localStorageSound

/**
 * Loads settings from localStorage
 * 
 */
function getLocalStorage() {
    localStorageMusic = localStorage.getItem('music')
    localStorageSound = localStorage.getItem('sound')
}