import './App.css'
import i568x128 from './images/568x128.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { cloneElement, useState, type JSX } from 'react';
library.add(fas, far, fab);

type Props = {
    children?: JSX.Element | JSX.Element[] | string;
    [key: string]: any;
};

const text = {
    intro: "Hey, I’m Richard. This is something something a description or explanation about  who I am and what you’ll find on this site"
}

const SqImg = () => {
    return (
        <div className='w-[128px] bg-gray-400'></div>
    );
};

const FullImg = () => {
    return (
        <div className='h-[128px] bg-gray-400'>
            {/* <img src={i568x128}></img> */}
        </div>
    );
};

function App() {

    function Details({open, close, summary, details}: Props) {
        const [expand, setExpand] = useState(false);
        const clone = cloneElement(summary(expand ? open : close), {
            onClick: () => { setExpand(!expand) }
        });
        return (
            <div className='flex flex-col p-4 gap-y-4 border-2 items-center'>
                {clone}
                {expand && details}
            </div>
        );
    }

    return (
        <div className='min-h-screen flex justify-center'>
            <div className='max-w-[600px] flex grow bg-gray-50 py-16 px-4 flex-col gap-y-4'>

                <FullImg />

                <div className='p-4 border-2'>
                    <div className=''>{text.intro}</div>
                </div>

                <div className='grid grid-cols-[1fr_auto] gap-x-2'>
                    <div className='flex flex-col gap-y-2 p-4 border-t-2 border-b-2 border-l-2'>
                        <div className='flex justify-between'>
                            <div className='flex gap-x-2 items-center'>
                                <div className='text-4xl'>Games</div>
                            </div>
                            <div className='flex gap-x-2 items-center'>
                                <FontAwesomeIcon icon={["fas", "gamepad"]} size="lg" />
                                <FontAwesomeIcon icon={["fas", "up-right-from-square"]} size="lg" />
                            </div>
                        </div>
                        <div className=''>This is the description of games. I talk about what my idea is with games.</div>
                    </div>
                    <SqImg />
                </div>

                <div>
                    <div className='flex flex-col gap-y-2 p-4'>
                        <div className='flex gap-x-2 items-center'>
                            <FontAwesomeIcon icon={["fas", "splotch"]} size="lg" />
                            <div className='text-4xl'>Projects</div>
                            <FontAwesomeIcon icon={["fas", "up-right-from-square"]} size="lg" />
                        </div>
                        <div className=''>This is the description of games. I talk about what my idea is with games.</div>
                    </div>
                </div>

                <div className='grid grid-cols-[auto_1fr] gap-x-2'>
                    <SqImg />
                    <div className='flex flex-col gap-y-2 p-4 border-t-2 border-r-2 border-b-2'>
                        <div className='flex justify-between'>
                            <div className='flex gap-x-2 items-center'>
                                <div className='text-4xl'>Videos</div>
                                <FontAwesomeIcon icon={["fas", "video"]} size="lg" />
                            </div>
                            <div className='flex gap-x-2 items-center'>
                                <FontAwesomeIcon icon={["fas", "up-right-from-square"]} size="lg" />
                            </div>
                        </div>
                        <div className=''>This is the description of games. I talk about what my idea is with games.</div>
                    </div>
                </div>

                <div>
                    <div className='flex flex-col gap-y-2 p-4 border-l-2 border-r-2'>
                        <div className='flex justify-between'>
                            <div className='flex gap-x-2 items-center'>
                                <div className='text-4xl'>Music</div>
                            </div>
                            <div className='flex gap-x-2 items-center'>
                                <FontAwesomeIcon icon={["fas", "microphone"]} size="lg" />
                                <FontAwesomeIcon icon={["fas", "up-right-from-square"]} size="lg" />
                            </div>
                        </div>
                        <div className=''>This is the description of games. I talk about what my idea is with games.</div>
                    </div>
                </div>

                <FullImg />

                <div>
                    <div className='flex flex-col gap-y-2 p-4 border-t-2 border-b-2'>
                        <div className='flex justify-between'>
                            <div className='flex gap-x-2 items-center'>
                                <FontAwesomeIcon icon={["fas", "podcast"]} size="lg" />
                                <div className='text-4xl'>Podcast</div>
                            </div>
                            <div className='flex gap-x-2 items-center'>
                                <FontAwesomeIcon icon={["fas", "up-right-from-square"]} size="lg" />
                            </div>
                        </div>
                        <div className=''>This is the description of games. I talk about what my idea is with games.</div>
                    </div>
                </div>

                <FullImg />

                <div>
                    <div className='flex flex-col gap-y-2 p-4 border-2'>
                        <div className='flex gap-x-2 items-center'>
                            <FontAwesomeIcon icon={["fas", "computer-mouse"]} size="lg" />
                            <div className='text-4xl'>Interactive Things</div>
                            <FontAwesomeIcon icon={["fas", "arrow-turn-down"]} size="lg" />
                        </div>
                        <div className=''>This is the description of games. I talk about what my idea is with games.</div>
                    </div>
                </div>

                <Details
                    open={<FontAwesomeIcon icon={["fas", "chevron-down"]} size="lg" />}
                    close={<FontAwesomeIcon icon={["fas", "chevron-right"]} size="lg" />}
                    summary={
                        (icon: JSX.Element) => { return (
                            <div className='grid grid-cols-[1fr_auto] gap-x-2'>
                                <div className='flex flex-col gap-y-2'>
                                    <div className='flex gap-x-2 items-center'>
                                        <div className='text-4xl'>Title</div>
                                    </div>
                                    <div className=''>This is the description of games. I talk about what my idea is with games.</div>
                                </div>
                                <div className='flex items-center'>{icon}</div>
                            </div>
                        )}
                    }
                    details={
                        <div className='w-[500px] h-[300px] bg-gray-400
                            flex justify-center items-center'
                        >Game Area</div>
                    }
                />

                <div className='flex justify-center p-4 gap-x-8'>
                    <div className='border-2 rounded-full p-4'>
                        <FontAwesomeIcon icon={["fas", "gamepad"]} size="lg" />
                    </div>
                    <div className='border-2 rounded-full p-4'>
                        <FontAwesomeIcon icon={["fas", "gamepad"]} size="lg" />
                    </div>
                    <div className='border-2 rounded-full p-4'>
                        <FontAwesomeIcon icon={["fas", "gamepad"]} size="lg" />
                    </div>
                    <div className='border-2 rounded-full p-4'>
                        <FontAwesomeIcon icon={["fas", "gamepad"]} size="lg" />
                    </div>
                </div>

                <FullImg />
                
                <FullImg />
                
                <FullImg />

            </div>
        </div>
    )
}

export default App
