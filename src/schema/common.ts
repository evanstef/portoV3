import * as z from "zod";

export const createCommentSchema = z.object({
  comment: z
    .string({
      required_error: "Komentar harus diisi",
      invalid_type_error: "Komentar harus diisi",
    })
    .min(1, { message: "Komentar harus diisi" }),
});
