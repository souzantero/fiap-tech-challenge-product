import { UpdateProduct } from './update-product';

describe('UpdateProduct', () => {
  describe('updateOneById', () => {
    it('should update a product', async () => {
      // Arrange
      const updatedProduct = {
        id: '1',
        type: 'drink',
        name: 'Coca-Cola 350ml',
        description: 'Coca-Cola 350ml',
        price: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      const productRepository = {
        updateOneById: jest.fn().mockReturnValue(updatedProduct),
      } as any;

      const findProducts = {
        findOneById: jest.fn(),
      } as any;

      const updateProduct = new UpdateProduct(productRepository, findProducts);

      // Act
      const returnedProduct = await updateProduct.updateOneById('1', {
        name: 'Coca-Cola 350ml',
      });

      // Assert
      expect(findProducts.findOneById).toHaveBeenCalledWith('1');
      expect(productRepository.updateOneById).toHaveBeenCalledWith('1', {
        name: 'Coca-Cola 350ml',
      });

      expect(returnedProduct).toBe(updatedProduct);
    });
  });
});
