import { ShoppingCartProvider } from './context/ShoppingCartContext';
import Navigation from './router/Navigation';

const App = () => {
	return (
		<>
			<ShoppingCartProvider>
				<Navigation />
			</ShoppingCartProvider>
		</>
	);
};
export default App;
