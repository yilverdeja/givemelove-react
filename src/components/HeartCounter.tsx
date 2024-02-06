import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

interface Props {
	size: number;
	counter: number;
	onHold: () => void;
}

const HeartCounter = ({ counter, onHold, size }: Props) => {
	const [showShadow, setShowShadow] = useState(false);
	return (
		<div
			className="relative hover:cursor-pointer"
			onMouseDown={() => setShowShadow(true)}
			onMouseUp={onHold}
			onClick={() => setShowShadow(false)}
			style={{
				width: size + 'px',
				height: size + 'px',
			}}
		>
			<FaHeart
				className="relative z-0 top-0 left-0"
				color="red"
				size={size}
				style={{
					filter: showShadow
						? 'drop-shadow(0px 0px 20px gray)'
						: 'drop-shadow(0px 0px 20px transparent)',
					transition: 'filter .1s',
				}}
			/>
			<p
				className="absolute m-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 select-none text-white font-sans"
				style={{
					fontSize: size / 10 + 'px',
				}}
			>
				{counter}
			</p>
		</div>
	);
};

export default HeartCounter;
