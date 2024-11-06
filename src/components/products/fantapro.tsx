'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, ShoppingCart, Copy, X } from 'lucide-react'
import img1 from '@/assets/images/app-screen.png'
import  {useTranslation}  from "react-i18next";
import img2 from '@/assets/images/logo.png'

interface Plan {
  id: 'daily' | 'weekly' | 'monthly';
  name: string;
  price: number;
}

interface PaymentResponse {
  qrcode: string;
  txid: string;
  copiaCola: string;
}

interface PaymentRequest {
  valor: number;
  descricao: string;
}

interface Coupon {
  id: number;
  name: string;
  discount: number;
  createdAt: string;
  expiryDate: string;
  createdById: number;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

interface PaymentModalContentProps {
  paymentData: PaymentResponse;
  selectedPlanPrice: number;
  onCopyPix: (text: string) => Promise<void>;
}


const features = [
  'Aimbot',
  'Triggerbot',
  'Flickbot',
  'Wallhack',
  'Radar',
  'ESP',
  'Aimassist',
  'Magnect Trigger',
]

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-800 rounded-lg p-6 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

const PaymentModalContent: React.FC<PaymentModalContentProps> = ({
  paymentData,
  selectedPlanPrice,
  onCopyPix
}) => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-white mb-4">Pagamento via PIX</h3>
    <div className="flex flex-col items-center space-y-4">
      <img
        src={paymentData.qrcode}
        alt="QR Code PIX"
        className="w-64 h-64"
        />
      <p className="text-sm text-gray-300">
        Escaneie o QR Code acima com seu aplicativo do banco
      </p>
    </div>

    <div className="space-y-2">
      <p className="text-sm font-semibold text-gray-300">
        Ou copie o código PIX:
      </p>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          readOnly
          value={paymentData.copiaCola}
          className="flex-1 bg-zinc-700 p-2 rounded-md text-sm"
        />
        <button
          onClick={() => onCopyPix(paymentData.copiaCola)}
          className="bg-orange-500 hover:bg-orange-600 p-2 rounded-md"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>
    </div>

    <div className="text-sm text-gray-300">
      <p>ID da transação: {paymentData.txid}</p>
      <p>Valor a pagar: R$ {selectedPlanPrice.toFixed(2)}</p>
    </div>
  </div>
);

