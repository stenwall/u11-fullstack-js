import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { colorByString } from 'helpers/color-by-string';
import { format } from 'timeago.js';
import styles from './feed-view.module.scss';

interface Props {
  firstname: string;
  lastname: string;
  post: string;
  createdAt: string | object | any;
}

const FeedView = (props: Props) => {
  return (
    <>
      <ListItemButton alignItems="flex-start">
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: colorByString(props.firstname + props.lastname) }}>
            {props.firstname[0] + props.lastname[0]}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              {`${props.firstname} ${props.lastname}`}
              <Typography
                className={styles.date}
                component="span"
                variant="body2"
              >
                {format(props.createdAt)}
              </Typography>
            </>
          }
          secondary={props.post}
        />
      </ListItemButton>
    </>
  );
};

export default FeedView;
