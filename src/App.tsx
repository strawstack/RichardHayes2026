import './App.css'
import i128 from './images/128.png';
import i568x128 from './images/568x128.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import type { JSX } from 'react';
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
        <div className='h-[128px] w-[128px] overflow-hidden'>
           <img src={i128}></img>
        </div>
    );
};

const FullImg = () => {
    return (
        <div className='h-[128px] overflow-hidden'>
            <img src={i568x128}></img>
        </div>
    );
};

function Interest({children, ...props}: Props) {
    const {
        border,
        imgLeft,
        imgRight
    } = props;
    return (
        <div className='flex gap-x-2'>
            {imgLeft}
            <div className={cn({
                'flex flex-col gap-y-2 p-4': true,
                'border-2': border
            })}>
                {children}
            </div>
            {imgRight}
        </div>
    );
};

Interest.Head = ({children}: Props) => <div className='flex justify-between'>{children}</div>;
Interest.Left = ({children}: Props) => <div className='flex gap-x-2 items-center'>{children}</div>;
Interest.Right = ({children}: Props) => <div className='flex gap-x-2 items-center'>{children}</div>;
Interest.Title = ({children}: Props) => <div className='text-4xl'>{children}</div>;
Interest.Description = ({children}: Props) => <div>{children}</div>;

function App() {
    return (
        <div className='min-h-screen flex justify-center'>
            <div className='max-w-[600px] flex grow bg-gray-50 py-16 px-4 flex-col gap-y-4'>

                <FullImg />

                <div>{text.intro}</div>

                <Interest border={true} imgRight={<SqImg />}>
                    <Interest.Head>
                        <Interest.Left>
                            <Interest.Title>Games</Interest.Title>
                        </Interest.Left>
                        <Interest.Right>
                            <FontAwesomeIcon icon={["fas", "gamepad"]} size="lg" />
                            <FontAwesomeIcon icon={["fas", "up-right-from-square"]} size="lg" />
                        </Interest.Right>
                    </Interest.Head>
                    <Interest.Description>This is the description of games. I talk about what my idea is with games.</Interest.Description>
                </Interest>

            </div>
        </div>
    )
}

export default App