export default function ProductPage() {
  const {t} = useTranslation()
  const plans: Plan[] = [
    { id: 'daily', name: t("translation.daily"), price: 9.99 },
    { id: 'weekly', name: t("translation.weekly"), price: 49.99 },
    { id: 'monthly', name: t("translation.month"), price: 149.99 },
  ]
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[1]);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [couponLoading, setCouponLoading] = useState<boolean>(false);

  const images = [
    img1,
    img1,
    img1,
    img1,
  ]

  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Código PIX copiado!");
    } catch (err) {
      alert("Erro ao copiar código PIX");
      console.error("Erro ao copiar:", err);
    }
  };

  const handleCouponApply = async (): Promise<void> => {
    if (!coupon.trim()) {
      setCouponError("Por favor, insira um código de cupom");
      return;
    }

    setCouponLoading(true);
    setCouponError(null);

    try {
      const response = await fetch(`http://localhost:3535/coupons/name/${coupon}`);
      
      if (response.status === 404) {
        setCouponError("Cupom não encontrado");
        setAppliedCoupon(null);
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const couponData: Coupon = await response.json();
      
      // Check if coupon is expired
      const expiryDate = new Date(couponData.expiryDate);
      const now = new Date();

      if (expiryDate < now) {
        setCouponError("Cupom expirado");
        setAppliedCoupon(null);
        return;
      }

      // Coupon is valid
      setAppliedCoupon(couponData);
      setCouponError(null);
    } catch (error) {
      console.error("Erro ao verificar cupom:", error);
      setCouponError("Erro ao processar cupom");
    } finally {
      setCouponLoading(false);
    }
  };

  const calculateDiscountedPrice = (): number => {
    if (!appliedCoupon) return selectedPlan.price;
    
    const discountAmount = selectedPlan.price * (appliedCoupon.discount / 100);
    return selectedPlan.price - discountAmount;
  };

  const handleAddToCart = async (): Promise<void> => {
    setLoading(true);
    try {
      const paymentRequest: PaymentRequest = {
        valor: calculateDiscountedPrice(),
        descricao: "Fanta PRO"
      };

      const response = await fetch("http://localhost:3535/payment/qrcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentRequest),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PaymentResponse = await response.json();
      setPaymentData(data);
      setShowPaymentModal(true);
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      alert("Erro ao processar pagamento.");
    } finally {
      setLoading(false);
    }
  };

  const handlePlanChange = (planId: string): void => {
    const newPlan = plans.find((plan) => plan.id === planId);
    if (newPlan) {
      setSelectedPlan(newPlan);
      setAppliedCoupon(null);
      setCoupon('');
      setCouponError(null);
    }
  };
  
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <div className="relative aspect-square bg-cover">
              <Image
                src={images[selectedImage]}
                alt="Produto em destaque"
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square ${selectedImage === index ? 'ring-2 ring-orange-500' : ''}`}
                >
                  <Image
                    src={img}
                    alt={`Miniatura ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6 bg-zinc-800 p-6 rounded-lg h-full">
            <h1 className="text-3xl font-bold text-orange-400">Fanta pro</h1>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Status:</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-green-500 border border-green-500 shadow-md transition-all duration-300 hover:shadow-lg hover:bg-green-500 hover:text-black">
                <Check className="w-4 h-4 mr-2" />
                Undetected
              </span>
            </div>
            <div className="space-y-2">
              <label htmlFor="plan-select" className="block text-sm font-medium text-gray-300">
                {t("translation.plan")}
              </label>
              <select
                id="plan-select"
                className="w-full bg-zinc-700 border-zinc-600 rounded-md p-2 text-white"
                onChange={(e) => handlePlanChange(e.target.value)}
                value={selectedPlan.id}
              >
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} - R$ {plan.price.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder={t("translation.desconto")}
                  className="flex-grow bg-zinc-700 border-zinc-600 rounded-md p-2 text-white"
                  value={coupon}
                  onChange={(e) => {
                    setCoupon(e.target.value);
                    setCouponError(null);
                  }}
                  disabled={couponLoading}
                />
                <button
                  className="px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-md hover:bg-zinc-600 transition-colors disabled:opacity-50"
                  onClick={handleCouponApply}
                  disabled={couponLoading}
                >
                  {couponLoading ? t("translation.Verificando") : t("translation.Aplicar")}
                </button>
              </div>
              {couponError && (
                <p className="text-red-500 text-sm">{couponError}</p>
              )}
              {appliedCoupon && (
                <p className="text-green-500 text-sm">
                  Cupom {appliedCoupon.name} aplicado: {appliedCoupon.discount}% de desconto
                </p>
              )}
            </div>
            <div className="text-2xl font-bold">
              {appliedCoupon ? (
                <>
                  <span className="line-through text-gray-500 mr-2">
                    R$ {selectedPlan.price.toFixed(2)}
                  </span>
                  R$ {calculateDiscountedPrice().toFixed(2)}
                </>
              ) : (
                `R$ ${selectedPlan.price.toFixed(2)}`
              )}
            </div>
            <button 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleAddToCart}
              disabled={loading}
            >
              {loading ? (
                "Processando..."
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {t("translation.agora")}
                </>
              )}
            </button>
            <p className="text-gray-300">
              {t("translation.pro_fanta")}
            </p>
          </div>
        </div>

        <div className="mt-16 bg-zinc-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">{t("translation.pro_fanta_features")}</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal 
        isOpen={showPaymentModal} 
        onClose={() => setShowPaymentModal(false)}
      >
        {paymentData && (
          <PaymentModalContent
            paymentData={paymentData}
            selectedPlanPrice={calculateDiscountedPrice()}
            onCopyPix={copyToClipboard}
          
          />
        )}
      </Modal>
    </div>
  )
}