import { useState, useEffect, useMemo } from 'react';
import styles from './MyOffers.module.scss';
import OfferCard from '../../components/OfferCard/OfferCard';
import HttpService from '../../services/HttpService';
import { OfferModel } from '../../models/OfferModel';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useUserContext } from '../../components/common/context/UserProvider';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../routes/routes';

const MyOffers = () => {
  const { user } = useUserContext();
  const httpService = useMemo(() => new HttpService(), []);

  const [offers, setOffers] = useState<OfferModel[]>([]);
  const history = useHistory();

  useEffect(() => {
    httpService
      .get<OfferModel[]>(`data/Offers?where=ownerId = '${user?.id}'`)
      .then(setOffers)
      .catch(error => console.log(error));
  }, [httpService, setOffers]);

  if (user === null) {
    history.push(Routes.login.getPath());
    return <></>;
  }

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
export default MyOffers;