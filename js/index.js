var data = {
	products: [
		{
			id: 1,
			name: 'Album Ateez',
			price: 250000,
			weight: 200,
			condition: 'sealed',
			image: 'ateez.jpg',
		},
		{
			id: 2,
			name: 'Album NCT',
			price: 350000,
			weight: 200,
			condition: 'sealed',
			image: 'nct.jpg',
		},
		{
			id: 3,
			name: 'Album Seventeen',
			price: 225000,
			weight: 200,
			condition: 'sealed',
			image: 'seventeen.jpg',
		},
		{
			id: 4,
			name: 'Lightstick Monsta X',
			price: 750000,
			weight: 750,
			condition: 'sealed',
			image: 'monsta.jpg',
		},
		{
			id: 5,
			name: 'Lightstick Stray Kids',
			price: 650000,
			weight: 800,
			condition: 'sealed',
			image: 'straykids.jfif',
		},
		{
			id: 6,
			name: 'Lightstick Shinee',
			price: 675000,
			weight: 800,
			condition: 'sealed',
			image: 'shinee.jpg',
		},
	],
	payment: [
		{
			id: 1,
			name: 'Dana',
		},
		{
			id: 2,
			name: 'Gopay',
		},
		{
			id: 3,
			name: 'OVO',
		},
		{
			id: 4,
			name: 'Shopee',
		},
		{
			id: 5,
			name: 'BCA',
		},
		{
			id: 6,
			name: 'BNI',
		},
		{
			id: 7,
			name: 'Mandiri',
		},
		{
			id: 8,
			name: 'Other',
		},
	],
};

document.addEventListener('DOMContentLoaded', (event) => {
	var products = data['products'];
	var payments = data['payment'];
	var sectionProduct = document.querySelector('.section-product');
	var gridProduct = document.querySelector('.product-grid');
	var paymentGrid = document.querySelector('.payment-grid');
	const form = document.querySelector('form');

	if (sectionProduct) {
		products.forEach((product) => {
			var div = document.createElement('div');
			div.classList.add('product');
			div.innerHTML = `
			<div class="product-image" style="background-image: url('./img/${product.image}');">
				<div class="product-tag">
					${product.condition}
				</div>
			</div>
			<div class="product-text">
				<div class="product-title">
					${product.name}
				</div>
				<p class="product-description">
				Harga yang tertera sudah termasuk dengan packing
				</p>
				<div class="product-detail">
					<h5 class="product-price">Rp<span>${product.price}</span></h5>
					<h5 class="product-weight"><span>${product.weight}</span>gr</h5>
				</div>
			</div>
		`;
			sectionProduct.appendChild(div);
		});
	}

	if (gridProduct) {
		products.forEach((product) => {
			var label = document.createElement('label');
			label.classList.add('product-check');
			label.innerHTML = `
		<input type="checkbox" name="product" id="checkProduct" value="${product.price}">
		<span>${product.name}</span>
		`;
			gridProduct.appendChild(label);
		});
	}

	if (paymentGrid) {
		payments.forEach((payment) => {
			var label = document.createElement('label');
			label.classList.add('payment-check');
			label.innerHTML = `
			<input type="radio" name="payment" id="${payment.name}" value="${payment.name}">
			<span>${payment.name}</span>
			`;
			paymentGrid.appendChild(label);
		});
	}

	if (form) {
		form.addEventListener('submit', (event) => {
			event.preventDefault();

			var formData = new FormData(form);

			var name = formData.get('name');
			var phone = formData.get('phone');
			var address = formData.get('address');
			var product = formData.get('product');
			var payment = formData.get('payment');

			if (name && phone && address && product && payment) {
				var totalPrice = 0;
				gridProduct
					.querySelectorAll('input[name="product"]:checked')
					.forEach((product) => {
						totalPrice += parseInt(product.value);
					});

				var modal = document.createElement('div');
				modal.classList.add('modal');
				modal.innerHTML = `
				<div class="modal-content">
					<div class="section-text">
						<h2 class="section-title">Thank You</h2>
						<p class="section-description">Hello ${name} thank you for ordering from us, your total payment is Rp${totalPrice} and your payment method is ${payment}</p>
					</div>
					<div class="button-container">
						<button class="primary">Finish</button>
						<button class="secondary">Cancel</button>
					</div>
				</div>
				`;
				document.body.appendChild(modal);

				modal.addEventListener('click', (event) => {
					if (event.target.classList.contains('primary')) {
						alert('Thank you for your order!');
						modal.remove();
						form.reset();
					} else if (event.target.classList.contains('secondary')) {
						modal.remove();
					}
				});

				console.log({ name, phone, address, product, payment });
			} else {
				alert('Please fill all form');
			}
		});
	}
});
