initConfig(): void {

        const price = this.price;
        const currency = this.currency;
        const clientId = this.id_client;

        this.payPalConfig = {
            currency: currency,
            clientId: id_client,
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            createOrderOnClient: (data) => < ICreateOrderRequest > {
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: currency,
                        value: price,
                        breakdown: {
                            item_total: {
                                currency_code: currency,
                                value: price
                            },
                        }
                    },
                    items: [{
                        name: 'PAIEMENT JSTORE SHOP',
                        quantity: '1',
                        category: 'PHYSICAL_GOODS',
                        unit_amount: {
                            currency_code: currency,
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