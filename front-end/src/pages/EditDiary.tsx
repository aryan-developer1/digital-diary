import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type DiaryFormSchema } from "../schemas/diary_form_schema";
import { useMutation } from "@tanstack/react-query";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function EditDiary() {
  const navigate = useNavigate();
  const location = useLocation();
  const diary = location.state?.diary;

  const form = useForm<DiaryFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: diary?.title,
      date: new Date(diary?.date),
      mood: diary?.mood,
      description: diary?.description,
      content: diary?.content,
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: DiaryFormSchema) => {
      await api.post(`/diary/update/${diary?._id}`, values);
    },
    onSuccess: () => {
      form.reset(); // Reset form after full submission
      navigate("/diary");
    },
    onError: (error) => {
      console.error("Error creating diary:", error);
    },
  });

  const onSubmit = (values: DiaryFormSchema) => {
    // Final submit with content
    console.log("Final Diary:", values);
    mutation.mutate(values);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 flex items-center justify-center py-8 px-2">
      <div className="w-[95vw] max-w-6xl mx-auto rounded-3xl shadow-2xl border border-gray-200 bg-white/80 backdrop-blur-lg transition-all duration-500">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 py-8 px-4 md:px-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-amber-600 tracking-tight drop-shadow-xl flex items-center gap-2">
            <span className="inline-block bg-gradient-to-r from-amber-400 to-pink-400 bg-clip-text text-transparent">
              Digital Diary
            </span>
            <span className="text-4xl">📓</span>
          </h2>
          <p className="text-gray-500 text-center text-base md:text-lg mt-1">
            Capture your day, mood, and memories beautifully.
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 px-4 md:px-10 pb-10"
          >
            {/* Responsive Fields Row */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-1">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400 text-lg">
                        📝
                      </span>
                      <FormControl>
                        <Input
                          placeholder="Title..."
                          {...field}
                          className="pl-10 rounded-2xl border-gray-200 focus:border-amber-400 focus:ring-amber-300 shadow-sm bg-white/70"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Date */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-1">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 text-lg">
                        📅
                      </span>
                      <FormControl>
                        <Input
                          type="date"
                          value={field.value.toISOString().split("T")[0]}
                          onChange={(e) =>
                            field.onChange(new Date(e.target.value))
                          }
                          className="pl-10 rounded-2xl border-gray-200 focus:border-blue-400 focus:ring-blue-300 shadow-sm bg-white/70"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Mood */}
              <FormField
                control={form.control}
                name="mood"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-1">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400 text-lg">
                        💖
                      </span>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="pl-10 rounded-2xl border-gray-200 focus:border-pink-400 focus:ring-pink-300 shadow-sm bg-white/70">
                              <SelectValue placeholder="Mood..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="HAPPY">Happy 😊</SelectItem>
                            <SelectItem value="SAD">Sad 😢</SelectItem>
                            <SelectItem value="WORST">WORST 😡</SelectItem>
                            <SelectItem value="BEST">BEST 😌</SelectItem>
                            <SelectItem value="ROMANTIC">
                              ROMANTIC 🤩
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400 text-lg">
                        ✏️
                      </span>
                      <FormControl>
                        <Input
                          placeholder="Brief description..."
                          {...field}
                          className="pl-10 rounded-2xl border-gray-200 focus:border-green-400 focus:ring-green-300 shadow-sm bg-white/70"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Content - always visible */}
            <div className="animate-fade-in-up">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormControl>
                      <Textarea
                        placeholder="Write your thoughts..."
                        {...field}
                        className="rounded-2xl border-gray-200 focus:border-amber-400 focus:ring-amber-300 min-h-[350px] md:min-h-[400px] w-full bg-white/80 shadow-inner text-lg transition-all duration-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Button for mobile */}
            <div className="md:hidden col-span-1">
              <Button
                disabled={mutation.isPending}
                type="submit"
                className=" cursor-pointer w-full mt-2 bg-gradient-to-r from-amber-400 to-pink-400 hover:from-amber-500 hover:to-pink-500 text-white font-bold px-6 py-3 rounded-2xl shadow-lg transition-all duration-300"
              >
                {mutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
            {/* Button for desktop */}
            <div className="hidden md:flex justify-end">
              <Button
                disabled={mutation.isPending}
                type="submit"
                className="cursor-pointer bg-gradient-to-r from-amber-400 to-pink-400 hover:from-amber-500 hover:to-pink-500 text-white font-bold px-8 py-3 rounded-2xl shadow-lg transition-all duration-300 text-lg"
              >
                {mutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
