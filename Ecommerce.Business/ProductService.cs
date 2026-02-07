using Ecommerce.DataAccess;
using Ecommerce.Entities;

namespace Ecommerce.Business
{
    public class ProductService : IProductService
    {
        private readonly IFirestoreRepository<Product> _productRepository;

        public ProductService(IFirestoreRepository<Product> productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await _productRepository.GetAllAsync();
        }

        public async Task<Product> GetProductByIdAsync(string id)
        {
            return await _productRepository.GetByIdAsync(id);
        }

        public async Task<Product> CreateProductAsync(Product product)
        {
            // Business logic: e.g. validate price, check category exists (omitted for now)
            if (product.Price < 0)
                throw new ArgumentException("Price cannot be negative.");

            await _productRepository.AddAsync(product);
            return product;
        }

        public async Task UpdateProductAsync(Product product)
        {
             // Validate if exists logic could go here
             await _productRepository.UpdateAsync(product);
        }

        public async Task DeleteProductAsync(string id)
        {
            await _productRepository.DeleteAsync(id);
        }
    }
}
