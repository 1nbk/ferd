<template>
  <div class="min-h-screen bg-bg-primary">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-accent/10 to-bg-secondary py-16 sm:py-24">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-text-primary mb-6">
            Help Center
          </h1>
          <p class="text-lg sm:text-xl text-text-secondary leading-relaxed">
            We're here to help you every step of the way
          </p>
        </div>
      </div>
    </section>

    <!-- Quick Links -->
    <section class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <a href="#booking" class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all border border-bg-secondary group">
            <div class="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-serif font-bold mb-2 text-text-primary group-hover:text-accent transition-colors">Booking Help</h3>
            <p class="text-text-secondary text-sm">Learn how to book and manage your reservations</p>
          </a>

          <a href="#payment" class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all border border-bg-secondary group">
            <div class="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
              </svg>
            </div>
            <h3 class="text-xl font-serif font-bold mb-2 text-text-primary group-hover:text-accent transition-colors">Payment & Billing</h3>
            <p class="text-text-secondary text-sm">Information about payments and refunds</p>
          </a>

          <a href="#cancellation" class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all border border-bg-secondary group">
            <div class="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-serif font-bold mb-2 text-text-primary group-hover:text-accent transition-colors">Cancellation Policy</h3>
            <p class="text-text-secondary text-sm">Understand our cancellation and refund policies</p>
          </a>

          <a href="#safety" class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all border border-bg-secondary group">
            <div class="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h3 class="text-xl font-serif font-bold mb-2 text-text-primary group-hover:text-accent transition-colors">Safety & Security</h3>
            <p class="text-text-secondary text-sm">How we keep you and your data safe</p>
          </a>

          <a href="#account" class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all border border-bg-secondary group">
            <div class="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <h3 class="text-xl font-serif font-bold mb-2 text-text-primary group-hover:text-accent transition-colors">Account Settings</h3>
            <p class="text-text-secondary text-sm">Manage your profile and preferences</p>
          </a>

          <a href="#contact" class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all border border-bg-secondary group">
            <div class="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-serif font-bold mb-2 text-text-primary group-hover:text-accent transition-colors">Contact Support</h3>
            <p class="text-text-secondary text-sm">Get in touch with our support team</p>
          </a>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="bg-bg-secondary py-12 sm:py-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl sm:text-4xl font-serif font-bold text-text-primary text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div class="space-y-4">
            <details class="bg-white rounded-xl p-6 shadow-sm group">
              <summary class="font-semibold text-text-primary cursor-pointer list-none flex items-center justify-between">
                <span>How do I book a property?</span>
                <svg class="w-5 h-5 text-accent transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </summary>
              <p class="mt-4 text-text-secondary leading-relaxed">
                Browse our properties, select your dates, and click "Book Now". You'll be guided through a simple checkout process where you can review your booking and complete payment securely.
              </p>
            </details>

            <details class="bg-white rounded-xl p-6 shadow-sm group">
              <summary class="font-semibold text-text-primary cursor-pointer list-none flex items-center justify-between">
                <span>What is your cancellation policy?</span>
                <svg class="w-5 h-5 text-accent transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </summary>
              <p class="mt-4 text-text-secondary leading-relaxed">
                Cancellation policies vary by property. Most offer free cancellation up to 48 hours before check-in. You can view the specific policy on each property's listing page.
              </p>
            </details>

            <details class="bg-white rounded-xl p-6 shadow-sm group">
              <summary class="font-semibold text-text-primary cursor-pointer list-none flex items-center justify-between">
                <span>Is my payment information secure?</span>
                <svg class="w-5 h-5 text-accent transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </summary>
              <p class="mt-4 text-text-secondary leading-relaxed">
                Yes! We use industry-standard encryption and secure payment processing. Your payment information is never stored on our servers and is handled by certified payment providers.
              </p>
            </details>

            <details class="bg-white rounded-xl p-6 shadow-sm group">
              <summary class="font-semibold text-text-primary cursor-pointer list-none flex items-center justify-between">
                <span>How do I contact the property owner?</span>
                <svg class="w-5 h-5 text-accent transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </summary>
              <p class="mt-4 text-text-secondary leading-relaxed">
                After booking, you'll receive the owner's contact information via email. You can also message them through your booking dashboard on our platform.
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-2xl shadow-sm p-6 sm:p-10 border border-bg-secondary text-center">
          <h2 class="text-2xl sm:text-3xl font-serif font-bold text-text-primary mb-4">
            Still Need Help?
          </h2>
          <p class="text-text-secondary mb-8 max-w-2xl mx-auto">
            Our support team is available 24/7 to assist you with any questions or concerns.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:support@ferd.com" class="inline-flex items-center justify-center bg-accent text-white px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Email Support
            </a>
            <a href="tel:+1234567890" class="inline-flex items-center justify-center bg-white text-accent border-2 border-accent px-8 py-4 rounded-full font-semibold hover:bg-accent hover:text-white transition-all duration-300">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              Call Us
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Help Center - Ferd',
  meta: [
    {
      name: 'description',
      content: 'Get help with booking, payments, cancellations, and more. Our 24/7 support team is here to assist you.'
    }
  ]
})
</script>
