import { Router } from 'express';
import { Repository } from '../../core/domain/repositories/repository';
import { adaptRoute } from './route';
import {
  makeAddOneProductHttpController,
  makeFindManyProductsHttpController,
  makeRemoveOneProductHttpController,
  makeUpdateOneProductHttpController,
} from '../factories/product-factories';

export const productRoutes = (router: Router, repository: Repository) => {
  router.post(
    '/products',
    adaptRoute(makeAddOneProductHttpController(repository)),
  );
  router.put(
    '/products/:id',
    adaptRoute(makeUpdateOneProductHttpController(repository)),
  );
  router.delete(
    '/products/:id',
    adaptRoute(makeRemoveOneProductHttpController(repository)),
  );
  router.get(
    '/products',
    adaptRoute(makeFindManyProductsHttpController(repository)),
  );
};
