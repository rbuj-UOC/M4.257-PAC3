import PhotoSwipeLightbox from 'photoswipe/dist/photoswipe-lightbox.esm.js';
import 'photoswipe/dist/photoswipe.css';

const lightbox = new PhotoSwipeLightbox({
  gallery: '#gallery--zoom-transition',
  children: 'a',
  showHideAnimationType: 'zoom',
  pswpModule: () => import('photoswipe/dist/photoswipe.esm.js')
});
lightbox.init();
