interface ThrottleProps {
    leading?: boolean;
    trailing?: boolean;
}

export function throttle(fn:(...args:any []) => any, delay: number, options?: ThrottleProps){
    let { leading, trailing } = options || { leading: true, trailing: false };
    let lastTime: number = 0, timer: number;
    return function<T>(this:(...args:any []) => any,...args:Array<T>) {
        if (!leading && lastTime === 0) {
            lastTime = new Date().getTime();
        }
        let currentTime = new Date().getTime();
        const remainTime = delay - (currentTime - lastTime);
        if(timer !== null){
            window.clearTimeout(timer);
        }
        const _this = this;
        if (remainTime <= 0) {
            fn.apply(this, args)
            lastTime = currentTime;
        // ------ 新增部分 end ------ 
        } else if (trailing) {
            timer = window.setTimeout(function () {
                fn.apply(_this, args);
                lastTime = leading ? new Date().getTime() : 0;
            }, delay);
        }
    }
}