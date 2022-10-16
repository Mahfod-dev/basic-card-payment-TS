import { Offcanvas, Stack } from 'react-bootstrap';
import { useCartShopping } from '../../context/ShoppingCartContext';
import { formatCurrency } from '../../helpers';
import CartItems from './CartItems';
import storeItem from '../../data/item.json';

type ShoppingCartProps = {
	isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
	const { closeCart, cartItems } = useCartShopping();
	return (
		<Offcanvas show={isOpen} onHide={closeCart} placement='end'>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>Cart</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<Stack gap={3}>
					{cartItems.map((item) => (
						<CartItems key={item.id} {...item} />
					))}
					<div className='ms-auto fw-bold fs-5'>
						Total{' '}
						{formatCurrency(
							cartItems.reduce((total, cartItem) => {
								const item = storeItem.find((i) => i.id === cartItem.id);
								return total + (item?.price || 0) * cartItem.quantity;
							}, 0)
						)}
					</div>
				</Stack>
			</Offcanvas.Body>
		</Offcanvas>
	);
}
