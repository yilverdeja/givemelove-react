const Footer = () => {
	const currentYear = new Date().getFullYear();
	return (
		<div className="text-black dark:text-white">
			givemelove &copy; <span>{currentYear}</span>
		</div>
	);
};

export default Footer;
