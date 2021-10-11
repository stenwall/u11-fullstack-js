import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { colorByString } from 'helpers/color-by-string';
import { format } from 'timeago.js';
import styles from './feed-view.module.scss';

interface Props {
  firstname: string;
  lastname: string;
  createdAt: string | object | any;
}

const ListUserView = (props: Props) => {
  return (
    <>
      <Divider />
      <ListItem button alignItems="flex-start">
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: colorByString(`${props.firstname} ${props.lastname}`) }}>
          {props.firstname[0] + props.lastname[0]}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={props.firstname + props.lastname}
          secondary={`member since ${new Date(props.createdAt).toLocaleDateString()}`}
        />
      </ListItem>
    </>
  );
};

export default ListUserView;
