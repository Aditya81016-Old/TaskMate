export interface UserInterface {
    _id: string,
    name: string,
    email: string,
    password: string,
    categories: CategoryInterface[],
}

export interface CategoryInterface {
    name: string,
    todos: [],
    urlName: string,
    _id: string
}