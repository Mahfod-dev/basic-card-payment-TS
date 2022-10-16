import { useState } from 'react';
import { useContext, createContext, ReactNode } from 'react';
import { ShoppingCart } from '../components';

type ShoppingCartProviderProps = {
	children: ReactNode;
};

type CartItems = {
	id: number;
	quantity: number;
};

type ShoppingCartContext = {
	openCart: () => void;
	closeCart: () => void;
	getItemsQuantity: (id: number) => number;
	increaseCartQuantity: (id: number) => void;
	decreaseCartQuantity: (id: number) => void;
	removeFromCart: (id: number) => void;

	cartQuantity: number;
	cartItems: CartItems[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const ShoppingCartProvider = ({
	children,
}: ShoppingCartProviderProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [cartItems, setCartItems] = useState<CartItems[]>([]);

	const cartQuantity = cartItems.reduce(
		(quantity, item) => item.quantity + quantity,
		0
	);

	const getItemsQuantity = (id: number) => {
		return cartItems.find((item) => item.id === id)?.quantity || 0;
	};
	const increaseCartQuantity = (id: number) => {
		setCartItems((currItems) => {
			if (currItems.find((item) => item.id === id) == null) {
				return [...currItems, { id, quantity: 1 }];
			} else {
				return currItems.map((item) => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity + 1 };
					} else {
						return item;
					}
				});
			}
		});
	};
	const decreaseCartQuantity = (id: number) => {
		setCartItems((currItems) => {
			if (currItems.find((item) => item.id === id)?.quantity === 1) {
				return currItems.filter((item) => item.id !== id);
			} else {
				return currItems.map((item) => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity - 1 };
					} else {
						return item;
					}
				});
			}
		});
	};

	const removeFromCart = (id: number) => {
		setCartItems((currItems) => {
			return currItems.filter((item) => item.id !== id);
		});
	};

	const openCart = () => setIsOpen(true);
	const closeCart = () => setIsOpen(false);

	return (
		<ShoppingCartContext.Provider
			value={{
				getItemsQuantity,
				increaseCartQuantity,
				decreaseCartQuantity,
				removeFromCart,
				openCart,
				closeCart,
				cartItems,
				cartQuantity,
			}}>
			{children}
			<ShoppingCart isOpen={isOpen} />
		</ShoppingCartContext.Provider>
	);
};

export const useCartShopping = () => {
	return useContext(ShoppingCartContext);
};
