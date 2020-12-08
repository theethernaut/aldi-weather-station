// Render the PayPal button into #paypal-button-container
paypal.Buttons({
    // Set up the transaction
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '30'
                }
            }]
        });
    },

    // Finalize the transaction
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            // Show a success message to the buyer
            Swal.fire(
                'Good job!',
                'La transacción fue realizada con éxito por: ' + details.payer.name.given_name + '!',
                'success'
              )
        });
    },

    style: {
        color:  'blue',
        shape:  'pill',
        label:  'pay',
        height: 40
    }

}).render('#paypal-button-container');

// Render the PayPal button into #paypal-button-container
paypal.Buttons({
    // Set up the transaction
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '100'
                }
            }]
        });
    },

    // Finalize the transaction
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            // Show a success message to the buyer
            Swal.fire(
                'Good job!',
                'La transacción fue realizada con éxito por: ' + details.payer.name.given_name + '!',
                'success'
              )
        });
    },

    style: {
        color:  'blue',
        shape:  'pill',
        label:  'pay',
        height: 40
    }

}).render('#paypal-button-container1');

// Render the PayPal button into #paypal-button-container
paypal.Buttons({
    // Set up the transaction
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '190'
                }
            }]
        });
    },

    // Finalize the transaction
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            // Show a success message to the buyer
            Swal.fire(
                'Good job!',
                'La transacción fue realizada con éxito por: ' + details.payer.name.given_name + '!',
                'success'
              )
        });
    },

    style: {
        color:  'blue',
        shape:  'pill',
        label:  'pay',
        height: 40
    }

}).render('#paypal-button-container2');
