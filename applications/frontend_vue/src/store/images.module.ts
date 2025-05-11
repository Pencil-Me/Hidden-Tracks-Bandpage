import { defineStore } from 'pinia';
import slider from './jsons/slider.json';
import gallery from './jsons/gallery.json';
import polaroid from './jsons/polaroids.json';
import breaker from './jsons/breakerimage.json';

interface ImageItem {
  url: string
  lg: string
  md: string
  sm: string
  thumb: string
  lazy: string
}

interface ImageGroup {
  type: string
  images: ImageItem[]
}

interface ImagesState {
  modalimg: string | null
  sliderimages: ImageGroup
  breakerimages: ImageGroup
  galleryimages: ImageGroup
  polaroidimages: ImageGroup
}

const convertData = (data: ImageItem[]) => {
  const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
  return data.map((e) => ({
    url: baseUrl + e.url,
    lg: baseUrl + e.lg,
    md: baseUrl + e.md,
    sm: baseUrl + e.sm,
    thumb: baseUrl + e.thumb,
    lazy: baseUrl + e.lazy
  }));
};

export const useImagesStore = defineStore('images', {
  state: (): ImagesState => ({
    modalimg: null,
    sliderimages: { type: 'homeslider', images: [] },
    breakerimages: { type: 'breakerimage', images: [] },
    galleryimages: { type: 'gallery', images: [] },
    polaroidimages: { type: 'polaroid', images: [] }
  }),

  getters: {
    modalImg: (state) => state.modalimg,
    allSliderimages: (state) => state.sliderimages,
    allBreakerimages: (state) => state.breakerimages,
    allGalleryimages: (state) => state.galleryimages,
    allPolaroidimages: (state) => state.polaroidimages
  },

  actions: {
    setModalImg(url: string) {
      this.modalimg = url;
    },

    GET_SLIDERIMAGES() {
      this.sliderimages = {
        type: 'SLIDER',
        images: convertData(slider.data)
      };
    },

    GET_BREAKERIMAGES() {
      this.breakerimages = {
        type: 'BREAKERIMAGES',
        images: convertData(breaker.data)
      };
    },

    GET_GALLERYIMAGES() {
      this.galleryimages = {
        type: 'GALLERYIMAGES',
        images: convertData(gallery.data)
      };
    },

    GET_POLAROIDIMAGES() {
      this.polaroidimages = {
        type: 'POLAROIDIMAGES',
        images: convertData(polaroid.data)
      };
    }
  }
});
