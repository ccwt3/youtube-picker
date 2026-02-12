-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.
CREATE TABLE public.tags (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  tag_name text NOT NULL UNIQUE,
  CONSTRAINT tags_pkey PRIMARY KEY (id)
);
CREATE TABLE public.video (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  videoUrl text NOT NULL UNIQUE,
  title text NOT NULL,
  category text NOT NULL,
  language text,
  author text NOT NULL,
  CONSTRAINT video_pkey PRIMARY KEY (id)
);
CREATE TABLE public.video_tags (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  video_id bigint NOT NULL,
  tag_id bigint NOT NULL,
  CONSTRAINT video_tags_pkey PRIMARY KEY (id),
  CONSTRAINT video_tags_video_id_fkey FOREIGN KEY (video_id) REFERENCES public.video(id),
  CONSTRAINT video_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id)
);