import { defineStore } from 'pinia';

interface Member {
  name: string
  instruments: string[]
  image: {
    url: string
  }
}

interface SocialLink {
  name: string
  url: string
  type: string
  icon: string
}

interface ImpressumInfo {
  company: string
  inhaber: string
  winhaber: string[]
  street: string
  zip: string
  town: string
  phone: string
  fax: string
  email: string
  umstid: string
  wirtid: string
  aufsicht: string
}

interface BandState {
  modalimg?: string
  impressuminfo: Partial<ImpressumInfo>
  social: SocialLink[]
  bandmembers: Member[]
}

export const useBandStore = defineStore('band', {
  state: (): BandState => ({
    modalimg: undefined,
    impressuminfo: {},
    social: [],
    bandmembers: []
  }),

  getters: {
    modalImg: (state) => state.modalimg,
    getImpressuminfo: (state) => state.impressuminfo,
    getBandmembers: (state) => state.bandmembers,
    getSocial: (state) => state.social
  },

  actions: {
    setModalImg(url: string) {
      this.modalimg = url;
    },

    GET_MEMBERS() {
      const base = import.meta.env.VITE_IMAGE_BASE_URL;
      this.bandmembers = [
        {
          name: 'Flo',
          instruments: ['E-Gitarre'],
          image: { url: `${base}/imgs/bandmembers/floh-min.jpg` }
        },
        {
          name: 'Mo',
          instruments: ['Leadgesang', 'Percussion', 'Akustikgitarre'],
          image: { url: `${base}/imgs/bandmembers/mo-min.jpg` }
        },
        {
          name: 'Fritz',
          instruments: ['Orgel', 'Keyboard', 'E-Gitarre'],
          image: { url: `${base}/imgs/bandmembers/fritz-min.jpg` }
        },
        {
          name: 'Joschi',
          instruments: ['Backing Vocals', 'Bass'],
          image: { url: `${base}/imgs/bandmembers/joschi-min.jpg` }
        },
        {
          name: 'Tanja',
          instruments: ['Backing Vocals', 'Drums'],
          image: { url: `${base}/imgs/bandmembers/tanja-min.jpg` }
        }
      ];
    },

    GET_SOCIAL() {
      this.social = [
        {
          name: 'facebook',
          url: 'https://www.facebook.com/hiddentracksberlin/',
          type: 'fab',
          icon: 'facebook'
        },
        {
          name: 'instagram',
          url: 'https://www.instagram.com/hiddentracksberlin/',
          type: 'fab',
          icon: 'instagram'
        },
        {
          name: 'youtube',
          url: 'https://www.youtube.com/channel/UCz_bBbDXAS5j_z4kIvyv_OA',
          type: 'fab',
          icon: 'youtube'
        }
      ];
    },

    GET_IMPRESSUMINFO() {
      this.impressuminfo = {
        company: 'Hidden Tracks GbR',
        inhaber: 'Johannes Kromer',
        winhaber: [
          'Johannes Kromer',
          'Monique Rothe',
          'Florian Richter',
          'Tanja Kasten',
          'Alexander Fritz'
        ],
        street: 'Hönower Str. 37',
        zip: '10318',
        town: 'Berlin',
        phone: '',
        fax: '',
        email: 'info@hiddentracks-berlin.de',
        umstid: '',
        wirtid: '',
        aufsicht: ''
      };
    }
  }
});
