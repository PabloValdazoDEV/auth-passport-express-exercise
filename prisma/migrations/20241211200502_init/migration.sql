/*
  Warnings:

  - You are about to drop the `_PostToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_user` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_PostToUser" DROP CONSTRAINT "_PostToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostToUser" DROP CONSTRAINT "_PostToUser_B_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "id_user" TEXT NOT NULL;

-- DropTable
DROP TABLE "_PostToUser";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
