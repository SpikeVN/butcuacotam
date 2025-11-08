<script lang="ts">
    import birdmural from "$lib/assets/birdandstars.svg";
    import birdblur from "$lib/assets/birdblur.png";
    import { ArrowRightIcon } from "@lucide/svelte";
</script>

<div
    class="flex h-screen w-full flex-col items-center justify-center gap-6 border-b border-b-accent"
>
    <div class="flex h-[50%] w-full max-w-[70%] flex-col items-center justify-center">
        <img
            class="h-full w-auto"
            src={birdmural}
            alt="Illustration of a blue crystalized bird with stars and orbit around it, next to a crystalized shoe and rice plant."
        />
        <img
            class="absolute -z-100 h-[60%] w-auto translate-x-[-10%] translate-y-[5%]"
            src={birdblur}
            alt="blurred bird"
        />
    </div>

    <a href="/debai" role="button" class="btn">Bắt đầu <ArrowRightIcon /></a>

    <div class="absolute bottom-12 z-0 flex flex-col items-center gap-2">
        <svg
            width="22"
            height="33"
            viewBox="0 0 22 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect x="0.5" y="0.5" width="21" height="32" rx="10.5" stroke="#4C376F" />
            <circle cx="11" cy="11" r="2" fill="#4C376F" />
        </svg>
        <p class="text-lg leading-[97%] text-fg3">CUỘN XUỐNG <br /> ĐỂ XEM THÊM</p>
    </div>
</div>
