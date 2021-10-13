import {
  InputBase,
  IconButton,
  Drawer,
  List,
  Box,
  Divider,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useFormik } from 'formik';
import { ReactNode, useState } from 'react';
import http from 'helpers/http-common';
import FeedView from 'components/feed-view';

const SearchBar = () => {
  const [openDrawer, setOpenDrawer] = useState(false),
        [searchResult, setSearchResult] = useState<ReactNode>();

  const handleSearch = (query: any) => {
    http
      .get(`/search/${query.search}`)
      .then((res: any) => {
        const posts = res.data;
        setOpenDrawer(true);
        setSearchResult(
          <List>
            {posts &&
              posts.map(({ _id, body, user, createdAt }: any) => (
                <>
                  <Divider />
                  <FeedView
                    key={_id}
                    colorString={user.firstname + user.lastname}
                    initials={user.firstname[0] + user.lastname[0]}
                    firstname={user.firstname}
                    lastname={user.lastname}
                    createdAt={createdAt}
                    post={body}
                  />
                </>
              ))}
          </List>
        );
      })
      .catch((error) => {
        setOpenDrawer(true);
        setSearchResult(
          <Box sx={{ p: '1.5rem' }}>No posts matched your search.</Box>
        );
      });
  };

  const formik = useFormik({
    initialValues: {
      search: '',
    },
    onSubmit: handleSearch,
  });

  const drawerToggle = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <form className="search-wrapper" onSubmit={formik.handleSubmit}>
        <InputBase
          id="search-bar"
          name="search"
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          value={formik.values.search}
          onChange={formik.handleChange}
          error={formik.touched.search && Boolean(formik.errors.search)}
        />
        <IconButton
          value="search"
          size="large"
          aria-label="search"
          type="submit"
        >
          <Search />
        </IconButton>
      </form>
      <Drawer
        variant="temporary"
        anchor="top"
        open={openDrawer}
        onClose={drawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {searchResult}
      </Drawer>
    </>
  );
};

export default SearchBar;
