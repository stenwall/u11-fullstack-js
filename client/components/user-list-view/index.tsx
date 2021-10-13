import {
  Avatar,
  Divider,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { colorByString } from 'helpers/color-by-string';

interface Props {
  firstname: string;
  lastname: string;
  createdAt: string | object | any;
}

const ListUserView = (props: Props) => {
  return (
    <>
      <Divider />
      <ListItemButton alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            sx={{ bgcolor: colorByString(props.firstname + props.lastname) }}
          >
            {props.firstname[0] + props.lastname[0]}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${props.firstname} ${props.lastname}`}
          secondary={`member since ${new Date(
            props.createdAt
          ).toLocaleDateString()}`}
        />
      </ListItemButton>
    </>
  );
};

export default ListUserView;
