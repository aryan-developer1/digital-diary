export interface DiaryResponse {
    success: boolean
    message: string
    diariess: Diary[]
  }
  
  export interface Diary {
    _id: string
    title: string
    date: string
    description: string
    user: string
    __v: number
    content?: string
    mood?: string
  }