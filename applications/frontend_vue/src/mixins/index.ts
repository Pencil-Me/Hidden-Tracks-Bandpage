interface Image {
  url: string;
  lg: string;
  md: string;
  sm: string;
  thumb: string;
  lazy?: string;
  caption?: string;
  text?: string;
}

interface CleanedImageData {
  type: string | null;
  state: string;
  images: Image[];
}

export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array]; // vermeidet Mutation des Originals
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function cleanObject(
  response: {
    data: {
      type: string;
      images: {
        url: string;
        lg: string;
        md: string;
        sm: string;
        thumb: string;
        lazy: string;
        caption: string;
        text: string;
      }[];
    };
  },
  state: string
): CleanedImageData {
  if (!response || !response.data || !response.data.images || response.data.images.length === 0) {
    return {
      type: null,
      state,
      images: []
    };
  }

  const cleanedImages: Image[] = response.data.images.map(
    (img: {
      url: string;
      lg: string;
      md: string;
      sm: string;
      thumb: string;
      lazy: string;
      caption: string;
      text: string;
    }) => ({
      url: `${import.meta.env.VITE_IMAGE_BASE_URL}/${img.url}`,
      lg: `${import.meta.env.VITE_IMAGE_BASE_URL}/${img.lg}`,
      md: `${import.meta.env.VITE_IMAGE_BASE_URL}/${img.md}`,
      sm: `${import.meta.env.VITE_IMAGE_BASE_URL}/${img.sm}`,
      thumb: `${import.meta.env.VITE_IMAGE_BASE_URL}/${img.thumb}`,
      lazy: `${import.meta.env.VITE_IMAGE_BASE_URL}/${img.lazy}`,
      caption: img.caption ?? '',
      text: img.text ?? ''
    })
  );

  return {
    type: response.data.type ?? null,
    state,
    images: cleanedImages
  };
}
