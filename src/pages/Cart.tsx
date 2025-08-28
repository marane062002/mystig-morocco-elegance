import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Minus, Plus, Trash2, ShoppingBag, CreditCard, ArrowLeft, Package, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Cart = () => {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useScrollAnimation();

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      alert('Checkout successful! Thank you for your purchase.');
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'welcome10') {
      setDiscount(0.1);
    } else if (promoCode.toLowerCase() === 'morocco20') {
      setDiscount(0.2);
    } else {
      alert('Invalid promo code');
    }
  };

  const subtotal = getTotalPrice();
  const serviceFee = 50;
  const discountAmount = subtotal * discount;
  const total = subtotal + serviceFee - discountAmount;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 py-20">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="w-16 h-16 text-muted-foreground" />
            </div>
            <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-muted-foreground mb-8 text-lg">
              Discover our amazing products and experiences to start your journey.
            </p>
            <a
              href="/products"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Continue Shopping</span>
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Shopping Cart
            </h1>
            <p className="text-muted-foreground text-lg">
              Review your selected items and proceed to checkout
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground flex items-center space-x-2">
                    <Package className="w-6 h-6" />
                    <span>Your Items ({items.length})</span>
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 transition-colors text-sm font-medium"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="bg-background rounded-xl border border-border p-6 hover:shadow-md transition-all duration-300 group">
                      <div className="flex items-center space-x-4">
                        {item.image && (
                          <div className="relative overflow-hidden rounded-lg">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-24 h-24 object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-bold text-foreground text-lg mb-1">
                            {item.name}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-2 capitalize flex items-center space-x-2">
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                            <span>{item.type}</span>
                          </p>
                          {item.description && (
                            <p className="text-muted-foreground text-sm line-clamp-2">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary text-xl mb-3">
                            {item.price} {item.currency}
                          </p>
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 rounded-md bg-background hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-bold text-foreground">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 rounded-md bg-background hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl border border-border p-6 sticky top-6 shadow-lg">
                <div className="flex items-center space-x-2 mb-6">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <h2 className="font-bold text-foreground text-xl">
                    Order Summary
                  </h2>
                </div>
                
                {/* Promo Code */}
                <div className="mb-6 p-4 bg-muted/30 rounded-xl border border-border">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Promo Code
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      placeholder="Enter code"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors text-sm font-medium"
                    >
                      Apply
                    </button>
                  </div>
                  {discount > 0 && (
                    <p className="text-green-600 text-sm mt-2 font-medium">
                      ✓ {discount * 100}% discount applied!
                    </p>
                  )}
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{subtotal} MAD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span className="font-medium">{serviceFee} MAD</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-green-600">Discount ({discount * 100}%)</span>
                      <span className="font-medium text-green-600">-{discountAmount.toFixed(0)} MAD</span>
                    </div>
                  )}
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between">
                      <span className="font-bold text-foreground text-lg">Total</span>
                      <span className="font-bold text-primary text-2xl">
                        {total.toFixed(0)} MAD
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-4 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 transform hover:scale-105 font-medium text-lg"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>{isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}</span>
                </button>

                {/* Security Badge */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-muted-foreground">
                    🔒 Secure checkout powered by SSL encryption
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;