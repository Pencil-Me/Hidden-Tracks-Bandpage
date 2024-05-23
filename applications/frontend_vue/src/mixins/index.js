export default {
  methods: {
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
      }
      return array
    },
    cleanObject(response, state) {
      if (response == null && response.length <= 0) return

      let cleanedobj = []
      let obj = {
        url: '1.jpg',
        lg: '1.jpg',
        md: '1.jpg',
        sm: '1.jpg',
        thumb: '1.jpg',
        caption: 'Caption',
        text: 'Text'
      }
      let parseresponse = JSON.parse(JSON.stringify(response.data))

      for (let i = 0; i < parseresponse.images.length; i++) {
        obj.url = `${import.meta.env.VITE_IMAGE_BASE_URL}/${parseresponse.images[i].url}`
        obj.thumb = `${import.meta.env.VITE_IMAGE_BASE_URL}/${parseresponse.images[i].thumb}`
        obj.lg = `${import.meta.env.VITE_IMAGE_BASE_URL}/${parseresponse.images[i].lg}`
        obj.md = `${import.meta.env.VITE_IMAGE_BASE_URL}/${parseresponse.images[i].md}`
        obj.sm = `${import.meta.env.VITE_IMAGE_BASE_URL}/${parseresponse.images[i].sm}`
        obj.lazy = `${import.meta.env.VITE_IMAGE_BASE_URL}/${parseresponse.images[i].lazy}`

        cleanedobj.push(JSON.parse(JSON.stringify(obj)))
      }

      return {
        type: parseresponse.type,
        state: state,
        images: cleanedobj
      }
    }
  }
}
