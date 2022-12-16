<script lang="ts">
  import { browser } from "$app/environment";
  import { receive, send } from "$lib/crossfade";

  let isLight = browser ? !document.querySelector("html")?.classList.contains("dark") : false;
</script>

<nav class="navbar navbar-expand-lg py-2 relative flex items-center w-full justify-between">
  <div class="px-6 w-full flex flex-wrap items-center justify-between">
    <div class="flex items-center">
      <a
        out:send={{ key: "title" }}
        in:receive={{ key: "title" }}
        class="navbar-brand inline-flex items-center text-blue-600 dark:text-slate-100"
        href="/"
      >
        <img alt="" class="w-[1.5em] h-[1.5em]" src="/favicon.svg" />
        The Furry Dictionary
      </a>
    </div>
    <div class="grow" />
    <div class="flex items-center lg:ml-auto">
      {#if browser}
        <button
          type="button"
          class="h-4 w-4 sm:h-8 sm:w-8 sm:p-1"
          on:click={() => {
            isLight = !isLight;
            localStorage.setItem("themeVariant", isLight ? "light" : "dark");

            if (isLight) {
              document.querySelector("html")?.classList.remove("dark", "bg-gray-900");
            } else {
              document.querySelector("html")?.classList.add("dark", "bg-gray-900");
            }
          }}
        >
          <svg class="text-slate-500" style="width:24px;height:24px" viewBox="0 0 24 24">
            {#if isLight}
              <path
                fill="currentColor"
                d="M2 12A10 10 0 0 0 15 21.54A10 10 0 0 1 15 2.46A10 10 0 0 0 2 12Z"
              />
            {:else}
              <path
                fill="currentColor"
                d="M3.55,18.54L4.96,19.95L6.76,18.16L5.34,16.74M11,22.45C11.32,22.45 13,22.45 13,22.45V19.5H11M12,5.5A6,6 0 0,0 6,11.5A6,6 0 0,0 12,17.5A6,6 0 0,0 18,11.5C18,8.18 15.31,5.5 12,5.5M20,12.5H23V10.5H20M17.24,18.16L19.04,19.95L20.45,18.54L18.66,16.74M20.45,4.46L19.04,3.05L17.24,4.84L18.66,6.26M13,0.55H11V3.5H13M4,10.5H1V12.5H4M6.76,4.84L4.96,3.05L3.55,4.46L5.34,6.26L6.76,4.84Z"
              />
            {/if}
          </svg>
        </button>
      {/if}
    </div>
  </div>
</nav>
