import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { colorByString } from 'helpers/color-by-string';
import { format } from 'timeago.js';
import styles from './feed-view.module.scss';

interface Props {
  colorString: string;
  initials: string;
  firstname: string;
  lastname: string;
  post: string;
  createdAt: string | object | any;
}

const FeedView = (props: Props) => {
  return (
    <>
      <ListItem button alignItems="flex-start">
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: colorByString(props.colorString) }}>
            {props.initials}
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
      </ListItem>
    </>
  );
};

export default FeedView;
