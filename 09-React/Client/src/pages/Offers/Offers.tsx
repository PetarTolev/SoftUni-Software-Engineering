import { useState, useEffect, useMemo } from 'react';
import styles from './Offers.module.scss';
import OfferCard from '../../components/OfferCard/OfferCard';
import HttpService from '../../services/HttpService';
import { OfferModel } from '../../models/OfferModel';
import CircularProgress from '@material-ui/core/CircularProgress';

const Offers = () => {
  const httpService = useMemo(() => new HttpService(), []);

  const [offers, setOffers] = useState<OfferModel[]>([]);

  useEffect(() => {
    httpService
      .get<OfferModel[]>("data/Offers")
      .then(setOffers)
      .catch(error => console.log(error));
  }, [httpService, setOffers]);

  return (
    <div className={styles.offers}>
      {offers.length > 0 ? offers.map(offer => (
        <div key={offer.objectId} className={styles.offerWrapper}>
          <OfferCard
            id={offer.objectId}
            imageSrc={'https://media.wired.com/photos/5d09594a62bcb0c9752779d9/1:1/w_1500,h_1500,c_limit/Transpo_G70_TA-518126.jpg'}
            price={`${offer.price}лв`}
            title={offer.brand}
            description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit eveniet consectetur nesciunt deleniti! Soluta corporis quae, deserunt, quasi doloremque doloribus at minus ipsa similique labore dignissimos? Nesciunt aut repudiandae quo."}
          />
        </div>
      )) : (
        <CircularProgress color="primary" size="60px" className={styles.spinner} />
      )}
    </div>
  );
}
export default Offers;