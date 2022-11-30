import { ref, onMounted, onUnmounted, Ref } from 'vue'
const useDropDwon = (elementRef: Ref<HTMLElement | null>) => {
    const isClickOutSide = ref(false)
    const handelMenu = (e: MouseEvent) => {
        if (elementRef.value?.contains(e.target as HTMLElement)) {
            isClickOutSide.value = false;
        } else {
            isClickOutSide.value = true;
        }
    };
    onMounted(() => {
        document.addEventListener("click", handelMenu);
    });
    onUnmounted(() => {
        document.removeEventListener("click", handelMenu);
    });

    return isClickOutSide
}
export default useDropDwon

