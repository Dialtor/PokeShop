'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Swal from 'sweetalert2';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (item) => {
        set((state) => {
          const alreadyInCart = state.cartItems.find((i) => i.id === item.id);
          if (alreadyInCart) {

            Swal.fire({
              title: '¡Pokémon ya agregado!',
              text: 'Este Pokémon ya está en el carrito.',
              icon: 'warning',
              confirmButtonText: 'Aceptar',
            });

            return { cartItems: [...state.cartItems] };
          }

          return { cartItems: [...state.cartItems, item] };
        });
      },

      removeFromCart: (id) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        }));
      },

      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
