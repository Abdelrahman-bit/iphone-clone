import { navLists } from "@/constants"
import { bagImg, searchImg } from "@/utils"

const Navbar = () => {
  return (
		<header className='w-full p-10 flex justify-center mb-5 lg:mb-18 '>
			<nav className='flex justify-between items-center w-6/7 lg:w-8/10'>
				<img src={"/assets/images/apple.svg"} alt='Apple Logo' />
				<ul className='md:flex space-x-5 hidden'>
					{navLists.map((item, index) => {
						return <li key={index}> {item} </li>;
					})}
				</ul>
				<div className='flex space-x-6 lg:space-x-10'>
					<img className='w-4' src={searchImg} alt='Search Icon' />
					<img className='w-4' src={bagImg} alt='Bag Icon' />
				</div>
			</nav>
		</header>
  );
}

export default Navbar