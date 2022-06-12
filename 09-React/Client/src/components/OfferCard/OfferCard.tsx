import styles from './OfferCard.module.scss';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../routes/routes';

interface IOfferCardProps {
  id: string;
  title: string;
  price: string;
  imageSrc: string;
  description: string;
}

const OfferCard = ({
  id,
  title,
  price,
  imageSrc,
  description
}: IOfferCardProps) => {
  const classes = {
    action: styles.action,
    content: styles.content,
  };

  const action = (
    <CardActions>
      <IconButton aria-label="settings">
        <MoreVertIcon />
      </IconButton>
      <IconButton aria-label="share">
        <ShareIcon />
      </IconButton>
    </CardActions>
  );

  const history = useHistory();

  const handleDoubleClick = () => {
    history.push(Routes.offer.getPath(id));
  }

  return (
    <Card className={styles.offer} onDoubleClick={handleDoubleClick}>
      <CardHeader
        className={styles.header}
        classes={classes}
        action={action}
        title={title}
        subheader={price}
      />
      <CardMedia
        className={styles.media}
        image={imageSrc}
      />
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}

export default OfferCard;