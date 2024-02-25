import { useEffect, useState } from 'react';
import HeartCounter from './components/HeartCounter';
import Footer from './components/Footer';
import UpdateText from './components/UpdateText';
import { useWindowSize } from '@uidotdev/usehooks';
import Canvas from './components/Canvas';
import ThemeToggle from './components/ThemeToggle';
import GithubStats from './components/GithubStats';
import './index.css';
import { db, auth } from './services/firebase';
import {
	doc,
	updateDoc,
	getDoc,
	Timestamp,
	increment,
} from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { useDebounce } from '@uidotdev/usehooks';

function App() {
	const [lastUpdated, setLastUpdated] = useState(new Date());
	const [currentDatetime, setCurrentDatetime] = useState(new Date());
	const [theme, setTheme] = useState('light');
	const [count, setCount] = useState(0);
	const [totalCount, setTotalCount] = useState(0);
	const [error, setError] = useState('');
	const size = useWindowSize();
	const counterRef = doc(db, 'counter/counter');
	const submitCounterDebounce = useDebounce(count, 1000);

	const getData = () => {
		getDoc(counterRef)
			.then((res) => {
				const data = res.data();
				if (data) setTotalCount(data.count);
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	useEffect(() => {
		// sign in anonymously then get data
		signInAnonymously(auth)
			.then(() => {
				getData();
			})
			.catch((err) => {
				setError(err.message);
			});
	}, []);

	useEffect(() => {
		if (count === 0) return;
		if (submitCounterDebounce) {
			const timestamp = Timestamp.fromDate(new Date());
			updateDoc(counterRef, {
				count: increment(submitCounterDebounce),
				lastUpdated: timestamp,
			});
			setCount(0);
			setLastUpdated(new Date());
		}
	}, [submitCounterDebounce, counterRef, count]);

	const handleClick = () => {
		setCount(count + 1);
		setTotalCount(totalCount + 1);
	};

	const handleLastUpdatedRefresh = () => {
		getData();
		setCurrentDatetime(new Date());
	};

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		if (newTheme === 'dark') document.documentElement.classList.add('dark');
		else document.documentElement.classList.remove('dark');
		setTheme(newTheme);
	};

	const draw = (ctx: CanvasRenderingContext2D) => {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		const id = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
		const pixels = id.data;

		const getRandom = (multiplier: number) => {
			return Math.floor(Math.random() * multiplier);
		};

		for (let i = 0; i < totalCount; i++) {
			const x = getRandom(ctx.canvas.width);
			const y = getRandom(ctx.canvas.height);
			const r = getRandom(256);
			const g = getRandom(256);
			const b = getRandom(256);
			const offset = (y * id.width + x) * 4;
			pixels[offset] = r;
			pixels[offset + 1] = g;
			pixels[offset + 2] = b;
			pixels[offset + 3] = 255;
		}

		ctx.putImageData(id, 0, 0);
	};

	const githubRepoURl =
		'https://api.github.com/repos/yilverdeja/givemelove-react';

	return (
		<>
			<Canvas
				draw={draw}
				width={size.width ? size.width : 100}
				height={size.height ? size.height : 100}
			/>
			<div className="flex flex-col justify-evenly items-center h-lvh m-auto pl-5 pr-5 select-none z-10 text-black dark:text-white">
				<div className="flex flex-row justify-between w-full max-w-3xl z-10">
					<GithubStats apiUrl={githubRepoURl} />
					<ThemeToggle toggleTheme={toggleTheme} />
				</div>
				<HeartCounter
					counter={totalCount}
					onHold={handleClick}
					size={250}
				/>
				<div className="flex flex-col justify-center items-center sm:flex-row sm:justify-between w-full max-w-3xl z-10">
					<UpdateText
						lastUpdated={lastUpdated}
						onRefresh={handleLastUpdatedRefresh}
						currentDateTime={currentDatetime}
					/>
					<Footer />
				</div>
			</div>
		</>
	);
}

export default App;
