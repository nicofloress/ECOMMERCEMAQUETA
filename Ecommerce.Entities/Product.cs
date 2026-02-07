using Google.Cloud.Firestore;

namespace Ecommerce.Entities
{
    [FirestoreData]
    public class Product : BaseEntity
    {
        [FirestoreProperty]
        public string Name { get; set; }

        [FirestoreProperty]
        public string Description { get; set; }

        [FirestoreProperty]
        public decimal Price { get; set; }

        [FirestoreProperty]
        public int Stock { get; set; }

        [FirestoreProperty]
        public string ImageUrl { get; set; }

        [FirestoreProperty]
        public string CategoryId { get; set; }
    }
}
