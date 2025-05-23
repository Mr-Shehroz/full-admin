import { model, models, Schema } from 'mongoose';

const OrderSchema = new Schema({
    line_items:Object,
    name: String,
    email: String,
    city: String,
    postalCode: String,
    streetAdress: String,
    country: String,
    paid: Boolean,
}, {
    timestamps: true
});

const Order = models?.Order || model('Order', OrderSchema)
export default Order