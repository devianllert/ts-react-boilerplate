import api from './api';

export interface Photo {
  alt_description: string;
  color: string;
  description: string;
  downloads: number;
  likes: number;
  views: number;
  links: {
    html: string;
    download: string;
  };
  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user: {
    username: string;
    name: string;
    links: {
      html: string;
    };
    profile_image: {
      large: string;
      medium: string;
      small: string;
    };
  };
}

export const getRandomPhoto = async (): Promise<Photo> => {
  const { data } = await api.get<Photo>('https://api.unsplash.com/photos/random', {
    params: {
      orientation: 'portrait',
      collections: '3694365',
      // eslint-disable-next-line @typescript-eslint/camelcase
      content_filter: 'high',
    },
    headers: {
      Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}`,
    },
  });

  return data;
};
