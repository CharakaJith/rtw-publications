CREATE TABLE IF NOT EXISTS public.book (
    "id" serial primary key,
    "bookId" character varying(255),
    "title" character varying(255),
    "authorId" character varying(255),
    "category" character varying(255),
    "isbn" character varying(255),
    "likes" integer
);