using Google.Cloud.Firestore;

namespace Ecommerce.Entities
{
    [FirestoreData]
    public class BaseEntity
    {
        [FirestoreProperty]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [FirestoreProperty]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
