CREATE TABLE IF NOT EXISTS public.author (
    "id" BIGSERIAL PRIMARY KEY,
    "authorId" character varying(255),
    "firstName" character varying(255),
    "lastName" character varying(255),
    "email" character varying(255),
    "mobile" character varying(255),
    "password" character varying(255)
);