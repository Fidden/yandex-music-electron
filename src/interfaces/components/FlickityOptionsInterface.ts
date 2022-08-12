export default interface FlickityOptionsInterface {
    draggable?: boolean;
    freeScroll?: boolean;
    contain?: boolean;
    wrapAround?: boolean;
    groupCells?: boolean;
    autoPlay?: boolean;
    fullscreen?: boolean;
    fade?: boolean;
    adaptiveHeight?: boolean;
    watchCSS?: boolean;
    asNavFor?: string | HTMLElement;
    hash?: boolean;
    dragThreshold?: number;
    selectedAttraction?: number;
    friction?: number;
    freeScrollFriction?: number;
    imagesLoaded?: boolean;
    lazyLoad?: boolean;
    bgLazyLoad?: boolean;
    cellSelector?: string;
    initialIndex?: number;
    accessibility?: boolean;
    setGallerySize?: boolean;
    resize?: boolean;
    cellAlign?: string;
    percentPosition?: boolean;
    rightToLeft?: boolean;
    prevNextButtons?: boolean;
    pageDots?: boolean;
    arrowShape?: string;
};
