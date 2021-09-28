// routes for posts
import * as controller from '../controllers/post.controller';
import { Request, Response, NextFunction, Application, Router } from 'express';
import middlewares from '../middlewares';

const verifyToken = middlewares.authJWT.verifyToken;

const postRoutes = (app: Application, router: Router) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  // create new post
  router.post('/', [verifyToken], controller.createPost);

  // get post by id
  router.get('/:id', [verifyToken], controller.findOnePost);

  // get post by id with comments
  router.get('/:id/comments', [verifyToken], controller.getPostWithComments)

  // get all posts by user id
  router.get(
    '/user/posts',
    [verifyToken],
    controller.findPostsByUserId
  );

  // update post by id
  router.put('/:id', [verifyToken], controller.updatePost);

  // delete post by id
  router.delete('/:id', [verifyToken], controller.deletePost);

  app.use('/api/post', router);
};

export default postRoutes;
