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
import type { Diary } from "../interfaces/diary";
import { Button } from "../components/ui/button";
import { formatDateTime } from "../utils/formate_date";
import { useNavigate } from "react-router-dom";
import { NotebookPen } from "lucide-react";
import { Edit } from "lucide-react";
import { Trash2 } from "lucide-react";
import PaginationControls from "../components/custom_components/Pagination";
import { debounce } from "lodash";
import { useMemo } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";

const Diary = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSetSearchTerm = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
      }, 500),
    []
  );

  const limit = 9;
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["diary", currentPage, limit, searchTerm],
    queryFn: async () => {
      const response = await api.get(
        `/diary/diaries?page=${currentPage}&limit=${limit}&search=${searchTerm}`
      );
      return response?.data;
    },
  });

  const diaries = data?.diaries || [];
  const totalPages = Math.ceil((data?.total || 0) / limit);

  console.log("checking", diaries, totalPages);

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
    <div className="relative flex flex-col gap-2 pb-4 min-h-[80vh]">
      {/* Subtle background overlays for depth */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-24 left-10 w-80 h-80 bg-gradient-to-br from-pink-200/30 via-indigo-100/30 to-sky-100/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tr from-indigo-400/20 via-pink-200/20 to-sky-300/20 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>
      {diaries.length === 0 ? (
        <div className="text-center text-lg font-semibold text-indigo-400 py-16">
          No data found
        </div>
      ) : (
        <div>
          {/* Search & Actions Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 rounded-2xl bg-white/70 shadow-lg mb-6 border border-indigo-100">
            <div className="flex flex-wrap gap-4 items-center">
              {/* Search Input */}
              <input
                type="text"
                value={searchInput}
                placeholder="Search diary..."
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  debouncedSetSearchTerm(e.target.value);
                }}
                className="border-2 border-indigo-200 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 transition max-w-xs bg-white/80"
              />
              {/* Mood Select */}
              <Select
                onValueChange={(value: string) => {
                  setSearchTerm(value);
                  setCurrentPage(1);
                }}
                defaultValue={searchTerm}
              >
                <SelectTrigger className="w-[180px] rounded-lg border-indigo-200 bg-white/80 shadow-sm focus:ring-2 focus:ring-pink-200">
                  <SelectValue placeholder="Mood..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HAPPY">Happy 😊</SelectItem>
                  <SelectItem value="SAD">Sad 😢</SelectItem>
                  <SelectItem value="WORST">WORST 😡</SelectItem>
                  <SelectItem value="BEST">BEST 😌</SelectItem>
                  <SelectItem value="ROMANTIC">ROMANTIC 🤩</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              className="bg-gradient-to-r from-indigo-500 to-pink-400 text-white font-semibold px-6 py-2 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-transform duration-200 flex items-center gap-2"
              onClick={() => navigate("/diary/create")}
            >
              <NotebookPen className="mr-2 h-4 w-4" />
              Write Diary
            </Button>
          </div>
          {/* Diary Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-8">
            {diaries.map((diary: Diary) => (
              <Card
                key={diary._id}
                className="bg-white/80 backdrop-blur-lg shadow-2xl border-2 border-transparent group hover:border-pink-300 hover:scale-[1.03] transition-all duration-300 rounded-3xl overflow-hidden flex flex-col min-h-[320px] relative"
              >
                <CardHeader className="p-6 border-b border-indigo-100 bg-gradient-to-r from-indigo-50 via-pink-50 to-sky-50">
                  <CardTitle className="text-2xl font-bold text-indigo-700 group-hover:text-pink-500 transition-colors">
                    {diary.title}
                  </CardTitle>
                  <CardDescription className="mt-2 text-gray-500 text-base italic">
                    {diary.description.length > 20
                      ? `${diary.description.slice(0, 20)}...`
                      : diary.description}
                  </CardDescription>

                  <CardAction
                    className={`mt-4 inline-block px-4 py-1 text-xs rounded-full font-bold shadow ${
                      diary.mood === "HAPPY"
                        ? "bg-green-100 text-green-600"
                        : diary.mood === "SAD"
                        ? "bg-blue-100 text-blue-600"
                        : diary.mood === "WORST"
                        ? "bg-red-100 text-red-600"
                        : diary.mood === "BEST"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-pink-100 text-pink-600"
                    }`}
                  >
                    {diary.mood}
                  </CardAction>
                </CardHeader>
                <CardContent className="p-6 flex-1">
                  <p className="text-gray-700 text-base leading-relaxed line-clamp-4">
                    {diary.content}
                  </p>
                </CardContent>
                <CardFooter className="flex flex-row justify-between items-center p-6 border-t border-indigo-100 bg-white/60">
                  <p className="text-xs text-gray-400 italic">
                    {formatDateTime(diary.date)}
                  </p>
                  <div className="flex flex-row gap-2">
                    <Button
                      className="bg-gradient-to-r from-indigo-400 to-pink-300 text-white hover:from-pink-400 hover:to-indigo-300 shadow-md rounded-full px-3 py-2 transition-all"
                      onClick={() =>
                        navigate(`/diary/edit/${diary._id}`, {
                          state: { diary },
                        })
                      }
                    >
                      <Edit className="mr-1 h-4 w-4" />
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-pink-400 to-indigo-400 text-white hover:from-red-400 hover:to-pink-500 shadow-md rounded-full px-3 py-2 transition-all"
                      onClick={() => deleteMutation.mutate(diary._id)}
                    >
                      {deleteMutation.isPending ? (
                        "Deleting..."
                      ) : (
                        <Trash2 className="mr-1 h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          <PaginationControls
            page={currentPage}
            setPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default Diary;
