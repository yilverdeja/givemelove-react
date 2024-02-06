import { FaMoon } from 'react-icons/fa';
import { FaSun } from 'react-icons/fa';

interface Props {
	toggleTheme: () => void;
}

const ThemeToggle = ({ toggleTheme }: Props) => {
	return (
		<div
			onClick={toggleTheme}
			className="z-10 text-black dark:text-white hover:cursor-pointer"
		>
			{document.documentElement.classList.contains('dark') ? (
				<FaMoon size={20} />
			) : (
				<FaSun size={20} />
			)}
		</div>
	);
};

export default ThemeToggle;
