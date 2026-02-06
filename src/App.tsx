import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  library,
  type IconProp,
  type SizeProp,
} from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { cloneElement, useRef, useState, type JSX } from "react";
import { Water } from "./components/water";
import { BackgroundBlobs } from "./components/BackgroundBlobs";
import gameDevLogo from "./assets/game_dev_logo.png";

library.add(fas, far, fab);

enum Suit {
  Spade = "Spade",
  Club = "Club",
  Heart = "Heart",
  Diamond = "Diamond",
}

type Props = {
  children?: JSX.Element | JSX.Element[] | string;
  [key: string]: any;
};

const SqImg = () => {
  return (
    <div className="w-32 h-32 hidden sm:inline-block">
      <div className="bg-gray-100 w-full h-full border-4"></div>
    </div>
  );
};

const Row = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="h-32">
      <div className="h-full border-4">{children}</div>
    </div>
  );
};

const FullImg = ({ img }: { img?: string }) => {
  return (
    <div className="h-32">
      <div
        className="h-full border-4 bg-gray-100"
        style={{
          backgroundImage: `url(${img})`,
          backgroundPositionX: "80px",
          animation: "scrollLeft 4s linear infinite",
        }}
      ></div>
    </div>
  );
};

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

function Icon({ type, size }: { type: IconProp; size: SizeProp | undefined }) {
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

const suitLookup: { [key in Suit]: string } = {
  [Suit.Spade]: "♠",
  [Suit.Club]: "♣",
  [Suit.Heart]: "♥",
  [Suit.Diamond]: "♦",
};

const suitColor: { [key in Suit]: string } = {
  [Suit.Spade]: "text-slate-800 opacity-70",
  [Suit.Club]: "text-teal-800 opacity-70",
  [Suit.Heart]: "text-rose-800 opacity-70",
  [Suit.Diamond]: "text-orange-800 opacity-70",
};

function CardChip({
  className,
  suit,
  ...props
}: {
  className: string;
  suit: Suit;
  [key: string]: any;
}) {
  const { type, size, number } = props;
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: any) {
    const angle = 30;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const mouse = {
      x: e.clientX - left - width / 2,
    };
    const mouseNormal = {
      x: (mouse.x / width) * 2,
    };
    const rotY = mouseNormal.x * angle;

    if (cardRef.current) {
      cardRef.current.style = `
        transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        transform: rotateX(10deg) rotateY(${rotY}deg);
      `;
    }
  }

  function handleMouseLeave(e: any) {
    if (cardRef.current) {
      cardRef.current.style = `
        transition: transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.25s;
        transform: rotateX(0deg) rotateY(0deg);
      `;
    }
  }

  return (
    <div
      className={`relative w-14 sm:w-20 h-22 sm:h-28 border-2 rounded-md px-1 flex justify-center cursor-pointer items-center ${className}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`absolute top-0 sm:top-1 left-1 ${suitColor[suit]}`}>
        <div className="leading-none">{number}</div>
        <div className="leading-none">{suitLookup[suit]}</div>
      </div>
      <div
        className={`flex justify-center scale-60 sm:scale-100 ${suitColor[suit]}`}
      >
        <Icon type={type} size={size} />
      </div>
      <div
        className={`absolute bottom-0 sm:bottom-1 right-1 ${suitColor[suit]}`}
      >
        <div className="leading-none rotate-180">{suitLookup[suit]}</div>
        <div className="leading-none rotate-180">{number}</div>
      </div>
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
    <div
      className={`flex flex-col gap-y-2 p-4 cursor-pointer hover:bg-gray-200 ${className}`}
    >
      <div className="flex justify-between">
        <div className="flex gap-x-2 items-center text-teal-800">
          {icon}
          <div className="text-4xl text-slate-800">{title}</div>
        </div>
        <div className="flex gap-x-2 items-center text-teal-800/20">
          <Icon type={["fas", "up-right-from-square"]} size="xl" />
        </div>
      </div>
      <div className="text-slate-500 font-medium">{description}</div>
    </div>
  );
}

function Details({ open, close, summary, details }: Props) {
  const [expand, setExpand] = useState(false);
  const clone = cloneElement(summary(expand ? open : close), {
    onClick: () => {
      setExpand(!expand);
    },
  });
  return (
    <div className="hidden sm:flex flex-col p-4 gap-y-4 border-l-4 border-r-4 items-center hover:bg-gray-200 cursor-pointer">
      {clone}
      {expand && details}
    </div>
  );
}

function App() {
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div className="flex justify-center relative">
      <BackgroundBlobs />
      <div className="relative z-5 max-w-150 grow min-w-0 flex flex-col p-4 bg-white gap-y-8 opacity-90">
        <FullImg />

        <div className="grid grid-rows-[auto_1fr] sm:grid-cols-[auto_1fr] gap-x-2">
          <div className="flex justify-center">
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
          </div>
          <div className="p-4 border-l-4 sm:border-l-0 border-r-4 border-teal-800/20">
            <div className="text-slate-500 font-medium">{text.intro}</div>
          </div>
        </div>

        <Row>
          <Water></Water>
        </Row>

        <div>
          <ProjectCard
            title="Games"
            icon={<Icon type={["fas", "gamepad"]} size="xl" />}
            description={text.games}
          />
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-x-2">
          <ProjectCard
            className="border-l-4"
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
            className="border-r-4"
            title="Videos"
            icon={<Icon type={["fas", "video"]} size="xl" />}
            description={text.videos}
          />
        </div>

        <ProjectCard
          title="Music"
          icon={<Icon type={["fas", "microphone"]} size="xl" />}
          description={text.music}
        />

        <FullImg img={gameDevLogo} />

        <ProjectCard
          className="border-l-0 border-r-0 sm:border-l-4 sm:border-r-4"
          title={
            <div>
              Game Dev{" "}
              <span className="sm:inline-block hidden">In Process</span>
            </div>
          }
          icon={<Icon type={["fas", "podcast"]} size="xl" />}
          description={text.gameDevInProcess}
        />

        <div className="flex justify-evenly items-center">
          <CardChip
            className="hover:bg-gray-200 hover:border-gray-200 text-teal-800"
            type={["fab", "youtube"]}
            size="2xl"
            number="7"
            suit={Suit.Diamond}
          ></CardChip>
          <CardChip
            className="hover:bg-gray-200 hover:border-gray-200 text-teal-800"
            type={["fab", "itch-io"]}
            size="2xl"
            number="7"
            suit={Suit.Heart}
          ></CardChip>
          <CardChip
            className="hover:bg-gray-200 hover:border-gray-200 text-teal-800"
            type={["fab", "github-alt"]}
            size="2xl"
            number="8"
            suit={Suit.Heart}
          ></CardChip>
          <CardChip
            className="hover:bg-gray-200 hover:border-gray-200 text-teal-800"
            type={["fa", "file"]}
            size="2xl"
            number="8"
            suit={Suit.Club}
          ></CardChip>
          <CardChip
            className="hover:bg-gray-200 hover:border-gray-200 text-teal-800"
            type={["fab", "linkedin-in"]}
            size="2xl"
            number="3"
            suit={Suit.Spade}
          ></CardChip>
        </div>

        <FullImg />

        <div className="hidden sm:inline-block">
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
      </div>
    </div>
  );
}

export default App;
