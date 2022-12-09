<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  let div: HTMLDivElement;

  onMount(() => {
    setTimeout(() => {
      // requires timeout since the script looks at the meta tags, which are updated after some delay

      const s = document.createElement("script");
      s.src = "https://comments.app/js/widget.js?3";
      s.dataset.commentsAppWebsite = "owpVVCLy";
      s.dataset.limit = "10";
      s.dataset.color = "3B82F6";
      s.dataset.dislikes = "1";
      s.dataset.colorful = "1";
      if (document.querySelector("html")?.classList.contains("dark")) {
        s.dataset.dark = "1";
      }

      div.appendChild(s);
    }, 1000);
  });
  onDestroy(() => {
    div.innerHTML = "";
  });
</script>

<div class="mt-12 mb-4" bind:this={div} />
