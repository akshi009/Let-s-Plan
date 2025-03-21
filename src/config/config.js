const config={
    appwriteEndPoint: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE),
    appwritetodoCollectionId: String(import.meta.env.VITE_APPWRITE_TODO_COLLECTION_ID),
    appwritetaskCollectionId: String(import.meta.env.VITE_APPWRITE_TASK_COLLECTION_ID),
    appwritesubtaskCollectionId: String(import.meta.env.VITE_APPWRITE_SUBTASK_COLLECTION_ID),
}
export default config