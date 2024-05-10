//import axios from "axios";

const initialState = {
  music: []
}

export default {
  namespaced: true,
  state: initialState,
  getters: {
    getSongs(state) {
      // console.log("getSongs", state.music);
      return state.music
    }
  },
  mutations: {
    SET_SONGS(state, payload) {
      let cleanedobj = []
      for (let i = 0; i < payload.length; i++) {
        payload[i].id = i
        cleanedobj.push(payload[i])
      }
      state.music = cleanedobj
    }
  },
  actions: {
    GET_SONGS: function ({ commit }) {
      commit('SET_SONGS', [
        {
          name: 'K. Flay',
          title: 'Blood in the Cut',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'A Perfect Circle',
          title: 'So Long, and Thanks for All the Fish',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'Rage Against The Machine',
          title: 'Killing in the Name',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'The Kills',
          title: 'Future Starts Slow',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'The Killers',
          title: 'When you were young',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'Nancy Sinatra',
          title: 'Bang Bang',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'Cameo',
          title: 'Word up',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'Slut',
          title: 'Easy to Love',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'Florence and the Machine',
          title: 'You`ve got the love',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'Florence and the Machine',
          title: 'King',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'Placebo',
          title: 'Every you every me',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'Poison',
          title: 'Every rose has its thorn',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'Billy Idol',
          title: 'White wedding',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'Keith Whitley',
          title: 'When you say nothing at all',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'Bandits',
          title: 'Another sad song',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'Muse',
          title: 'Plug in Baby',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: "K's Choice",
          title: 'Not an addict',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'Bob Dylan',
          title: 'Knockin’ on heaven’s door',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'Adele',
          title: 'Rolling in the deep',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'The Last Internationale',
          title: 'Wanted Man',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'Alannah Myles',
          title: 'Black Velvet',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'The Pretty Reckless',
          title: 'Take me down',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'Meredith Brooks',
          title: 'Bitch',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'Green Day',
          title: 'Good riddance',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'Blur',
          title: 'Song 2',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'Eurythmics',
          title: 'Sweet Dreams',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'Joan Jett & the Blackhearts',
          title: "I love rock 'n' roll",
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'Alanis Morissette',
          title: 'Ironic',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'Manfred Mann',
          title: 'Mighty Quinn',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'Amy Macdonald',
          title: 'This is the life',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'Laid Back',
          title: 'Bakerman',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'KT Tunstall',
          title: 'Black horse and the cherry tree',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'Foster the People',
          title: 'Pumped up kickse',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'Beyoncé',
          title: 'If I were a boy',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'Rihanna',
          title: 'Umbrella',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'Muse',
          title: 'Starlight',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'The Knife',
          title: 'Heartbeats',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'Limp Bizkit',
          title: 'Take a look around',
          url: 'img/bandmembers/floh.jpg'
        },
        {
          name: 'Nina Simone',
          title: 'Feeling good',
          url: 'img/bandmembers/floh.jpg'
        }
      ])
    }
  }
}
