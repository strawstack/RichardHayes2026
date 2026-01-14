import { Children } from 'react';
import './App.css'
import placeholder from './images/image.png';

const text = {
  intro: "Hey, I’m Richard. This is something something a description or explanation about  who I am and what you’ll find on this site"
}

const SqImg = () => {
  return (
    <div className='h-[128px] w-[128px] overflow-hidden'>
      <img src={placeholder}></img>
    </div>
  );
};

const FullImg = () => {
  return (
    <div className='h-[128px] overflow-hidden'>
      <img src={placeholder}></img>
    </div>
  );
};

const HobbyTile = ({...children}) => {
  const Title = ({...children}) => {
    return <div>{children}</div>
  }
  return (
    <div>
      Hobby
    </div>
  );
};

function App() {
  return (
    <div className='min-h-screen flex justify-center'>
      <div className='max-w-[600px] flex grow bg-gray-50 py-16 px-4 flex-col gap-y-4'>
        <FullImg />
        <div>{text.intro}</div>
        <HobbyTile>
          <HobbyTile.Title>

          </HobbyTile.Title>
          <HobbyTile.Description>

          </HobbyTile.Description>
        </HobbyTile>
      </div>
    </div>
  )
}

export default App
