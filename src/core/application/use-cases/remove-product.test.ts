import { RemoveProduct } from './remove-product';

describe('RemoveProduct', () => {
  describe('removeOneById', () => {
    it('should remove a product', async () => {
      // Arrange
      const productRepository = {
        destroyOneById: jest.fn(),
      } as any;

      const findProducts = {
        findOneById: jest.fn(),
      } as any;

      const removeProduct = new RemoveProduct(productRepository, findProducts);

      // Act
      await removeProduct.removeOneById('1');

      // Assert
      expect(findProducts.findOneById).toHaveBeenCalledWith('1');
      expect(productRepository.destroyOneById).toHaveBeenCalledWith('1');
    });
  });
});
