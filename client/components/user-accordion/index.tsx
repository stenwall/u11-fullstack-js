import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { colorByString } from 'helpers/color-by-string';
import { ReactNode } from 'react';
import { format } from 'timeago.js';
import styles from './feed-view.module.scss';

interface Props {
  id: string;
  header: string;
  children: ReactNode;
}

const ListAccordion = (props: Props) => {
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls={props.id}
          id={props.id}
        >
          <Typography>{props.header}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>{props.children}</List>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ListAccordion;
