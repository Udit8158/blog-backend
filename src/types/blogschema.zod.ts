import * as z from 'zod'

// user input while creating blog
const BlogUserInput = z.object({
    title: z.string().min(10).max(100),
    content: z.string().min(10).max(2000),
})

export default BlogUserInput;