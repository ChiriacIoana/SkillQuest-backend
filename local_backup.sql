--
-- PostgreSQL database dump
--

\restrict Q8JYCGrIW3ChpoCRB0rFdGmX7xHjCPzZ1AB1a7JNczOpghtLCKiLx22ByogD72m

-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: skilluser
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO skilluser;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Achievement; Type: TABLE; Schema: public; Owner: skilluser
--

CREATE TABLE public."Achievement" (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    icon text NOT NULL,
    "xpRequired" integer,
    "questsRequired" integer,
    category text NOT NULL,
    rarity text DEFAULT 'common'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Achievement" OWNER TO skilluser;

--
-- Name: Achievement_id_seq; Type: SEQUENCE; Schema: public; Owner: skilluser
--

CREATE SEQUENCE public."Achievement_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Achievement_id_seq" OWNER TO skilluser;

--
-- Name: Achievement_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: skilluser
--

ALTER SEQUENCE public."Achievement_id_seq" OWNED BY public."Achievement".id;


--
-- Name: Quest; Type: TABLE; Schema: public; Owner: skilluser
--

CREATE TABLE public."Quest" (
    "questId" integer NOT NULL,
    xp integer NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "questName" text NOT NULL,
    description text,
    category text DEFAULT 'Calculus'::text NOT NULL,
    difficulty text DEFAULT 'Intermediate'::text NOT NULL,
    "questionIds" integer[] DEFAULT ARRAY[]::integer[]
);


ALTER TABLE public."Quest" OWNER TO skilluser;

--
-- Name: Quest_questId_seq; Type: SEQUENCE; Schema: public; Owner: skilluser
--

CREATE SEQUENCE public."Quest_questId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Quest_questId_seq" OWNER TO skilluser;

--
-- Name: Quest_questId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: skilluser
--

ALTER SEQUENCE public."Quest_questId_seq" OWNED BY public."Quest"."questId";


--
-- Name: QuizQuestion; Type: TABLE; Schema: public; Owner: skilluser
--

CREATE TABLE public."QuizQuestion" (
    id integer NOT NULL,
    "externalId" text,
    source text NOT NULL,
    category text NOT NULL,
    difficulty text,
    question text NOT NULL,
    "answersJson" text NOT NULL,
    "correctIndex" integer,
    xp integer DEFAULT 50 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."QuizQuestion" OWNER TO skilluser;

--
-- Name: QuizQuestion_id_seq; Type: SEQUENCE; Schema: public; Owner: skilluser
--

CREATE SEQUENCE public."QuizQuestion_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."QuizQuestion_id_seq" OWNER TO skilluser;

--
-- Name: QuizQuestion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: skilluser
--

ALTER SEQUENCE public."QuizQuestion_id_seq" OWNED BY public."QuizQuestion".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: skilluser
--

CREATE TABLE public."User" (
    username text NOT NULL,
    password text NOT NULL,
    "userId" integer NOT NULL,
    "completedQuests" integer DEFAULT 0 NOT NULL,
    "currentXP" integer DEFAULT 0 NOT NULL,
    level integer DEFAULT 1 NOT NULL,
    "nextLevelXP" integer DEFAULT 500 NOT NULL,
    streak integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."User" OWNER TO skilluser;

--
-- Name: UserAchievement; Type: TABLE; Schema: public; Owner: skilluser
--

CREATE TABLE public."UserAchievement" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "achievementId" integer NOT NULL,
    "unlockedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."UserAchievement" OWNER TO skilluser;

--
-- Name: UserAchievement_id_seq; Type: SEQUENCE; Schema: public; Owner: skilluser
--

CREATE SEQUENCE public."UserAchievement_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."UserAchievement_id_seq" OWNER TO skilluser;

--
-- Name: UserAchievement_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: skilluser
--

ALTER SEQUENCE public."UserAchievement_id_seq" OWNED BY public."UserAchievement".id;


--
-- Name: UserQuest; Type: TABLE; Schema: public; Owner: skilluser
--

CREATE TABLE public."UserQuest" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "questId" integer NOT NULL,
    completed boolean DEFAULT false NOT NULL,
    "completedAt" timestamp(3) without time zone
);


ALTER TABLE public."UserQuest" OWNER TO skilluser;

--
-- Name: UserQuest_id_seq; Type: SEQUENCE; Schema: public; Owner: skilluser
--

CREATE SEQUENCE public."UserQuest_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."UserQuest_id_seq" OWNER TO skilluser;

--
-- Name: UserQuest_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: skilluser
--

ALTER SEQUENCE public."UserQuest_id_seq" OWNED BY public."UserQuest".id;


--
-- Name: User_userId_seq; Type: SEQUENCE; Schema: public; Owner: skilluser
--

CREATE SEQUENCE public."User_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_userId_seq" OWNER TO skilluser;

--
-- Name: User_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: skilluser
--

ALTER SEQUENCE public."User_userId_seq" OWNED BY public."User"."userId";


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: skilluser
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO skilluser;

--
-- Name: Achievement id; Type: DEFAULT; Schema: public; Owner: skilluser
--

ALTER TABLE ONLY public."Achievement" ALTER COLUMN id SET DEFAULT nextval('public."Achievement_id_seq"'::regclass);


--
-- Name: Quest questId; Type: DEFAULT; Schema: public; Owner: skilluser
--

ALTER TABLE ONLY public."Quest" ALTER COLUMN "questId" SET DEFAULT nextval('public."Quest_questId_seq"'::regclass);


--
-- Name: QuizQuestion id; Type: DEFAULT; Schema: public; Owner: skilluser
--

ALTER TABLE ONLY public."QuizQuestion" ALTER COLUMN id SET DEFAULT nextval('public."QuizQuestion_id_seq"'::regclass);


--
-- Name: User userId; Type: DEFAULT; Schema: public; Owner: skilluser
--

ALTER TABLE ONLY public."User" ALTER COLUMN "userId" SET DEFAULT nextval('public."User_userId_seq"'::regclass);


--
-- Name: UserAchievement id; Type: DEFAULT; Schema: public; Owner: skilluser
--

ALTER TABLE ONLY public."UserAchievement" ALTER COLUMN id SET DEFAULT nextval('public."UserAchievement_id_seq"'::regclass);


--
-- Name: UserQuest id; Type: DEFAULT; Schema: public; Owner: skilluser
--

ALTER TABLE ONLY public."UserQuest" ALTER COLUMN id SET DEFAULT nextval('public."UserQuest_id_seq"'::regclass);


--
-- Data for Name: Achievement; Type: TABLE DATA; Schema: public; Owner: skilluser
--

COPY public."Achievement" (id, name, description, icon, "xpRequired", "questsRequired", category, rarity, "createdAt") FROM stdin;
1	First Quest Completed	Complete your very first quest	🎯	\N	1	quests	common	2025-11-08 19:52:47.057
2	Quest Apprentice	Complete 5 quests	⚔️	\N	5	quests	common	2025-11-08 19:52:47.101
3	Quest Master	Complete 10 quests	🏆	\N	10	quests	rare	2025-11-08 19:52:47.106
8	Quest Legend	Complete 25 quests	👑	\N	25	quests	epic	2025-11-08 19:58:16.056
4	100 XP Club	Earn 100 total XP	💯	100	\N	xp	common	2025-11-08 19:52:47.111
5	XP Warrior	Earn 500 total XP	⚡	500	\N	xp	rare	2025-11-08 19:52:47.119
6	XP Legend	Earn 1000 total XP	🌟	1000	\N	xp	epic	2025-11-08 19:52:47.125
9	XP God	Earn 5000 total XP	🔥	5000	\N	xp	legendary	2025-11-08 19:58:16.112
7	Learning Streak	Complete quests 5 days in a row	🔥	\N	\N	streak	rare	2025-11-08 19:52:47.131
10	Dedication	Complete quests 10 days in a row	💪	\N	\N	streak	epic	2025-11-08 19:58:16.131
100	Login Successful	Welcome to SkillQuest!	👽	\N	\N		common	2025-11-08 22:34:33.668
\.


--
-- Data for Name: Quest; Type: TABLE DATA; Schema: public; Owner: skilluser
--

COPY public."Quest" ("questId", xp, "isActive", "questName", description, category, difficulty, "questionIds") FROM stdin;
10	170	t	Advanced TypeScript Patterns	Learn how to structure large-scale TypeScript applications using advanced patterns, type composition, and reusable utility types for maintainable code.	Next.js	Advanced	{}
11	170	t	TypeScript + React in Depth	Master the integration of TypeScript with React. Explore typed hooks, props, state management, and how to leverage generics for scalable React components.	Next.js	Intermediate	{}
12	80	t	DOM Manipulation & Events	Discover how to interact with the DOM, handle user events, and create dynamic web pages using vanilla JavaScript.	Next.js	Intermediate	{}
13	70	t	Objects & Prototypes	Learn how to work with JavaScript objects, understand prototypes, and master object-oriented programming concepts in JS.	Next.js	Intermediate	{}
9	50	t	Debugging & Clustering	Become a Node.js problem-solver! Master debugging techniques, isolate performance issues, and harness the power of the cluster module.	NodeJs	Beginner	{15,16,20}
1	160	t	React Fundamentals	Learn the essential concepts that form the backbone of React — components, rendering behavior, and basic hooks. A perfect start for understanding how React thinks.	React	Advanced	{3,4,5}
2	100	t	State Management & Performance	Dive into the world of React’s state updates and optimization. Understand how React schedules updates and manages performance in real-world scenarios.	React	Beginner	{1,7,8,9}
4	60	t	HTML Basics	Learn the core building blocks of HTML, including tags, attributes, and basic page structure. Perfect for beginners starting with web development.	HTML	Intermediate	{32,33,34,35,39}
5	80	t	HTML Meta & Measurments	Dive deeper into HTML with metadata, character encoding, and measurement elements to enhance your web pages.	HTML	Intermediate	{36,37}
6	120	t	HTML Optimization & Restrictions	Master advanced HTML techniques for performance, accessibility, and proper element usage.	HTML	Advanced	{31,38,40}
3	75	t	Advanced React Architecture	Take your React skills to the next level by mastering scalable patterns, complex dashboards, and integrating with CMS or large component libraries.	React	Intermediate	{2,6,10}
7	70	t	Node.js Core Operations	Learn the essential Node.js features — file operations, HTTP modules, and the basics of running multiple processes efficiently.	NodeJs	Intermediate	{11,12,17,18}
8	90	t	Streams & Memory Mastery	Dive deeper into Node.js internals — learn how to efficiently handle large data streams and detect memory leaks in complex applications.	NodeJs	Advanced	{13,14}
\.


--
-- Data for Name: QuizQuestion; Type: TABLE DATA; Schema: public; Owner: skilluser
--

COPY public."QuizQuestion" (id, "externalId", source, category, difficulty, question, "answersJson", "correctIndex", xp, "createdAt", "updatedAt") FROM stdin;
3	1665	quizapi	React	Easy	What happens when you return 'null' from a React component's render method?	{"answer_a":"It causes an error","answer_b":"The component renders an empty div","answer_c":"Nothing is rendered to the DOM","answer_d":"It renders undefined","answer_e":null,"answer_f":null}	2	50	2025-11-08 09:05:43.005	2025-11-08 17:21:13.611
1	9870	quizapi	React	Medium	In a React application, users report inconsistent behavior when using the browser's back button. Which routing implementation would best resolve this issue?	{"answer_a":"Disable the browser's back button","answer_b":"Implement proper history management with state persistence","answer_c":"Use hash-based routing exclusively","answer_d":"Reload the full page on every navigation","answer_e":null,"answer_f":null}	0	20	2025-11-08 09:05:43.005	2025-11-08 18:50:38.94
2	9894	quizapi	React	Hard	A React application using a headless CMS needs to implement preview functionality for content editors. Which approach would be most effective?	{"answer_a":"Reload the page whenever content changes","answer_b":"Implement a draft API connection with real-time updates and preview components","answer_c":"Ask editors to use their imagination","answer_d":"Create a separate preview application","answer_e":null,"answer_f":null}	3	30	2025-11-08 09:05:43.005	2025-11-08 18:51:29.855
33	9617	quizapi	HTML	Easy	Which attribute sets the width of an HTML element?	{"answer_a":"size","answer_b":"width","answer_c":"length","answer_d":"w","answer_e":null,"answer_f":null}	1	40	2025-11-08 09:11:22.742	2025-11-08 18:56:18.095
4	1718	quizapi	React	Medium	What is the purpose of React's new useFormStatus hook?	{"answer_a":"To validate form inputs","answer_b":"To access form submission status in form actions","answer_c":"To handle form state","answer_d":"To manage form layouts","answer_e":null,"answer_f":null}	1	50	2025-11-08 09:05:43.005	2025-11-08 09:05:43.005
11	4748	quizapi	NodeJs	Medium	How can you copy a file in Node.js?	{"answer_a":"Use fs.copyFile()","answer_b":"Use fs.rename()","answer_c":"Use fs.duplicate()","answer_d":"Use fs.writeFile() with the source content","answer_e":null,"answer_f":null}	1	50	2025-11-08 09:11:06.506	2025-11-08 09:11:06.506
12	4579	quizapi	NodeJs	Medium	How do you handle multiple Promises in sequence?	{"answer_a":"Using 'Promise.all()'","answer_b":"Using a chain of '.then()' calls","answer_c":"Using 'Promise.race()'","answer_d":"Using 'async_hooks'","answer_e":null,"answer_f":null}	2	50	2025-11-08 09:11:06.506	2025-11-08 09:11:06.506
13	4696	quizapi	NodeJs	Hard	How can you stream large file responses in an HTTP server?	{"answer_a":"Use 'fs.createReadStream()' and pipe it to 'res'","answer_b":"Read the entire file with 'fs.readFile()' and send it with 'res.end()'","answer_c":"Store the file in memory and send it in chunks with 'res.write()'","answer_d":"Directly attach the file path to 'res.sendFile()'","answer_e":null,"answer_f":null}	2	50	2025-11-08 09:11:06.506	2025-11-08 09:11:06.506
14	4836	quizapi	NodeJs	Hard	How can you detect memory leaks in a worker process?	{"answer_a":"Monitor memory usage with 'process.memoryUsage()' and set thresholds","answer_b":"Listen for the 'memoryLeak' event on the worker","answer_c":"Enable memory leak detection in cluster.setupMaster()","answer_d":"Workers automatically restart on memory leaks","answer_e":null,"answer_f":null}	2	50	2025-11-08 09:11:06.506	2025-11-08 09:11:06.506
15	4793	quizapi	NodeJs	Easy	Which method is used to check if the current process is the master process?	{"answer_a":"cluster.isMaster","answer_b":"cluster.isPrimary","answer_c":"process.isMaster","answer_d":"cluster.isWorker","answer_e":null,"answer_f":null}	1	50	2025-11-08 09:11:06.506	2025-11-08 09:11:06.506
16	4841	quizapi	NodeJs	Hard	How do you debug individual worker processes in a cluster?	{"answer_a":"Pass '--inspect' to the 'execArgv' option when forking workers","answer_b":"Use the 'cluster.debug()' method","answer_c":"Enable debugging in cluster.setupMaster()","answer_d":"Debugging is not supported for workers","answer_e":null,"answer_f":null}	3	50	2025-11-08 09:11:06.506	2025-11-08 09:11:06.506
17	4671	quizapi	NodeJs	Easy	What module is used to create an HTTP server in Node.js?	{"answer_a":"http","answer_b":"fs","answer_c":"events","answer_d":"os","answer_e":null,"answer_f":null}	3	50	2025-11-08 09:11:06.506	2025-11-08 09:11:06.506
18	3755	quizapi	NodeJs	Medium	What does the 'net.createServer()' method do?	{"answer_a":"Creates an HTTP server","answer_b":"Creates a TCP server","answer_c":"Creates a UDP server","answer_d":"Creates a file server","answer_e":null,"answer_f":null}	3	50	2025-11-08 09:11:06.506	2025-11-08 09:11:06.506
19	3680	quizapi	NodeJs	Easy	Which of these is an example of a core module in Node.js?	{"answer_a":"express","answer_b":"mongodb","answer_c":"fs","answer_d":"sequelize","answer_e":null,"answer_f":null}	1	50	2025-11-08 09:11:06.506	2025-11-08 09:11:06.506
20	3781	quizapi	NodeJs	Hard	What is the purpose of 'http2.createSecureServer()' in Node.js?	{"answer_a":"To create an HTTP/2 server using TLS","answer_b":"To manage HTTP/2 sessions","answer_c":"To encrypt HTTP/1.1 connections","answer_d":"To create a duplex stream","answer_e":null,"answer_f":null}	0	50	2025-11-08 09:11:06.506	2025-11-08 09:11:06.506
21	3997	quizapi	Next.js	Easy	What is the purpose of the 'pages' directory in a Next.js application?	{"answer_a":"To store component files only","answer_b":"To define routes based on the file structure","answer_c":"To store static assets","answer_d":"To configure build settings","answer_e":null,"answer_f":null}	1	50	2025-11-08 09:11:16.588	2025-11-08 09:11:16.588
22	4009	quizapi	Next.js	Easy	What happens when you add 'export default' to a page component in Next.js?	{"answer_a":"Nothing special happens","answer_b":"The component becomes a valid page route","answer_c":"The component becomes private","answer_d":"The component cannot be imported","answer_e":null,"answer_f":null}	0	50	2025-11-08 09:11:16.588	2025-11-08 09:11:16.588
23	4014	quizapi	Next.js	Easy	What is the purpose of the 'getStaticProps' function in Next.js?	{"answer_a":"To fetch data on each request","answer_b":"To fetch data at build time for static pages","answer_c":"To handle form submissions","answer_d":"To manage page state","answer_e":null,"answer_f":null}	3	50	2025-11-08 09:11:16.588	2025-11-08 09:11:16.588
24	4007	quizapi	Next.js	Easy	How can you include global CSS in a Next.js application?	{"answer_a":"Import it in any component file","answer_b":"Import it in _app.js","answer_c":"Import it in index.js","answer_d":"Import it in the public folder","answer_e":null,"answer_f":null}	3	50	2025-11-08 09:11:16.588	2025-11-08 09:11:16.588
6	9853	quizapi	React	Medium	Your team's React component library has grown to 100+ components. Which documentation approach would best improve developer productivity?	{"answer_a":"Create PDF documentation with screenshots","answer_b":"Set up Storybook with MDX documentation and interactive examples","answer_c":"Use extensive inline code comments","answer_d":"Create video tutorials for each component","answer_e":null,"answer_f":null}	3	40	2025-11-08 09:05:43.005	2025-11-08 18:51:29.855
10	9885	quizapi	React	Hard	Your React project requires a complex dashboard with real-time data. Which data fetching strategy would perform best?	{"answer_a":"Fetch all data on load with a single API call","answer_b":"Implement a data fetching layer with WebSockets and selective updates","answer_c":"Poll the API every second for all dashboard data","answer_d":"Load data only when users click a refresh button","answer_e":null,"answer_f":null}	0	40	2025-11-08 09:05:43.005	2025-11-08 18:51:29.855
5	1742	quizapi	React	Medium	What is the difference between React.memo and Pure Component?	{"answer_a":"React.memo is for functional components, Pure Component is for class components","answer_b":"React.memo is more performant","answer_c":"Pure Component has more features","answer_d":"They serve different purposes","answer_e":null,"answer_f":null}	3	60	2025-11-08 09:05:43.005	2025-11-08 18:51:45.457
25	4005	quizapi	Next.js	Easy	What is the purpose of the 'next.config.js' file?	{"answer_a":"To store environment variables","answer_b":"To customize the Next.js configuration","answer_c":"To define database schemas","answer_d":"To store user data","answer_e":null,"answer_f":null}	3	50	2025-11-08 09:11:16.588	2025-11-08 09:11:16.588
26	4054	quizapi	Next.js	Easy	Your team's Next.js dashboard needs real-time updates. Which approach is most suitable for beginners?	{"answer_a":"Regular HTTP polling","answer_b":"SWR hook with automatic revalidation","answer_c":"Manual WebSocket implementation","answer_d":"Page refresh","answer_e":null,"answer_f":null}	3	50	2025-11-08 09:11:16.588	2025-11-08 09:11:16.588
27	4011	quizapi	Next.js	Easy	What is the purpose of the 'Head' component in Next.js?	{"answer_a":"To create headers in the page","answer_b":"To modify the document head and manage meta tags","answer_c":"To style the top of the page","answer_d":"To create navigation menus","answer_e":null,"answer_f":null}	1	50	2025-11-08 09:11:16.588	2025-11-08 09:11:16.588
28	4210	quizapi	Next.js	Easy	What's the best way to handle failed client-side navigation in Next.js?	{"answer_a":"Ignore errors","answer_b":"Use Router.events with error boundaries","answer_c":"Refresh page","answer_d":"Disable navigation","answer_e":null,"answer_f":null}	0	50	2025-11-08 09:11:16.588	2025-11-08 09:11:16.588
29	4432	quizapi	Next.js	Medium	What's the best way to handle form validation errors?	{"answer_a":"Alert messages","answer_b":"Inline validation with aria-live","answer_c":"Console logs","answer_d":"No feedback","answer_e":null,"answer_f":null}	3	50	2025-11-08 09:11:16.588	2025-11-08 09:11:16.588
30	4336	quizapi	Next.js	Hard	How would you implement real-time multiplayer features in Next.js?	{"answer_a":"Regular updates","answer_b":"WebSocket with game state synchronization","answer_c":"HTTP polling","answer_d":"Local state","answer_e":null,"answer_f":null}	1	50	2025-11-08 09:11:16.588	2025-11-08 09:11:16.588
35	9645	quizapi	HTML	Easy	Which HTML attribute is used to identify an element uniquely within a page?	{"answer_a":"class","answer_b":"id","answer_c":"unique","answer_d":"name","answer_e":null,"answer_f":null}	2	50	2025-11-08 09:11:22.742	2025-11-08 09:11:22.742
36	9518	quizapi	HTML	Medium	What is the purpose of the <meta charset='UTF-8'> tag?	{"answer_a":"Set the font style","answer_b":"Enable animations","answer_c":"Define language","answer_d":"Set character encoding","answer_e":null,"answer_f":null}	2	50	2025-11-08 09:11:22.742	2025-11-08 09:11:22.742
37	9564	quizapi	HTML	Medium	What HTML element is used to display a scalar measurement within a known range?	{"answer_a":"<meter>","answer_b":"<range>","answer_c":"<progress>","answer_d":"<gauge>","answer_e":null,"answer_f":null}	0	50	2025-11-08 09:11:22.742	2025-11-08 09:11:22.742
7	1720	quizapi	React	Hard	How does React handle the scheduling of multiple setState updates?	{"answer_a":"Updates are processed in random order","answer_b":"Updates are processed in the order they were scheduled, with batching optimization","answer_c":"Only the last update is processed","answer_d":"Updates are processed immediately","answer_e":null,"answer_f":null}	1	20	2025-11-08 09:05:43.005	2025-11-08 18:50:54.911
8	9908	quizapi	React	Medium	A React application is experiencing inconsistent behavior with cleanup of effects and subscriptions. Which lifecycle management approach would be most effective?	{"answer_a":"Ignore cleanup and let the browser handle it","answer_b":"Implement comprehensive cleanup in useEffect return functions","answer_c":"Reload the page frequently to reset everything","answer_d":"Avoid using effects and subscriptions","answer_e":null,"answer_f":null}	0	30	2025-11-08 09:05:43.005	2025-11-08 18:50:54.911
9	1641	quizapi	React	Hard	What is the purpose of the useTransition hook in React 18?	{"answer_a":"To create CSS transitions","answer_b":"To manage route transitions","answer_c":"To mark state updates as non-urgent and show a pending state","answer_d":"To handle component mounting transitions","answer_e":null,"answer_f":null}	3	30	2025-11-08 09:05:43.005	2025-11-08 18:50:54.911
32	9668	quizapi	HTML	Easy	How do you specify a background color in an HTML element using inline CSS?	{"answer_a":"background='color'","answer_b":"style='background-color: color;'","answer_c":"color='background'","answer_d":"bgcolor='color'","answer_e":null,"answer_f":null}	0	40	2025-11-08 09:11:22.742	2025-11-08 18:56:18.095
34	9548	quizapi	HTML	Easy	Which attribute specifies the URL of an image in the <img> tag?	{"answer_a":"href","answer_b":"src","answer_c":"alt","answer_d":"title","answer_e":null,"answer_f":null}	3	40	2025-11-08 09:11:22.742	2025-11-08 18:56:18.095
39	9634	quizapi	HTML	Easy	What HTML element is used to specify the main language of the document?	{"answer_a":"lang","answer_b":"language","answer_c":"meta-lang","answer_d":"lang-attribute","answer_e":null,"answer_f":null}	1	55	2025-11-08 09:11:22.742	2025-11-08 18:56:18.095
31	9811	quizapi	HTML	Easy	How can you optimize the loading time of a web page that contains multiple images?	{"answer_a":"Use SVG images for all content","answer_b":"Lazy load images offscreen","answer_c":"Increase image resolution for better quality","answer_d":"Embed images directly in the HTML code","answer_e":null,"answer_f":null}	0	60	2025-11-08 09:11:22.742	2025-11-08 18:57:13.954
38	9712	quizapi	HTML	Hard	Which HTML attribute specifies that an element should not be checked during form validation?	{"answer_a":"novalidate","answer_b":"no-validate","answer_c":"formnovalidate","answer_d":"validate='false'","answer_e":null,"answer_f":null}	1	65	2025-11-08 09:11:22.742	2025-11-08 18:57:36.664
40	9720	quizapi	HTML	Medium	Which HTML element is used for creating a clickable image map?	{"answer_a":"<imagemap>","answer_b":"<map>","answer_c":"<area>","answer_d":"<clickmap>","answer_e":null,"answer_f":null}	0	65	2025-11-08 09:11:22.742	2025-11-08 18:57:36.664
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: skilluser
--

COPY public."User" (username, password, "userId", "completedQuests", "currentXP", level, "nextLevelXP", streak) FROM stdin;
matei	banana123	2	30	500	12	100	45
test	testtest	3	0	0	1	500	0
ioana	test123	1	10	270	7	500	7
seed_user	password	4	0	0	1	500	0
\.


--
-- Data for Name: UserAchievement; Type: TABLE DATA; Schema: public; Owner: skilluser
--

COPY public."UserAchievement" (id, "userId", "achievementId", "unlockedAt") FROM stdin;
3	1	3	2025-11-08 20:01:46.429
2	1	4	2025-11-08 20:01:46.422
1	1	7	2025-11-08 20:01:46.407
\.


--
-- Data for Name: UserQuest; Type: TABLE DATA; Schema: public; Owner: skilluser
--

COPY public."UserQuest" (id, "userId", "questId", completed, "completedAt") FROM stdin;
1	1	10	t	2025-11-08 09:34:13.414
2	1	6	t	2025-11-08 11:33:08.335
3	1	5	t	2025-11-08 13:46:11.842
5	1	4	t	2025-11-08 15:39:13.353
4	1	1	t	2025-11-08 15:52:23.91
10	1	9	t	2025-11-08 22:27:51.528
12	1	8	t	2025-11-08 22:28:05.085
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: skilluser
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
1be50e27-e165-4530-9842-95e2607348d9	7bf66c7ff2604510e5bae6367437ae660296326bfb735eee5fc110368e1bb639	2025-11-06 13:20:06.762852+02	20251106112006_add_user_model	\N	\N	2025-11-06 13:20:06.726519+02	1
f429127e-aa1d-457f-838f-4333317b18c1	5b6e2fb52fb05043bb0dfec8cee2d6633c77dc467e3bd45cb7351cc2069e380f	2025-11-06 14:09:42.489302+02	20251106120942_rename_id_to_user_id	\N	\N	2025-11-06 14:09:42.42999+02	1
68d3af5b-3ac2-4821-90e6-12fc59f6e98f	1e0fcf85b9c9ab1bd7d3de2e83c24d9e90103bfbd36a335759923491dd359d24	2025-11-06 17:52:43.698944+02	20251106155243_add_quests	\N	\N	2025-11-06 17:52:43.66062+02	1
7c98b163-1ccf-444d-8b29-af028ac78c51	1d0c6a1afb3a72958bc2123f3d6fee9a7ba3eda8959c1f706a5552dd394caefc	2025-11-06 21:31:04.890625+02	20251106193104_add_quests_tables	\N	\N	2025-11-06 21:31:04.879321+02	1
39a42681-2f01-4f19-9289-506dc90036e8	af364f4b63a16b1b449796e42a4432bad46ccc359717f29edbc8368c6cf38ab6	2025-11-07 07:54:28.060239+02	20251107055428_update_next_level_xp	\N	\N	2025-11-07 07:54:28.051194+02	1
1612d202-5126-4f8c-aa58-1dfb7c3469fe	57cc592382c916d85b3ee6f9f4a570da6857ee5efc248f2603422179676a578c	2025-11-07 09:08:29.007085+02	20251107070828_add_quest_description	\N	\N	2025-11-07 09:08:29.002215+02	1
be12dcb9-d417-4a3b-b06d-3cddd0eea7a0	400047d4d302a243da56ddbf05f00c60cb86ba87edf2e43a8503cfe3712e2f18	2025-11-07 09:33:37.194379+02	20251107073337_add_quest_description	\N	\N	2025-11-07 09:33:37.190139+02	1
26e5fbe7-4111-4f4d-be98-d87ee42046fe	2be19de50cf7edc594de65734ea5b854d77e1872918f4bd634eb0548ec4fe17a	2025-11-07 10:32:35.974543+02	20251107083235_add_quest_category	\N	\N	2025-11-07 10:32:35.962975+02	1
321545bb-2abd-4468-8ee2-f45161ace982	3e1654db00bcc118a60bb0306289b217d492e2c43f1e6087ec834f8465b1f682	2025-11-07 18:05:42.433002+02	20251107160542_add_difficulty_to_quest	\N	\N	2025-11-07 18:05:42.422524+02	1
02284a4d-4d12-4bf5-9593-03d2d177bfc4	751090e3fb05b29900e573c4b55aa7f901bbc18588daf5bc64957b4e77baa390	2025-11-07 18:15:38.214148+02	20251107161538_add_difficulty_to_quest	\N	\N	2025-11-07 18:15:38.185904+02	1
5ce2d6b8-d366-4b82-9e23-48fc123c9f82	8b6ada079cdfb2e7bab9c472d0c3398122a3df3fd0db149b069fb2c0fdc4160a	2025-11-07 22:31:42.740345+02	20251107203142_add_quiz_question	\N	\N	2025-11-07 22:31:42.720878+02	1
6df557ec-1f1e-47ad-acc1-d32a96857fc9	98873a07ca171893fe2b059b5539e432ec66e6735c9bca62c9c3fbce923f7f36	2025-11-08 14:08:54.596927+02	20251108120854_add_question_ids_to_quest	\N	\N	2025-11-08 14:08:54.584929+02	1
fae7aa71-a52f-4893-8bc8-6da60b6b1127	4bc3bb275e0d01218f09262d5253a09afc83d058f6303b692b0fc3ece82b181b	2025-11-08 21:22:02.694063+02	20251108192202_add_achievements	\N	\N	2025-11-08 21:22:02.624228+02	1
\.


--
-- Name: Achievement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: skilluser
--

SELECT pg_catalog.setval('public."Achievement_id_seq"', 10, true);


--
-- Name: Quest_questId_seq; Type: SEQUENCE SET; Schema: public; Owner: skilluser
--

SELECT pg_catalog.setval('public."Quest_questId_seq"', 10, true);


--
-- Name: QuizQuestion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: skilluser
--

SELECT pg_catalog.setval('public."QuizQuestion_id_seq"', 40, true);


--
-- Name: UserAchievement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: skilluser
--

SELECT pg_catalog.setval('public."UserAchievement_id_seq"', 3, true);


--
-- Name: UserQuest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: skilluser
--

SELECT pg_catalog.setval('public."UserQuest_id_seq"', 12, true);


--
-- Name: User_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: skilluser
--

SELECT pg_catalog.setval('public."User_userId_seq"', 4, true);


--
-- Name: Achievement Achievement_pkey; Type: CONSTRAINT; Schema: public; Owner: skilluser
--

ALTER TABLE ONLY public."Achievement"
    ADD CONSTRAINT "Achievement_pkey" PRIMARY KEY (id);


--
-- Name: Quest Quest_pkey; Type: CONSTRAINT; Schema: public; Owner: skilluser
--

ALTER TABLE ONLY public."Quest"
    ADD CONSTRAINT "Quest_pkey" PRIMARY KEY ("questId");


--
-- Name: QuizQuestion QuizQuestion_pkey; Type: CONSTRAINT; Schema: public; Owner: skilluser
--

ALTER TABLE ONLY public."QuizQuestion"
    ADD CONSTRAINT "QuizQuestion_pkey" PRIMARY KEY (id);


--
-- Name: UserAchievement UserAchievement_pkey; Type: CONSTRAINT; Schema: public; Owner: skilluser
--

ALTER TABLE ONLY public."UserAchievement"
    ADD CONSTRAINT "UserAchievement_pkey" PRIMARY KEY (id);


--
-- Name: UserQuest UserQuest_pkey; Type: CONSTRAINT; Schema: public; Owner: skilluser
--

ALTER TABLE ONLY public."UserQuest"
    ADD CONSTRAINT "UserQuest_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: skilluser
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: skilluser
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: QuizQuestion_externalId_key; Type: INDEX; Schema: public; Owner: skilluser
--

CREATE UNIQUE INDEX "QuizQuestion_externalId_key" ON public."QuizQuestion" USING btree ("externalId");


--
-- Name: UserAchievement_userId_achievementId_key; Type: INDEX; Schema: public; Owner: skilluser
--

CREATE UNIQUE INDEX "UserAchievement_userId_achievementId_key" ON public."UserAchievement" USING btree ("userId", "achievementId");


--
-- Name: UserAchievement_userId_idx; Type: INDEX; Schema: public; Owner: skilluser
--

CREATE INDEX "UserAchievement_userId_idx" ON public."UserAchievement" USING btree ("userId");


--
-- Name: UserQuest_userId_questId_key; Type: INDEX; Schema: public; Owner: skilluser
--

CREATE UNIQUE INDEX "UserQuest_userId_questId_key" ON public."UserQuest" USING btree ("userId", "questId");


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: skilluser
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: UserAchievement UserAchievement_achievementId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: skilluser
--

ALTER TABLE ONLY public."UserAchievement"
    ADD CONSTRAINT "UserAchievement_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES public."Achievement"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserAchievement UserAchievement_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: skilluser
--

ALTER TABLE ONLY public."UserAchievement"
    ADD CONSTRAINT "UserAchievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"("userId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserQuest UserQuest_questId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: skilluser
--

ALTER TABLE ONLY public."UserQuest"
    ADD CONSTRAINT "UserQuest_questId_fkey" FOREIGN KEY ("questId") REFERENCES public."Quest"("questId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserQuest UserQuest_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: skilluser
--

ALTER TABLE ONLY public."UserQuest"
    ADD CONSTRAINT "UserQuest_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"("userId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict Q8JYCGrIW3ChpoCRB0rFdGmX7xHjCPzZ1AB1a7JNczOpghtLCKiLx22ByogD72m

