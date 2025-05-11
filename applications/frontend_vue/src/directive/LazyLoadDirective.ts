export default {
  mounted(el: HTMLElement) {
    const TIMEOUT = 100;

    const loadImage = () => {
      const imageElement = Array.from(el.children).find((child) => child.nodeName === 'IMG') as
        | HTMLImageElement
        | undefined;

      if (imageElement) {
        imageElement.addEventListener('load', () => {
          setTimeout(() => el.classList.add('loaded'), TIMEOUT);
        });

        imageElement.addEventListener('error', () => {
          console.warn('[v-lazy] Image failed to load:', imageElement.dataset.url);
        });

        if (imageElement.dataset.url) {
          imageElement.src = imageElement.dataset.url;
        }
      }
    };

    const handleIntersect = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImage();
          observer.unobserve(el);
        }
      });
    };

    const createObserver = () => {
      const observer = new IntersectionObserver(handleIntersect, {
        root: null,
        threshold: 0
      });
      observer.observe(el);
    };

    if ('IntersectionObserver' in window) {
      createObserver();
    } else {
      // Fallback for older browsers
      loadImage();
    }
  }
};
