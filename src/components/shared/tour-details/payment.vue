// PaymentForm.vue
<script setup lang="ts">
import { ref, watch } from 'vue';
import { Button } from '@/components/ui/button';
import { useRouter } from 'vue-router';
import FloatingInput from './floating-input.vue';

const props = defineProps<{
  selectedMethod: string
}>();
 const router = useRouter();
const emit = defineEmits(['mbway-complete']);

const cardDetails = ref({
  number: '',
  expiry: '',
  cvv: '',
  name: ''
});

const mbwayPhone = ref('');
const formErrors = ref({
  card: { number: '', expiry: '', cvv: '', name: '' },
  mbway: { phone: '' }
});

const validateCard = () => {
  const errors = { number: '', expiry: '', cvv: '', name: '' };
  let isValid = true;

  if (!/^\d{16}$/.test(cardDetails.value.number)) {
    errors.number = 'Invalid card number';
    isValid = false;
  }
  if (!/^\d{2}\/\d{2}$/.test(cardDetails.value.expiry)) {
    errors.expiry = 'Invalid expiry date';
    isValid = false;
  }
  if (!/^\d{3}$/.test(cardDetails.value.cvv)) {
    errors.cvv = 'Invalid CVV';
    isValid = false;
  }
  if (!cardDetails.value.name) {
    errors.name = 'Name is required';
    isValid = false;
  }

  formErrors.value.card = errors;
  return isValid;
};

const validateMBWay = () => {
  if (!/^\d{11}$/.test(mbwayPhone.value)) {
    formErrors.value.mbway.phone = 'Invalid phone number';
    return false;
  }
  formErrors.value.mbway.phone = '';
  return true;
};

const handleCardSubmit = () => {
  if (validateCard()) {
    // Process card payment
    console.log('Processing card payment:', cardDetails.value);
  }
};

const handleMBWaySubmit = () => {
  if (validateMBWay()) {
    router.push('/mbway-timer')
    //emit('mbway-complete');
  }
};

watch(() => props.selectedMethod, () => {
  // Reset errors when payment method changes
  formErrors.value = {
    card: { number: '', expiry: '', cvv: '', name: '' },
    mbway: { phone: '' }
  };
});
</script>

<template>
  <div class="mt-4 space-y-4">
    <!-- Credit Card Form -->
    <div v-if="selectedMethod === 'card'" class="space-y-3"
    v-motion
    :initial="{
      opacity: 0,
      y: 40,
    }"
    :enter="{
      opacity: 1,
      y: 0,
      transition: {
        delay: 70,
        duration: 500,
      },
    }"
    >
      <FloatingInput
        v-model="cardDetails.number"
        placeholder="Card number"
        maxlength="16"
        type="text"
        label="Card no."
        :error="formErrors.card.number"
      />
      <FloatingInput
      v-model="cardDetails.name"
      placeholder="Cardholder name"
      type="text"
      label="Card name"
      :error="formErrors.card.name"
      />
      
      <div class="grid grid-cols-2 gap-3">
        <div>
          <FloatingInput
          v-model="cardDetails.expiry"
          placeholder="MM/YY"
          maxlength="5"
          type="tel"
          label="MM/YY"
          :error="formErrors.card.expiry"
    />
        </div>
        <div>
          <FloatingInput
            v-model="cardDetails.cvv"
            placeholder="CVV"
            maxlength="3"
            type="password"
            label="CVV"
            :error="formErrors.card.cvv"
          />
        </div>
      </div>
      <Button @click="handleCardSubmit" class="w-full !mt-5 !mb-3">Pay Now</Button>
    </div>

    <!-- PayPal Info -->
    <div v-if="selectedMethod === 'paypal'" class="p-4 rounded-lg"
    v-motion
    :initial="{
      opacity: 0,
      y: 40,
    }"
    :enter="{
      opacity: 1,
      y: 0,
      transition: {
        delay: 70,
        duration: 500,
      },
    }"
    >
      <p class="text-sm text-gray-600">
        After clicking 'Pay with PayPal', you'll be redirected to PayPal to complete your purchase.
      </p>
      <Button class="w-full mt-5">Pay with PayPal</Button>
    </div>

    <!-- MBWay Form -->
    <div v-if="selectedMethod === 'mbway'" class="space-y-3"
    v-motion
    :initial="{
      opacity: 0,
      y: 40,
    }"
    :enter="{
      opacity: 1,
      y: 0,
      transition: {
        delay: 70,
        duration: 500,
      },
    }"
    >
    <FloatingInput
        v-model="mbwayPhone"
        placeholder="Phone number"
        type="tel"
        label="Phone no."
        maxlength="11"
      :error="formErrors.mbway.phone"
    />
      <Button @click="handleMBWaySubmit" class="w-full !mt-5 !mb-3">Pay with MBWay</Button>
    </div>
  </div>
</template>