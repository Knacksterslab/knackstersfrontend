# API Routes (Deprecated)

⚠️ **This directory is deprecated.**

All API routes have been moved to a separate backend server located in the `/backend` directory.

## 🔄 Migration

The backend has been separated from the Next.js application. To use the API:

1. **Start the backend server:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Use the API client in your frontend code:**
   ```typescript
   import { adminApi } from '@/lib/api/client';
   
   // Example usage
   const data = await adminApi.getContent();
   ```

3. **See the migration guide** for detailed instructions:
   - `/MIGRATION_GUIDE.md` - Complete migration guide
   - `/backend/README.md` - Backend documentation

## 🎯 Why Separate Backend?

- **Better architecture**: Clear separation of concerns
- **Scalability**: Scale frontend and backend independently
- **Flexibility**: Host on different platforms if needed
- **Development**: Easier testing and development

## 📚 Documentation

- Backend API: `/backend/README.md`
- API Client: `/lib/api/client.ts`
- Migration Guide: `/MIGRATION_GUIDE.md`
