import { useEffect, useRef } from 'react';

interface Props {
	draw: () => void;
	height: number;
	width: number;
}
const Canvas = ({ draw, height, width }: Props) => {
	const canvas = useRef();

	useEffect(() => {
		const context = canvas.current?.getContext('2d');
		context.globalCompositeOperation = 'destination-over';
		draw(context);
	});
	return (
		<canvas
			className="fixed z-0"
			ref={canvas}
			height={height}
			width={width}
		/>
	);
};

export default Canvas;
