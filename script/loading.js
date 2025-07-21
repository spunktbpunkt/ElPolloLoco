const ALL_IMAGE_PATHS = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png',
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png',
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png',
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png',
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png',
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png',
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
    'img/5_background/layers/4_clouds/1.png',
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    'img/7_statusbars/2_statusbar_endboss/green/green0.png',
    'img/7_statusbars/2_statusbar_endboss/green/green20.png',
    'img/7_statusbars/2_statusbar_endboss/green/green40.png',
    'img/7_statusbars/2_statusbar_endboss/green/green60.png',
    'img/7_statusbars/2_statusbar_endboss/green/green80.png',
    'img/7_statusbars/2_statusbar_endboss/green/green100.png',
    'img/8_coin/coin_1.png',
    'img/9_intro_outro_screens/start/startscreen_2.svg',
    'img/You won, you lost/Game over A.png',
    'img/You won, you lost/You Win A.png'
];

let loadedImages = 0;
let totalImages = ALL_IMAGE_PATHS.length;
let globalImageCache = {};
let isLoadingComplete = false;

/**
 * Preloads all game assets with progress tracking
 * 
 * @returns {Promise} Resolves when all images are loaded
 */
function preloadAllImages() {
    return new Promise((resolve) => {
        if (totalImages === 0) {
            resolve();
            return;
        }

        loadedImages = 0;
        ALL_IMAGE_PATHS.forEach((path) => loadSingleImage(path, resolve));
    });
}

/**
 * Loads a single image and handles completion
 * 
 * @param {string} path - Image path to load
 * @param {Function} resolve - Promise resolve function
 */
function loadSingleImage(path, resolve) {
    const img = new Image();
    
    img.onload = () => handleImageLoad(img, path, resolve);
    img.onerror = () => handleImageError(path, resolve);
    img.src = path;
}

/**
 * Handles successful image load
 * 
 * @param {HTMLImageElement} img - Loaded image
 * @param {string} path - Image path
 * @param {Function} resolve - Promise resolve function
 */
function handleImageLoad(img, path, resolve) {
    loadedImages++;
    globalImageCache[path] = img;
    updateLoadingProgress();
    checkLoadingComplete(resolve);
}

/**
 * Handles failed image load
 * 
 * @param {string} path - Failed image path
 * @param {Function} resolve - Promise resolve function
 */
function handleImageError(path, resolve) {
    loadedImages++;
    updateLoadingProgress();
    checkLoadingComplete(resolve);
}

/**
 * Checks if all images are loaded and resolves promise
 * 
 * @param {Function} resolve - Promise resolve function
 */
function checkLoadingComplete(resolve) {
    if (loadedImages === totalImages) {
        isLoadingComplete = true;
        setTimeout(() => resolve(), 300);
    }
}

/**
 * Updates progress bar and percentage display
 * 
 */
function updateLoadingProgress() {
    const percentage = Math.round((loadedImages / totalImages) * 100);
    const loadingBar = document.getElementById('loadingBar');
    const loadingPercentage = document.getElementById('loadingPercentage');
    
    if (loadingBar && loadingPercentage) {
        loadingBar.style.width = percentage + '%';
        loadingPercentage.textContent = percentage + '%';
    }
}

/**
 * Hides loading screen with fade animation
 * 
 */
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    if (loadingScreen) {
        loadingScreen.classList.add('fade-out');
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 800);
    }
}

/**
 * Shows loading screen
 * 
 */
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
        loadingScreen.classList.remove('fade-out');
        updateLoadingProgress();
    }
}

/**
 * Initializes game with loading screen
 * 
 */
async function initWithLoading() {
    showLoadingScreen();
    
    try {
        await preloadAllImages();
        hideLoadingScreen();
        init();
    } catch (error) {
        hideLoadingScreen();
        init();
    }
}

/**
 * Loads image from cache or creates new one
 * 
 * @param {string} path - Image file path
 * @returns {HTMLImageElement} The loaded image
 */
function loadImageOptimized(path) {
    if (globalImageCache && globalImageCache[path]) {
        return globalImageCache[path];
    }
    
    const img = new Image();
    img.src = path;
    return img;
}

/**
 * Loads multiple images from cache or creates new ones
 * 
 * @param {string[]} paths - Array of image paths
 * @returns {Object} Object with path as key and HTMLImageElement as value
 */
function loadImagesOptimized(paths) {
    const imageCache = {};
    paths.forEach(path => {
        imageCache[path] = getCachedOrNewImage(path);
    });
    return imageCache;
}

/**
 * Gets image from cache or creates new one
 * 
 * @param {string} path - Image path
 * @returns {HTMLImageElement} Cached or new image
 */
function getCachedOrNewImage(path) {
    if (globalImageCache && globalImageCache[path]) {
        return globalImageCache[path];
    }
    
    const img = new Image();
    img.src = path;
    return img;
}