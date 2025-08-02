import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import api from "../services/api";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import type { DiaryResponse, Diary } from "../interfaces/diary";
import { Button } from "../components/ui/button";
import { formatDateTime } from "../utils/formate_date";
import { useNavigate } from "react-router-dom";

const Diary = () => {
  const navigate = useNavigate();
  const [diaries, setDiaries] = useState<Diary[]>([]);
  console.log("diaries", diaries);
  const { data, error, isLoading,refetch } = useQuery<DiaryResponse[]>({
    queryKey: ["diary"],
    queryFn: async () => {
      const response = await api.get("/diary/diaries");
      setDiaries(response?.data?.diaries);
      return response?.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/diary/delete/${id}`);
    },
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      console.error("Error creating diary:");
    },
  });

  console.log("data", data);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error:{error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className=" flex flex-row justify-between items-center">
        <div className="">filter option</div>
        <Button
          className="hover:cursor-pointer"
          onClick={() => navigate("/diary/create")}
        >
          Add Diary
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-8">
        {diaries.map((diary: Diary) => (
          <Card
            key={diary._id}
            className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-black-100 rounded-2xl overflow-hidden group "
          >
            <CardHeader className="p-6 border-b border-gray-100">
              <CardTitle className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                {diary.title}
              </CardTitle>
              <CardDescription className="mt-1 text-gray-500 text-sm">
                {diary.description}
              </CardDescription>
              <CardAction className="mt-2 inline-block px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full font-medium">
                {diary.mood}
              </CardAction>
            </CardHeader>

            <CardContent className="p-6">
              <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                {diary.content}
              </p>
            </CardContent>

            <CardFooter className="flex flex-row justify-between items-center p-6 border-t border-gray-100 text-right">
              <p className="text-xs text-gray-400 italic">
                {formatDateTime(diary.date)}
              </p>
              <div className="flex flex-row gap-2">
                <Button
                  className="hover:cursor-pointer"
                  onClick={() =>
                    navigate(`/diary/edit/${diary._id}`, { state: { diary } })
                  }
                >
                  Edit
                </Button>
                <Button className="hover:cursor-pointer" onClick={() => deleteMutation.mutate(diary._id)}>
                  {deleteMutation.isPending ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Diary;
