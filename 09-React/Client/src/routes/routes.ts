export const Routes = {
  offers: {
    pattern: '/Offers',
    getPath: (): string => '/Offers',
  },
  login: {
    pattern: '/Login',
    getPath: (): string => '/Login',
  },
  register: {
    pattern: '/Register',
    getPath: (): string => '/Register',
  },
  myOffers: {
    pattern: '/MyOffers',
    getPath: (): string => '/MyOffers',
  },
  createOffer: {
    pattern: '/CreateOffer',
    getPath: (): string => '/CreateOffer',
  },
  offer: {
    pattern: '/Offer/:id',
    getPath: (id: string) => `/Offer/${id}`,
  }
};