import { ref, getCurrentInstance } from 'vue';

// Create a reactive object to store event callbacks
const listeners = ref(new Map());

// Event bus methods
export const eventBus = {
  /**
   * Register an event listener
   * @param {string} event - Event name
   * @param {Function} callback - Event callback
   */
  on(event, callback) {
    if (!listeners.value.has(event)) {
      listeners.value.set(event, []);
    }
    listeners.value.get(event).push(callback);
  },

  /**
   * Remove an event listener
   * @param {string} event - Event name
   * @param {Function} callback - Event callback to remove
   */
  off(event, callback) {
    if (listeners.value.has(event)) {
      const eventCallbacks = listeners.value.get(event);
      const index = eventCallbacks.indexOf(callback);
      if (index !== -1) {
        eventCallbacks.splice(index, 1);
      }
      if (eventCallbacks.length === 0) {
        listeners.value.delete(event);
      }
    }
  },

  /**
   * Emit an event
   * @param {string} event - Event name
   * @param {any} args - Arguments to pass to the callbacks
   */
  emit(event, ...args) {
    if (listeners.value.has(event)) {
      listeners.value.get(event).forEach(callback => {
        callback(...args);
      });
    }
  }
};

/**
 * Vue composition API hook to use the event bus in setup()
 */
export function useEventBus() {
  return eventBus;
}

/**
 * Vue option API helper to use the event bus in components
 */
export function useEventBusInComponent() {
  const instance = getCurrentInstance();
  if (instance) {
    // Add event bus to the component instance
    const component = instance.proxy;
    
    // Add event bus methods to the component
    component.$eventBus = eventBus;
    
    // Helper method to automatically remove event listeners when component is unmounted
    component.$onEvent = (event, callback) => {
      eventBus.on(event, callback);
      
      // Get the original beforeUnmount hook
      const originalBeforeUnmount = component.$options.beforeUnmount;
      
      // Replace it with our own that also removes the event listener
      component.$options.beforeUnmount = [
        ...(Array.isArray(originalBeforeUnmount) ? originalBeforeUnmount : [originalBeforeUnmount]).filter(Boolean),
        function() {
          eventBus.off(event, callback);
        }
      ];
    };
  }
  
  return eventBus;
}