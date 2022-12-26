-- CreateTable
CREATE TABLE "customer" (
    "id" SERIAL NOT NULL,
    "mail_address" TEXT NOT NULL,
    "login_id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "table" (
    "id" SERIAL NOT NULL,
    "table_name" TEXT NOT NULL,
    "customer_id" INTEGER NOT NULL,

    CONSTRAINT "table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu" (
    "id" SERIAL NOT NULL,
    "menu_name" TEXT NOT NULL,
    "menu_type" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "customer_id" INTEGER NOT NULL,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course" (
    "id" SERIAL NOT NULL,
    "course_name" TEXT NOT NULL,
    "course_timelimit" INTEGER DEFAULT 90,
    "course_priority" INTEGER,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "customer_id" INTEGER NOT NULL,

    CONSTRAINT "course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "channel_provider" (
    "id" TEXT NOT NULL,
    "table_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "time_start" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "time_end" TIMESTAMP(3),

    CONSTRAINT "channel_provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "menu_id" TEXT NOT NULL,
    "order_amount" INTEGER NOT NULL,
    "total_price" INTEGER NOT NULL,
    "process_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "channel_id" TEXT NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_mail_address_key" ON "customer"("mail_address");

-- CreateIndex
CREATE UNIQUE INDEX "customer_login_id_key" ON "customer"("login_id");

-- CreateIndex
CREATE UNIQUE INDEX "channel_provider_id_key" ON "channel_provider"("id");

-- CreateIndex
CREATE UNIQUE INDEX "channel_provider_customer_id_table_id_key" ON "channel_provider"("customer_id", "table_id");

-- AddForeignKey
ALTER TABLE "table" ADD CONSTRAINT "table_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu" ADD CONSTRAINT "menu_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channel_provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
