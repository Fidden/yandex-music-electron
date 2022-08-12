import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import VueLazyLoad from 'vue-lazyload';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueVirtualScroller from 'vue3-virtual-scroller';

const pinia = createPinia();

createApp(App)
    .use(router)
    .use(pinia)
    .use(VueLazyLoad)
    .use(VueVirtualScroller)
    .directive('click-outside', {
        beforeMount(el, binding) {
            el.clickOutsideEvent = (evt: Event) => {
                evt.stopPropagation();
                if (!(el === evt.target || el.contains(evt.target))) {
                    binding.value(evt, el);
                }
            };
            window.requestAnimationFrame(() => {
                document.addEventListener('click', el.clickOutsideEvent);
            });
        },
        unmounted(el) {
            document.removeEventListener('click', el.clickOutsideEvent);
        }
    })
    .mount('#app');
