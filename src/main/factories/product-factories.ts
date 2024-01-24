import { Repository } from '../../core/domain/repositories/repository';
import { AddProduct } from '../../core/application/use-cases/add-product';
import { UpdateProduct } from '../../core/application/use-cases/update-product';
import { FindProducts } from '../../core/application/use-cases/find-products';
import { RemoveProduct } from '../../core/application/use-cases/remove-product';
import {
  AddOneProductHttpController,
  FindManyProductsHttpController,
  RemoveOneProductHttpController,
  UpdateOneProductHttpController,
} from '../../core/presentation/controllers/product-http-controller';
import { CatchErrorHttpControllerDecorator } from '../../core/presentation/decorators/catch-error-http-controller-decorator';

export const makeAddOneProductHttpController = (repository: Repository) => {
  return new CatchErrorHttpControllerDecorator(
    new AddOneProductHttpController(new AddProduct(repository.product)),
  );
};

export const makeUpdateOneProductHttpController = (repository: Repository) => {
  return new CatchErrorHttpControllerDecorator(
    new UpdateOneProductHttpController(
      new UpdateProduct(
        repository.product,
        new FindProducts(repository.product),
      ),
    ),
  );
};

export const makeRemoveOneProductHttpController = (repository: Repository) => {
  return new CatchErrorHttpControllerDecorator(
    new RemoveOneProductHttpController(
      new RemoveProduct(
        repository.product,
        new FindProducts(repository.product),
      ),
    ),
  );
};

export const makeFindManyProductsHttpController = (repository: Repository) => {
  return new CatchErrorHttpControllerDecorator(
    new FindManyProductsHttpController(new FindProducts(repository.product)),
  );
};
