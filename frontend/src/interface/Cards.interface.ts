export interface Cards{
    id?: number,
    title: string,
    subtitle: string,
    content: string,
    img: string,
    comments?: {user: string, img: string, message: string}[]
}