import React from 'react';
import SupportPageLayout from '../Components/SupportPageLayout';

const FAQ = () => {
    return (
        <SupportPageLayout title="Frequently Asked Questions">
            <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-bold mb-2">1. How do I place an order?</h2>
                    <p>
                        Browse our collection, select the books you love, add them to your cart, and proceed to checkout.
                        You will need to create an account or log in to complete your purchase.
                    </p>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-2">2. What payment methods do you accept?</h2>
                    <p>
                        We accept all major credit cards, debit cards, UPI, and Net Banking. Cash on Delivery (COD) is available
                        for select locations.
                    </p>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-2">3. How can I track my order?</h2>
                    <p>
                        Once your order is shipped, you will receive a tracking number via email. You can also track your
                        order status from the "My Orders" section in your profile.
                    </p>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-2">4. Can I cancel my order?</h2>
                    <p>
                        Yes, orders can be cancelled within 24 hours of placement or before they are shipped, whichever comes first.
                    </p>
                </div>
            </div>
        </SupportPageLayout>
    );
};

export default FAQ;
