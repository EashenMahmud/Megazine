// Asset manifest — all images available in src/assets/images/
// Professional RSL shots (high-res editorial photos)
export const rslImages = [
    'RSL03144.jpg', 'RSL03152.jpg', 'RSL03168.jpg', 'RSL03349.jpg',
    'RSL03360.jpg', 'RSL03367.jpg', 'RSL03369.jpg', 'RSL03416.jpg',
    'RSL03432.jpg', 'RSL03448.jpg', 'RSL03456.jpg', 'RSL03520.jpg',
    'RSL03525.jpg', 'RSL03527.jpg', 'RSL03531.jpg', 'RSL03543.jpg',
    'RSL07002.jpg', 'RSL07007.jpg', 'RSL07011.jpg', 'RSL07012.jpg',
    'RSL07018.jpg', 'RSL07218.jpg', 'RSL07225.jpg', 'RSL07236.jpg',
    'RSL07361.jpg', 'RSL07389.jpg', 'RSL07392.jpg', 'RSL07395.jpg',
    'RSL07403.jpg', 'RSL07441.jpg', 'RSL07449.jpg', 'RSL07460.jpg',
    'RSL07472.jpg', 'RSL07499.jpg',
];

// Candid/personal photos (converted from HEIC)
export const personalImages = [
    'IMG_1843.jpg', 'IMG_1848.jpg', 'IMG_1878.jpg', 'IMG_1881.jpg',
    'IMG_1885.jpg', 'IMG_1917.jpg', 'IMG_1941.jpg', 'IMG_1957.jpg',
    'IMG_2080.jpg', 'IMG_2088.jpg', 'IMG_2089.jpg', 'IMG_2092.jpg',
    'IMG_2094.jpg',
];

// Videos
export const videos = [
    'IMG_1837.MOV',
    'IMG_2019.MOV',
    'IMG_2031.MOV',
];

// Helper to import image dynamically
export function getImageUrl(filename) {
    return new URL(`./assets/images/${filename}`, import.meta.url).href;
}

export function getVideoUrl(filename) {
    return new URL(`./assets/videos/${filename}`, import.meta.url).href;
}
