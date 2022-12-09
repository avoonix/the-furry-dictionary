<script lang="ts">
  import { letters } from "$lib/letters";

  export let currentLetter: string = "";
</script>

<div>
  {#each letters as letter}
    <a
      href={`/browse/${letter.toLowerCase()}`}
      type="button"
      class="center-icon round-button"
      class:active={letter.toLowerCase() === currentLetter?.toLowerCase()}
    >
      {letter}
    </a>
  {/each}
</div>
