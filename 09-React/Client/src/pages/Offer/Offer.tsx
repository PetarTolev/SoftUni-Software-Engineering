import styles from './Offer.module.scss';
import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import HttpService from '../../services/HttpService';
import { OfferModel } from '../../models/OfferModel';

const Offer = () => {
  const { id } = useParams<{ id: string }>();
  const httpService = useMemo(() => new HttpService(), []);
  const [offer, setOffer] = useState<{
    brand: string,
    location: string,
    price: number,
    created: number
  }>();

  useEffect(() => {
    httpService.get<OfferModel>(`data/Offers/${id}`)
      .then((result) => {
        const { brand, location, price, created } = result;

        setOffer({
          brand,
          location,
          price,
          created
        });
      })
      .catch(error => console.log(error));

  }, [httpService, id]);

  return (
    <div className={styles.offer}>
      <h1>{offer?.brand}</h1>
      <span>{offer?.location}</span>
      <span>{offer?.price}</span>
      <span>{offer !== undefined && new Date(offer.created).toLocaleDateString()}</span>
    </div>
  );
}

export default Offer;