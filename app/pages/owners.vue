<template>
  <div class="min-h-screen bg-bg-primary">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-accent/10 to-bg-secondary py-16 sm:py-24">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-text-primary mb-6">
            List Your Property
          </h1>
          <p class="text-lg sm:text-xl text-text-secondary leading-relaxed mb-8">
            Join thousands of hosts earning extra income by sharing their space
          </p>
          <NuxtLink 
            to="/host/create" 
            class="inline-block bg-accent text-white px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl sm:text-4xl font-serif font-bold text-text-primary text-center mb-12">
          Why Host with Ferd?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow border border-bg-secondary">
            <div class="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-serif font-bold mb-3 text-text-primary">Earn Extra Income</h3>
            <p class="text-text-secondary leading-relaxed">
              Set your own prices and earn money from your unused space. Hosts earn an average of $1,000+ per month.
            </p>
          </div>

          <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow border border-bg-secondary">
            <div class="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h3 class="text-xl font-serif font-bold mb-3 text-text-primary">Host Protection</h3>
            <p class="text-text-secondary leading-relaxed">
              $1M property damage protection and 24/7 support to give you peace of mind while hosting.
            </p>
          </div>

          <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow border border-bg-secondary">
            <div class="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
              </svg>
            </div>
            <h3 class="text-xl font-serif font-bold mb-3 text-text-primary">Full Control</h3>
            <p class="text-text-secondary leading-relaxed">
              You decide when to host, who to accept, and how much to charge. Complete flexibility on your terms.
            </p>
          </div>

          <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow border border-bg-secondary">
            <div class="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 class="text-xl font-serif font-bold mb-3 text-text-primary">Easy Setup</h3>
            <p class="text-text-secondary leading-relaxed">
              List your property in minutes with our simple step-by-step process. No technical skills required.
            </p>
          </div>

          <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow border border-bg-secondary">
            <div class="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-serif font-bold mb-3 text-text-primary">Global Reach</h3>
            <p class="text-text-secondary leading-relaxed">
              Connect with millions of travelers worldwide looking for unique places to stay.
            </p>
          </div>

          <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow border border-bg-secondary">
            <div class="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-serif font-bold mb-3 text-text-primary">24/7 Support</h3>
            <p class="text-text-secondary leading-relaxed">
              Our dedicated host support team is always available to help you succeed.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="bg-bg-secondary py-12 sm:py-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-3xl sm:text-4xl font-serif font-bold text-text-primary text-center mb-12">
            How It Works
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            <div class="text-center">
              <div class="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 class="text-xl font-serif font-bold mb-3 text-text-primary">Create Your Listing</h3>
              <p class="text-text-secondary leading-relaxed">
                Add photos, description, and amenities. Set your price and availability calendar.
              </p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 class="text-xl font-serif font-bold mb-3 text-text-primary">Get Bookings</h3>
              <p class="text-text-secondary leading-relaxed">
                Guests discover your property and send booking requests. You approve or decline.
              </p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 class="text-xl font-serif font-bold mb-3 text-text-primary">Earn Money</h3>
              <p class="text-text-secondary leading-relaxed">
                Welcome guests and get paid securely. Funds are transferred directly to your account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Resources Section -->
    <section class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl sm:text-4xl font-serif font-bold text-text-primary text-center mb-12">
          Host Resources
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-bg-secondary">
            <h3 class="text-xl font-serif font-bold mb-4 text-text-primary">Host Guide</h3>
            <p class="text-text-secondary mb-4">
              Everything you need to know about being a successful host, from pricing strategies to guest communication.
            </p>
            <a href="#" class="text-accent font-semibold hover:underline inline-flex items-center">
              Read Guide
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-bg-secondary">
            <h3 class="text-xl font-serif font-bold mb-4 text-text-primary">Photography Tips</h3>
            <p class="text-text-secondary mb-4">
              Learn how to take stunning photos that showcase your property and attract more bookings.
            </p>
            <a href="#" class="text-accent font-semibold hover:underline inline-flex items-center">
              View Tips
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-bg-secondary">
            <h3 class="text-xl font-serif font-bold mb-4 text-text-primary">Pricing Calculator</h3>
            <p class="text-text-secondary mb-4">
              Use our smart pricing tool to set competitive rates based on your location and property type.
            </p>
            <a href="#" class="text-accent font-semibold hover:underline inline-flex items-center">
              Try Calculator
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-bg-secondary">
            <h3 class="text-xl font-serif font-bold mb-4 text-text-primary">Host Community</h3>
            <p class="text-text-secondary mb-4">
              Connect with other hosts, share experiences, and get advice from seasoned professionals.
            </p>
            <a href="#" class="text-accent font-semibold hover:underline inline-flex items-center">
              Join Community
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-gradient-to-br from-accent to-accent/80 py-12 sm:py-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl sm:text-4xl font-serif font-bold text-white mb-6">
            Ready to Start Hosting?
          </h2>
          <p class="text-lg sm:text-xl text-white/90 mb-8">
            Join our community of hosts and start earning today
          </p>
          <NuxtLink 
            to="/host/create" 
            class="inline-block bg-white text-accent px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            List Your Property
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Become a Host - Ferd',
  meta: [
    {
      name: 'description',
      content: 'List your property on Ferd and start earning extra income. Join thousands of hosts worldwide with 24/7 support and $1M protection.'
    }
  ]
})
</script>
