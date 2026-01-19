import "./App.css";
import i568x128 from "./images/568x128.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  library,
  type IconProp,
  type SizeProp,
} from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { cloneElement, useState, type JSX } from "react";

library.add(fas, far, fab);

type Props = {
  children?: JSX.Element | JSX.Element[] | string;
  [key: string]: any;
};

const SqImg = () => {
  return <div className="w-32 h-32 bg-slate-400"></div>;
};

const FullImg = () => {
  return (
    <div className="h-32 bg-slate-400">{/* <img src={i568x128}></img> */}</div>
  );
};

function App() {
  const text = {
    intro:
      "I’m Richard. Below, you'll find games, project, videos, and (suprizingly) hip-hip songs I've created. Once a week, I record a casual podcast with a friend about Indie Game Dev.",
    games:
      "A collection of indie games I've made for jams, personal projects, and self-expression.",
    projects:
      "Various tools, puzzles, and prototypes. Often browser based with React or VanillaJS.",
    videos:
      "Abstract slice of life videos - sometimes tutorials - more often aspiring absurdist non-fiction.",
    music:
      "Against all odds, I make drill/hip-hop–style songs about video games, coding competitions, MinnMax, and more.",
    gameDevInProcess:
      "A conversational podcast where two game devs - and sometimes a guest - talk about life and games.",
  };

  const [isRunning, setIsRunning] = useState(false);

  function Details({ open, close, summary, details }: Props) {
    const [expand, setExpand] = useState(false);
    const clone = cloneElement(summary(expand ? open : close), {
      onClick: () => {
        setExpand(!expand);
      },
    });
    return (
      <div className="flex flex-col p-4 gap-y-4 border-l-4 border-r-4 items-center hover:bg-gray-200 cursor-pointer">
        {clone}
        {expand && details}
      </div>
    );
  }

  function Icon({
    type,
    size,
  }: {
    type: IconProp;
    size: SizeProp | undefined;
  }) {
    return <FontAwesomeIcon icon={type} size={size} />;
  }

  function IconChip({
    className,
    ...props
  }: {
    className: string;
    [key: string]: any;
  }) {
    const { type, size } = props;
    return (
      <div
        className={`border-4 rounded-full p-2 flex items-center cursor-pointer ${className}`}
      >
        <Icon type={type} size={size} />
      </div>
    );
  }

  function ProjectCard({
    className,
    ...props
  }: {
    className?: string;
    [key: string]: any;
  }) {
    const { title, icon, description } = props;
    return (
      <div className={`flex flex-col gap-y-2 p-4 cursor-pointer ${className}`}>
        <div className="flex justify-between">
          <div className="flex gap-x-2 items-center text-teal-800">
            {icon}
            <div className="text-4xl text-slate-800">{title}</div>
          </div>
          <div className="flex gap-x-2 items-center text-teal-800/10">
            <Icon type={["fas", "up-right-from-square"]} size="xl" />
          </div>
        </div>
        <div className="text-slate-500 font-medium">{description}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center">
      <div className="max-w-150 flex grow bg-gray-50 py-16 px-4 flex-col gap-y-8">
        <FullImg />

        <div className="grid grid-cols-[auto_1fr] gap-x-2">
          <div
            className="w-32 h-32 flex justify-center items-center text-teal-800 bg-teal-800/20"
            onMouseOver={() => setIsRunning(true)}
            onMouseOut={() => setIsRunning(false)}
          >
            <Icon
              type={
                isRunning
                  ? ["fas", "person-running"]
                  : ["fas", "person-walking"]
              }
              size="3x"
            />
          </div>
          <div className="p-4 border-l-4">
            <div className="text-slate-500 font-medium">{text.intro}</div>
          </div>
        </div>

        <FullImg />

        <div>
          <ProjectCard
            className="hover:bg-slate-200 hover:border-slate-200"
            title="Games"
            icon={<Icon type={["fas", "gamepad"]} size="xl" />}
            description={text.games}
          />
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-x-2">
          <ProjectCard
            className="border-l-4 hover:bg-slate-200 hover:border-slate-200"
            title="Projects"
            icon={<Icon type={["fas", "splotch"]} size="xl" />}
            description={text.projects}
          />
          <SqImg />
        </div>

        <FullImg />

        <div className="grid grid-cols-[auto_1fr] gap-x-2">
          <SqImg />
          <ProjectCard
            className="border-r-4 hover:bg-slate-200 hover:border-slate-200"
            title="Videos"
            icon={<Icon type={["fas", "video"]} size="xl" />}
            description={text.videos}
          />
        </div>

        <ProjectCard
          className="hover:bg-slate-200 hover:border-slate-200"
          title="Music"
          icon={<Icon type={["fas", "microphone"]} size="xl" />}
          description={text.music}
        />

        <FullImg />

        <ProjectCard
          className="border-l-4 border-r-4 hover:bg-slate-200 hover:border-slate-200"
          title="Game Dev In Process"
          icon={<Icon type={["fas", "podcast"]} size="xl" />}
          description={text.gameDevInProcess}
        />

        <div className="grid grid-cols-[auto_1fr] gap-x-2">
          <SqImg />
          <div className="flex justify-center p-4 gap-x-8">
            <IconChip
              className="hover:bg-indigo-200 hover:border-indigo-200"
              type={["fab", "youtube"]}
              size="2xl"
            ></IconChip>
            <IconChip
              className="hover:bg-green-200 hover:border-green-200"
              type={["fab", "itch-io"]}
              size="2xl"
            ></IconChip>
            <IconChip
              className="hover:bg-orange-200 hover:border-orange-200"
              type={["fab", "github-alt"]}
              size="2xl"
            ></IconChip>
            <IconChip
              className="hover:bg-gray-200 hover:border-gray-200"
              type={["fab", "linkedin-in"]}
              size="2xl"
            ></IconChip>
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-y-2 p-4">
            <div className="flex gap-x-2 items-center">
              <FontAwesomeIcon icon={["fas", "computer-mouse"]} size="xl" />
              <div className="text-4xl">Interactive Things</div>
              <FontAwesomeIcon icon={["fas", "arrow-turn-down"]} size="xl" />
            </div>
            <div className="">
              This is the description of games. I talk about what my idea is
              with games.
            </div>
          </div>
        </div>

        <Details
          open={<FontAwesomeIcon icon={["fas", "chevron-down"]} size="xl" />}
          close={<FontAwesomeIcon icon={["fas", "chevron-right"]} size="xl" />}
          summary={(icon: JSX.Element) => {
            return (
              <div className="grid grid-cols-[1fr_auto] gap-x-2">
                <div className="flex flex-col gap-y-2">
                  <div className="flex gap-x-2 items-center">
                    <div className="text-4xl">Title</div>
                  </div>
                  <div className="">
                    This is the description of games. I talk about what my idea
                    is with games.
                  </div>
                </div>
                <div className="flex items-center">{icon}</div>
              </div>
            );
          }}
          details={
            <div
              className="w-125 h-125 bg-gray-400
                flex justify-center items-center"
            >
              Game Area
            </div>
          }
        />

        <FullImg />

        <FullImg />
      </div>
    </div>
  );
}

export default App;
