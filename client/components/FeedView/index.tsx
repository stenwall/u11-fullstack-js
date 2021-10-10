import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material"
import { colorByString } from "helpers/color-by-string";

interface Props {
  colorString: string;
  initials: string;
  firstname: string;
  lastname: string;
  post: string;
}

const FeedView = (props: Props) => {
  return (
    <>
      <ListItem
        button
        divider
        alignItems="flex-start"
      >
        <ListItemAvatar>
          <Avatar
            sx={{bgcolor: colorByString(props.colorString)}}
          >
            {props.initials}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${props.firstname} ${props.lastname}`}
          secondary={props.post}
        />
      </ListItem>
    </>
  )
}

export default FeedView;
