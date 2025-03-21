import { Client, Databases, ID, Query } from "appwrite";
import config from "../config/config";

export class AppwriteTodo{
    constructor(){
        this.client = new Client().setEndpoint(config.appwriteEndPoint).setProject(config.appwriteProjectId)

        this.database = new Databases(this.client)
    }

    // --------------------- todo --------------------

    async getTodo(userId){
        try {
            const response = await this.database.listDocuments(
                config.appwriteDatabaseId,
                config.appwritetodoCollectionId,
                [Query.equal('userId',userId)]
            )
            return response.documents
            
        } catch (error) {
            console.log(error,': from todo appwrite')
            
        }
    }

    async createTodo(userId , title){
        try {
            const data = await this.database.createDocument(
                config.appwriteDatabaseId,
                config.appwritetodoCollectionId,
                ID.unique(),
                {userId,title}
            )
            return data
        } catch (error) {
            console.log(error,': from todo appwrite createTodo')
        }
    }

    async deleteTodo(todoId){
        try {
            return await this.database.deleteDocument(
                config.appwriteDatabaseId,
                config.appwritetodoCollectionId,
                todoId
            )
        } catch (error) {
            console.log(error,': from todo appdelete deleteTodo')
        }

    }

    async updateTodo(todoId,title)
    {
       
        try {
            const newtitle = await this.database.updateDocument(
                config.appwriteDatabaseId,
                config.appwritetodoCollectionId,
                todoId,
                {title}
            )
            return newtitle
        } catch (error) {
            console.log(error,': from todo appupdate updateTodo')
        }
    }

    // --------------------------- Task ------------------------

    async addTask(todoId, title ,color= "#FEFCE8") { // Default color is gray
        try {
            console.log("🟢 Adding Task to Appwrite:", { todoId, title, color })
            const task = await this.database.createDocument(
                config.appwriteDatabaseId,
                config.appwritetaskCollectionId,
                
                ID.unique(),
                {
                    todoId,
                    title,
                    complete: false,  
                    color
                    // Date,
                    // DueDate             
                }
            );
            return task;
        } catch (error) {
            console.error(error, 'error adding task in Appwrite');
        }
    }
    

    async getTask(todoId)
    {
        try {
            const getTask = await this.database.listDocuments(
            config.appwriteDatabaseId,
            config.appwritetaskCollectionId,
           [ Query.equal('todoId', todoId)]
            )
            return getTask.documents
        } catch (error) {
            console.error(error, 'error getting task appwrite')
        }
    }
    async updateTask(taskId,title,color ,Date ,DueDate)
    {
       
        try {
            const newtitle = await this.database.updateDocument(
                config.appwriteDatabaseId,
                config.appwritetaskCollectionId,
                taskId,
                {title,color,Date ,DueDate}
            )
            return newtitle
        } catch (error) {
            console.log(error,': from task appupdate updateTodo')
        }
    }

    async deleteTask(taskId) {
        try {
            // Fetch all subtasks associated with the task
            const subtasks = await this.getSubTask(taskId);
    
            // Delete all subtasks
            for (const subtask of subtasks) {
                await this.deleteSubTask(subtask.$id);
            }
    
            // Delete the task
            return await this.database.deleteDocument(
                config.appwriteDatabaseId,
                config.appwritetaskCollectionId,
                taskId
            );
        } catch (error) {
            console.error(error, ': from todo appdelete deleteTask');
        }
    }

    //------------------------ subtask ------------------------------

    async addSubTask(taskId, content) { // Default color is gray
        try {
            console.log("🟢 Adding subtask:", { taskId, content });
            const task = await this.database.createDocument(
                config.appwriteDatabaseId,
                config.appwritesubtaskCollectionId,
                ID.unique(),
                {
                    taskId,
                    content,
                    complete: false,  // Default value
                                
                }
            );
            return task;
        } catch (error) {
            console.error(error, 'error adding subtask in Appwrite');
        }
    }

    async getSubTask(taskId)
    {
        try {
            const getSubTask = await this.database.listDocuments(
            config.appwriteDatabaseId,
            config.appwritesubtaskCollectionId,
           [ Query.equal('taskId', taskId)]
            )
            return getSubTask.documents
        } catch (error) {
            console.error(error, 'error getting task appwrite')
        }
    }


    async updateSubTask(subtaskId,content)
    {
       
        try {
            const newtitle = await this.database.updateDocument(
                config.appwriteDatabaseId,
                config.appwritesubtaskCollectionId,
                subtaskId,
                {content}
            )
            return newtitle
        } catch (error) {
            console.error(`Subtask with ID ${subtaskId} does not exist!`)
            console.log(error,': from task appwrite updateSubTodo')
        }
    }

    async deleteSubTask(subtaskId){
        try {
            return await this.database.deleteDocument(
                config.appwriteDatabaseId,
                config.appwritesubtaskCollectionId,
                subtaskId
            )
        } catch (error) {
            console.error(`Subtask with ID ${subtaskId} does not exist!`)
            console.log(error,': from todo appwrite deleteSubTask')
        }

    }

}

const appwritetodo = new AppwriteTodo()
export default appwritetodo