import { MdClose, MdError } from 'react-icons/md';

interface Props {
	message: string;
	onClose: () => void;
}

const Alert = ({ message, onClose }: Props) => {
	return (
		<>
			{message && (
				<div className="absolute z-10 w-full bg-red-50 border border-red-400 rounded text-red-800 text-sm p-4 flex justify-between items-center">
					<div>
						<div className="flex items-center gap-2">
							<MdError />
							<p>
								<span className="font-bold">Error: </span>
								{message}
							</p>
						</div>
					</div>
					<div>
						<MdClose onClick={onClose} />
					</div>
				</div>
			)}
		</>
	);
};

export default Alert;
