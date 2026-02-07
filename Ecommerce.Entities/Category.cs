using Google.Cloud.Firestore;

namespace Ecommerce.Entities
{
    [FirestoreData]
    public class Category : BaseEntity
    {
        [FirestoreProperty]
        public string Name { get; set; }
        
        [FirestoreProperty]
        public string Description { get; set; }
    }
}
