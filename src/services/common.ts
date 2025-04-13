import { CreateComment } from "@/types";
import { axiosClient } from "./axios";

export async function createComment(data: CreateComment) {
  try {
    const response = await axiosClient.post(
      "/api/guestbook/create-comment",
      data
    );
    return response.data;
  } catch {
    throw new Error("Gagal mengirim komentar");
  }
}

export async function getGithubUser(username: string) {
  try {
    const response = await axiosClient.get(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
      }
    );

    return response.data;
  } catch {
    throw new Error("Gagal mengambil data pengguna GitHub");
  }
}

export async function getComments() {
  try {
    const response = await axiosClient.get("/api/guestbook/get-comments");
    return response.data;
  } catch {
    throw new Error("Gagal mengambil komentar");
  }
}
