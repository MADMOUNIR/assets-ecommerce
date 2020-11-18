{
    currency: 'EUR',
    clientId: '',
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    createOrderOnClient: (data) => < ICreateOrderRequest > {
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'EUR',
                value: 20.0,
                breakdown: {
                    item_total: {
                        currency_code: 'EUR',
                        value: 20.0
                    },
                }
            },
            items: [{
                name: 'PAIEMENT JSTORE SHOP',
                quantity: '1',
                category: 'SHOPPING FEMME',
                unit_amount: {
                    currency_code: 'EUR',
                    value: price,
                },
            }]
        }]
    },
    advanced: {
        commit: 'true'
    },
    style: {
        label: 'paypal',
        layout: 'vertical'
    },
    onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
            console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
    },
    onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);

    },
    onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
    },
    onError: err => {
        console.log('OnError', err);
    },
    onClick: (data, actions) => {
        console.log('onClick', data, actions);
    },
};
