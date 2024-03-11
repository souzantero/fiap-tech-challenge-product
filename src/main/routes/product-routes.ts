import { Router } from 'express';
import { Repository } from '../../core/domain/repositories/repository';
import { adaptRoute } from '../adapters/express-adapter';
import {
  makeAddOneProductHttpController,
  makeFindManyProductsHttpController,
  makeRemoveOneProductHttpController,
  makeUpdateOneProductHttpController,
} from '../factories/product-factories';
import { authorization } from '../middlewares/authorization-middleware';

export const productRoutes = (router: Router, repository: Repository) => {
  router.post(
    '/products',
    authorization,
    adaptRoute(makeAddOneProductHttpController(repository)),
  );
  router.put(
    '/products/:id',
    authorization,
    adaptRoute(makeUpdateOneProductHttpController(repository)),
  );
  router.delete(
    '/products/:id',
    authorization,
    adaptRoute(makeRemoveOneProductHttpController(repository)),
  );
  router.get(
    '/products',
    adaptRoute(makeFindManyProductsHttpController(repository)),
  );
};
