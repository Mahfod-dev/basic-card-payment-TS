import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { HomePage, AboutPage, StorePage } from '../pages';
import { Home } from '../components';
import { NavBar } from '../components/UI';

const Navigation = () => {
	return (
		<BrowserRouter>
			<Container className='mb-4'>
				<NavBar />
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/about' element={<AboutPage />} />
					<Route path='/store' element={<StorePage />} />
				</Routes>
			</Container>
		</BrowserRouter>
	);
};
export default Navigation;
