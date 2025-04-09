import { CreateComment } from "@/types";
import { axiosClient } from "./axios";

export async function createComment(data: CreateComment) {
  try {
    const response = await axiosClient.post("/guestbook/create-comment", data);
    return response.data;
  } catch {
    throw new Error("Gagal mengirim komentar");
  }
}

export async function getComments() {
  try {
    const response = await axiosClient.get("/guestbook/get-comments");
    return response.data;
  } catch {
    throw new Error("Gagal mengambil komentar");
  }
}
