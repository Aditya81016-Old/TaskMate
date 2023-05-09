export interface UserInterface {
    _id: string,
    name: string,
    email: string,
    password: string,
    categories: CategoryInterface[],
}

export interface CategoryInterface {
    name: string,
    todos: TaskInterface[],
    urlName: string,
    _id: string
}

export interface TaskInterface {
    task: string,
    taskUrl: string,
    state: string,
    _id: string
}