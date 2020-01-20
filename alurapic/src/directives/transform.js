
export default {
    bind (el, binding, vnode) {
        let current = 0;
        console.log('teste');
        el.addEventListener('dblclick', function () {
            let increment = 90;
            let time = 0.5;
            let efeito;

            if (binding.value) {
                if (typeof binding.value == 'object') {
                    increment = binding.value.increment;                
                    if (binding.value.time) { 
                        time = binding.value.time;
                    }
                }
                if (typeof binding.value == 'number') {
                    increment = binding.value;
                }
            }
            if (!(binding.arg) || binding.arg == 'rotate') {
                if (binding.modifiers.reverse) {
                    current -= increment;
                } else {
                    current += increment;
                }
                efeito = `rotate(${current}deg)`;
            } else if (binding.arg == 'scale') {
                efeito = `scale(${increment})`;
            }
            
            el.style.transform = efeito;
            if (binding.modifiers.animate) {             
                el.style.transition = `transform ${time}s`;
            }
        });
    }
};