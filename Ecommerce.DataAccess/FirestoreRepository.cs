using Google.Cloud.Firestore;
using Ecommerce.Entities;

namespace Ecommerce.DataAccess
{
    public class FirestoreRepository<T> : IFirestoreRepository<T> where T : BaseEntity
    {
        private readonly FirestoreDb _firestoreDb;
        private readonly string _collectionName;

        public FirestoreRepository(FirestoreDb firestoreDb)
        {
            _firestoreDb = firestoreDb;
            // Simple pluralization convention: "Product" -> "Products"
            _collectionName = typeof(T).Name + "s"; 
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            CollectionReference collection = _firestoreDb.Collection(_collectionName);
            QuerySnapshot snapshot = await collection.GetSnapshotAsync();
            return snapshot.Documents.Select(doc => doc.ConvertTo<T>());
        }

        public async Task<T> GetByIdAsync(string id)
        {
            DocumentReference docRef = _firestoreDb.Collection(_collectionName).Document(id);
            DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();
            if (snapshot.Exists)
            {
                return snapshot.ConvertTo<T>();
            }
            return null;
        }

        public async Task AddAsync(T entity)
        {
            CollectionReference collection = _firestoreDb.Collection(_collectionName);
            // Use entity.Id as document ID
            DocumentReference docRef = collection.Document(entity.Id);
            await docRef.SetAsync(entity);
        }

        public async Task UpdateAsync(T entity)
        {
             DocumentReference docRef = _firestoreDb.Collection(_collectionName).Document(entity.Id);
             await docRef.SetAsync(entity, SetOptions.MergeAll);
        }

        public async Task DeleteAsync(string id)
        {
            DocumentReference docRef = _firestoreDb.Collection(_collectionName).Document(id);
            await docRef.DeleteAsync();
        }
    }
}
