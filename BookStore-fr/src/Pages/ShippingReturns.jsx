import React from 'react';
import SupportPageLayout from '../Components/SupportPageLayout';

const ShippingReturns = () => {
    return (
        <SupportPageLayout title="Shipping & Returns">
            <h2 className="text-2xl font-bold mt-6 mb-3">Shipping Policy</h2>
            <p className="mb-4">
                We strive to deliver your books as quickly as possible. Orders are typically processed within 1-2 business days.
                Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days.
            </p>
            <p className="mb-4">
                Free shipping is available on orders over ₹500.
            </p>

            <h2 className="text-2xl font-bold mt-6 mb-3">Return Policy</h2>
            <p className="mb-4">
                If you are not 100% satisfied with your purchase, you can return the product and get a full refund or exchange
                the product for another one, be it similar or not.
            </p>
            <p className="mb-4">
                You can return a product for up to 30 days from the date you purchased it. Any product you return must be in
                the same condition you received it and in the original packaging.
            </p>
        </SupportPageLayout>
    );
};

export default ShippingReturns;
