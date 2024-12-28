<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { z } from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Timer from '@/components/shared/tour-details/timer.vue';
import Payment from '@/components/shared/tour-details/payment.vue';
import BackButton from '@/components/shared/back-button.vue';
import FloatingInput from '@/components/shared/tour-details/floating-input.vue';

const formSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(10),
});

const email = ref('');
const phone = ref('');
const showPayment = ref(false);
const selectedPayment = ref('');
const formErrors = ref({ email: '', phone: '' });
const showTimer = ref(false);

const router = useRouter();
const route = useRoute();

// Initialize state from query parameters
if (route.query.step === 'payment') {
  showPayment.value = true;
} else if (route.query.step === 'mbway-timer') {
  showTimer.value = true;
}

// Watch state changes and update URL
watch(showPayment, (newValue) => {
  if (newValue) {
    router.replace({ query: { ...route.query, step: 'payment' } });
  }
});
watch(showTimer, (newValue) => {
  if (newValue) {
    router.replace({ query: { ...route.query, step: 'mbway-timer' } });
  }
});

const isIOS = computed(() => /iPad|iPhone|iPod/.test(navigator.userAgent));

const validateForm = () => {
  try {
    formSchema.parse({ email: email.value, phone: phone.value });
    formErrors.value = { email: '', phone: '' };
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        if (err.path[0] === 'email') {
          formErrors.value.email = 'Please enter a valid email';
        }
        if (err.path[0] === 'phone') {
          formErrors.value.phone = 'Please enter a valid phone number';
        }
      });
    }
    return false;
  }
};

const handleSubmit = () => {
  if (validateForm()) {
    localStorage.setItem('userEmail', email.value);
    showPayment.value = true;
  }
};

const selectPayment = (method: string) => {
  selectedPayment.value = method;
};

const onMBWayComplete = () => {
  showTimer.value = true;
};
</script>

<template>
  <div class="max-w-md mx-auto">
    <BackButton />
    <Card class="bg-background shadow-none border-0 px-0">
      <CardContent class="px-0 mt-5">
        <!-- Initial Form -->
        <div v-if="!showPayment" class="space-y-4"
        v-motion
    :initial="{
      opacity: 0,
      x: -100,
    }"
    :enter="{
      opacity: 1,
      x: 0,
      transition: {
        delay: 100,
        duration: 800,
      },
    }"
        >
          <h2 class="text-xl font-semibold mb-4">Checkout</h2>
          <p class="text-sm">
            Tell us your email and/or mobile phone to receive the tickets.
          </p>
          <div class="space-y-3 ">
            <div>
              <FloatingInput
      v-model="email"
      type="email"
      label="E-mail"
      :error="formErrors.email"
    />
              
            </div>
            <div>
              <FloatingInput
      v-model="phone"
      type="tel"
      label="Phone no."
       maxlength="11"
      :error="formErrors.phone"
    />
            </div>
            <Button @click="handleSubmit" class="w-full !mt-36">Continue</Button>
          </div>
        </div>

        <!-- Payment Selection -->
        <div v-else class="space-y-4"
        v-motion
    :initial="{
      opacity: 0,
      x: -100,
    }"
    :enter="{
      opacity: 1,
      x: 0,
      transition: {
        delay: 100,
        duration: 800,
      },
    }"
        >
          <h2 class="text-xl flex flex-col gap-y-7 font-medium mb-6">Checkout <br>
             <span class="text-[1.1rem] font-normal">Choose how you want to pay for it.</span> </h2>

          <div class="space-y-3">
            <button
              v-if="isIOS"
              class="w-full bg-[#00001E] text-white rounded-lg p-3 flex items-center justify-center space-x-2"
            >
            <img src="/images/logos/apple-pay.svg" alt="apple pay" class=" w-full h-8 object-contain" 
            </button>
            <button
              v-else
              class="w-full bg-[#00001E] text-white rounded-lg p-3 flex items-center justify-center space-x-2"
            >
            <img src="/images/logos/google-pay.svg" alt="google pay" class=" w-full h-[1.35rem] object-contain" 
            </button>

            <!-- border Line  -->
      <div class="flex items-center gap-x-4 py-4 w-full max-w-full">
        <!-- border Line (Left) -->
        <div class="border-t-2  border-gray-300 flex-grow"></div>
  
        <!-- option text -->
        <span class="text-center  text-gray-500">or use other</span>
  
        <!-- border Line (Right) -->
        <div class="border-t-2  border-gray-300 flex-grow"></div>
      </div>
  

            <div
              @click="selectPayment('card')"
              class="p-3 rounded-lg border transition-all bg-white hover:bg-gray-50 cursor-pointer"
              :class="{ 'border-primary' : selectedPayment === 'card' }"
            >
              <div class="flex items-center space-x-3">
                <img src="/images/logos/card.png" alt="Card" class="size-8 object-contain" />
                <span>Credit/Debit card</span>
              </div>
              <Payment
              v-if="selectedPayment === 'card'"
              :selected-method="selectedPayment"
              @mbway-complete="onMBWayComplete"
            />
            </div>
            <div
              @click="selectPayment('paypal')"
              class="p-3 rounded-lg border bg-white hover:bg-gray-50 cursor-pointer"
              :class="{ 'border-primary': selectedPayment === 'paypal' }"
            >
              <div class="flex items-center space-x-3">
                <img src="/images/logos/paypal.png" alt="PayPal" class="size-8 object-contain" />
                <span>PayPal</span>
              </div>
              <Payment
              v-if="selectedPayment === 'paypal'"
              :selected-method="selectedPayment"
              @mbway-complete="onMBWayComplete"
            />
            </div>

            <div
              @click="selectPayment('mbway')"
              class="p-3 rounded-lg border bg-white hover:bg-gray-50 cursor-pointer"
              :class="{ 'border-primary': selectedPayment === 'mbway' }"
            >
              <div class="flex items-center space-x-3">
                <img src="/images/logos/mbway.png" alt="MBWay" class="size-8 0bject-contain" />
                <span>MBWay</span>
              </div>
              <Payment
              v-if="selectedPayment === 'mbway'"
              :selected-method="selectedPayment"
              @mbway-complete="onMBWayComplete"
            />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Timer Modal -->
    <Timer v-if="showTimer" :open="showTimer"
    @update:open="showTimer = $event" />
  </div>
</template>
