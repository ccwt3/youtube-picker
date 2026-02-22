#### Introduction:
Silly picker is the thing that solves taking ages to choose a video while eating.
#### Objectives:
This project was aimed to make me go through a new web development ecosystem and propulse my abilities to learn "on the go" while maintaining the good practices I've learn all along.
#### Structure:
This project was created using the NextJs Framework.

It is structured by the frontend (app folder) with a minimalistic UI (ugly UI) which has a filter dialog which is a form with inputs type checkbox, when actioned the button "apply filters" it stores the filters in local Storage so whenever the user goes in it will keep the preferences.

When actioned the get Video button it gets the filters from local storage and builds a query with the selected filter and passes them to the  `app/api/video` as a GET method.

the `app/api/` folder has only one route, the `/video` route receives query parameters and calls the database, using the parameters to filter the results and return the YouTube link type `/embed/` for returning it to the frontend and change the video without refreshing the page.

**The Gold Star**: 
 (This process is completely separated from the user interactions).
 
 The `harvester` folder contains a script which works based on 3 main functions.
 
 The `generalFetcher` is ensured to build the queries that are going to be passed to the `YouTube Data v3` API, the queries are built thanks to the implementation of the Gemini API which based on a prompt, will generate a JSON type result with the `q=` parameter ready to inject into the parameters. At the end we will extract only the ID and title of the video and return those references.

 With the references returned we will call the `individualFetcher` who is going to iterate over the references and get the individual metadata of each video (language, duration, title, YouTube channel ID, etc.) sanitize and pass the Array of Objects ready to upload.

At the end the `populateDB` will ensure to upload, normalize and deal with duplicated items in the database, returning 201 if all the operation succeeded.
#### Database:

| video    | tags     | video_tags    |
| -------- | -------- | ------------- |
| id (PK)  | id (PK)  | id (PK)       |
| videoUrl | tag_name | video_id (FK) |
| title    |          | tag_id (FK)   |
| category |          |               |
| language |          |               |
| author   |          |               |
| duration |          |               |

**SQL code:**
``` SQL
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
  duration text,
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
```

#### Technologies:
- NextJs.
- Supabase.
- YouTube Data API v3.
- Gemini API.

#### How to run:
For local development you should use the [Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started?queryGroups=platform&platform=windows&queryGroups=access-method&access-method=studio). Along with two .env files:
`.env`: this file used for the `harvester` script.
- NEXT_PUBLIC_SUPABASE_URL
- SUPABASE_SERVICE_KEY
- API_KEY (YouTube API key)
- GEMINI (gemini API key)

`.env.local`: This file used for the NextJs runtime functions.
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

The page is separated in two, Next and Harvester, For the Next app the scripts are:
- `pnpm sb_start` (starting the supabase CLI)
- `pnpm dev` (Starting the localhost:3000 page)

And for the harvester is:
- `pnpm sb_start`
- `pnpm harvester`
