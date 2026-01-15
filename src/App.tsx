import './App.css'
import i128 from './images/128.png';
import i568x128 from './images/568x128.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { cloneElement, useState, type JSX } from 'react';
import cn from 'classnames';

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
        <div className='w-[128px] bg-gray-700'></div>
    );
};

const FullImg = () => {
    return (
        <div className='h-[128px] overflow-hidden'>
            <img src={i568x128}></img>
        </div>
    );
};

function App() {

    const [open, setOpen] = useState(false);

    function Details({children}: Props) {
        return (<> {open && children} </>);
    }

    Details.Summary = ({children: trigger}: {children: JSX.Element}) => {
        const clone = cloneElement(trigger, {
            onClick: () => { setOpen(!open) }
        });
        return clone;
    };

    Details.Content = ({children}: Props) => {
        return clone;
    };

    return (
        <div className='min-h-screen flex justify-center'>
            <div className='max-w-[600px] flex grow bg-gray-50 py-16 px-4 flex-col gap-y-4'>

                <FullImg />

                <div className=''>{text.intro}</div>

                <FullImg />

                <div className='grid grid-cols-[1fr_auto] gap-x-2'>
                    <div className='flex flex-col gap-y-2 p-4 border-2'>
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
                    <div className='flex flex-col gap-y-2 p-4 border-2'>
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
                    <div className='flex flex-col gap-y-2 p-4 border-2'>
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
                    <div className='flex flex-col gap-y-2 p-4 border-2'>
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

                <Details className='flex flex-col p-4 gap-y-4 border-2'>
                    <Details.Summary>
                        <div className='grid grid-cols-[1fr_auto] gap-x-2'>
                            <div className='flex flex-col gap-y-2'>
                                <div className='flex gap-x-2 items-center'>
                                    <div className='text-4xl'>Title</div>
                                </div>
                                <div className=''>This is the description of games. I talk about what my idea is with games.</div>
                            </div>
                            <div className='flex items-center'>
                                <FontAwesomeIcon icon={["fas", "chevron-right"]} size="lg" />
                            </div>
                        </div>
                    </Details.Summary>
                    <Details.Content>
                        <div className='w-[500px] h-[300px] bg-gray-700
                            flex justify-center items-center'
                        >Game Area</div>
                    </Details.Content>
                </Details>

                <FullImg />

            </div>
        </div>
    )
}

export default App
