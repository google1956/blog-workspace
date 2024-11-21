export type Blog = {
    _id?: string
    title: string
    slug: string
    description: string
    thumbnail_url: string
    type: string
    category: string
    tags: string[]
    access: number
    status: number
    public_date: Date
    created_by: string

};