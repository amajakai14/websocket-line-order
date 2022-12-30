-- CreateTable
CREATE TABLE "tbl_user" (
    "id" SERIAL NOT NULL,
    "mail_address" TEXT NOT NULL,
    "login_id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "tbl_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_table" (
    "id" SERIAL NOT NULL,
    "table_name" TEXT NOT NULL,
    "is_occupied" BOOLEAN NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "tbl_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_menu" (
    "id" SERIAL NOT NULL,
    "menu_name" TEXT NOT NULL,
    "menu_type" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "tbl_menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_course_on_menu" (
    "course_id" INTEGER NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "tbl_course_on_menu_pkey" PRIMARY KEY ("course_id","menu_id")
);

-- CreateTable
CREATE TABLE "tbl_course" (
    "id" SERIAL NOT NULL,
    "course_name" TEXT NOT NULL,
    "course_timelimit" INTEGER DEFAULT 90,
    "course_priority" INTEGER,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "tbl_course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_channel_provider" (
    "id" TEXT NOT NULL,
    "table_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "time_start" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "time_end" TIMESTAMP(3),

    CONSTRAINT "tbl_channel_provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_order" (
    "id" SERIAL NOT NULL,
    "menu_id" TEXT NOT NULL,
    "order_amount" INTEGER NOT NULL,
    "total_price" INTEGER NOT NULL,
    "process_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "channel_id" TEXT NOT NULL,

    CONSTRAINT "tbl_order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_user_mail_address_key" ON "tbl_user"("mail_address");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_user_login_id_key" ON "tbl_user"("login_id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_channel_provider_id_key" ON "tbl_channel_provider"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_channel_provider_user_id_table_id_key" ON "tbl_channel_provider"("user_id", "table_id");

-- AddForeignKey
ALTER TABLE "tbl_table" ADD CONSTRAINT "tbl_table_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tbl_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_menu" ADD CONSTRAINT "tbl_menu_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tbl_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_course_on_menu" ADD CONSTRAINT "tbl_course_on_menu_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "tbl_course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_course_on_menu" ADD CONSTRAINT "tbl_course_on_menu_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "tbl_menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_course_on_menu" ADD CONSTRAINT "tbl_course_on_menu_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tbl_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_course" ADD CONSTRAINT "tbl_course_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tbl_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_order" ADD CONSTRAINT "tbl_order_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "tbl_channel_provider"("id") ON DELETE CASCADE ON UPDATE CASCADE;
