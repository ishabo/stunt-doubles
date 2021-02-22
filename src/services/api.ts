
export interface StuntDoubles  {
  original: {
    name: string;
    image: string;
  };
  stunts: Stunt[];
}

export interface Stunt {
  liked: null | boolean;
  image: string;
}

export const stuntsDoubles: StuntDoubles[] = [
  {
    original: {
      name: 'Snoop Dog',
      image: require('../assets/snoop-dog.jpg')
    },
    stunts: [
      {
      image: require('../assets/snoop-stunt1.jpg'),
      liked: null,
      },
            {
      image: require('../assets/snoop-stunt2.jpg'),
      liked: null,
      },
      {
      image: require('../assets/snoop-stunt3.jpg'),
        liked: null,
      }
    ]
  },
  {
    original: {
      name: 'Donald Trump',
      image: require('../assets/trump.jpg')
    },
    stunts: [
      {
        image: require('../assets/trump-stunt1.jpg'),
        liked: null,
      },
      {
        image: require('../assets/trump-stunt2.png'),
        liked: null,
      },
      {
        image: require('../assets/trump-stunt3.png'),
        liked: null,
      },           
      {
        image: require('../assets/trump-stunt4.png'),
        liked: null,
      }
    ]
  }
];
