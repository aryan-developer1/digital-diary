import {z} from "zod"

export const formSchema  = z.object({
    title:z.string().min(2,"Title must be at least 2 characters long").max(20,"title cannot be more than 20 characters"),
    date:z.date(),
    mood:z.enum(["SAD", "HAPPY", "WORST", "BEST", "ROMANTIC"]),
    description:z.string().min(2,"Description must be at least 2 characters long"),
    content:z.string(),
})

export type DiaryFormSchema = z.infer<typeof formSchema>
