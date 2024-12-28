// PaymentForm.vue
<script setup lang="ts">
import { ref, watch } from 'vue';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const props = defineProps<{
  selectedMethod: string
}>();

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
    emit('mbway-complete');
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
      <Input
        v-model="cardDetails.number"
        placeholder="Card number"
        maxlength="16"
        :class="{ 'border-red-500': formErrors.card.number }"
      />
      <span v-if="formErrors.card.number" class="text-sm text-red-500">{{ formErrors.card.number }}</span>
      
      <Input
        v-model="cardDetails.name"
        placeholder="Cardholder name"
        :class="{ 'border-red-500': formErrors.card.name }"
      />
      <span v-if="formErrors.card.name" class="text-sm text-red-500">{{ formErrors.card.name }}</span>
      
      <div class="grid grid-cols-2 gap-3">
        <div>
          <Input
            v-model="cardDetails.expiry"
            placeholder="MM/YY"
            maxlength="5"
            :class="{ 'border-red-500': formErrors.card.expiry }"
          />
          <span v-if="formErrors.card.expiry" class="text-sm text-red-500">{{ formErrors.card.expiry }}</span>
        </div>
        <div>
          <Input
            v-model="cardDetails.cvv"
            placeholder="CVV"
            maxlength="3"
            type="password"
            :class="{ 'border-red-500': formErrors.card.cvv }"
          />
          <span v-if="formErrors.card.cvv" class="text-sm text-red-500">{{ formErrors.card.cvv }}</span>
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
      <Input
        v-model="mbwayPhone"
        placeholder="Phone number"
        type="tel"
        maxlength="11"
        :class="{ 'border-red-500': formErrors.mbway.phone }"
      />
      <span v-if="formErrors.mbway.phone" class="text-sm text-red-500">{{ formErrors.mbway.phone }}</span>
      <Button @click="handleMBWaySubmit" class="w-full !mt-5 !mb-3">Pay with MBWay</Button>
    </div>
  </div>
</template>