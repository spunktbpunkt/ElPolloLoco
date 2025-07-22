/**
 * Enters fullscreen mode
 * 
 * @param {HTMLElement} element - Element to make fullscreen
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

/**
 * Exits fullscreen mode
 * 
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * Resizes canvas to fullscreen resolution
 * 
 */
function resizeCanvasToFullscreen() {
    const canvas = document.getElementById('canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
    }
}

/**
 * Resets canvas to original resolution
 */
function resetCanvasResolution() {
    const canvas = document.getElementById('canvas');
    if (canvas) {
        canvas.width = 720;
        canvas.height = 480;
        canvas.style.width = '';
        canvas.style.height = '';
    }
}